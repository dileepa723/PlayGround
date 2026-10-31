using System;
using UnityEngine;

/// <summary>
/// Arcade-style, hand-tuned vehicle controller.
/// Stable and snappy on a flat track, works with keyboard or gamepad sticks.
/// Attach to the root GameObject of the car (must have a Rigidbody and a collider).
/// </summary>
[RequireComponent(typeof(Rigidbody))]
[DisallowMultipleComponent]
public class VehicleController : MonoBehaviour
{
    [Header("Speed (km/h)")]
    public float maxSpeed = 120f;
    public float boostMaxSpeed = 170f;
    public float reverseMaxSpeed = 40f;

    [Header("Engine")]
    [Tooltip("Longitudinal acceleration in m/s^2.")]
    public float accelRate = 18f;
    [Tooltip("Extra acceleration multiplier while boosting.")]
    public float boostAccelMultiplier = 1.7f;
    [Tooltip("Braking deceleration in m/s^2.")]
    public float brakeRate = 30f;
    [Tooltip("Passive slow-down (m/s^2) when no throttle is held.")]
    public float coastDrag = 1.2f;

    [Header("Handling")]
    [Tooltip("Full-lock turn rate in deg/s.")]
    public float steerStrength = 95f;
    [Tooltip("How hard sideways velocity is damped while gripping.")]
    public float lateralGrip = 6f;
    [Tooltip("Lateral damping while drifting (lower = more slide).")]
    public float driftLateralGrip = 0.9f;
    [Tooltip("Steering multiplier while drifting.")]
    public float driftSteerMultiplier = 1.5f;

    [Header("Grounding")]
    public LayerMask groundMask = ~0;
    public float groundRayLength = 1.4f;
    [Tooltip("Extra downward acceleration while grounded, keeps the car planted.")]
    public float downforce = 14f;

    [Header("Boost")]
    [Tooltip("Seconds of boost available when full.")]
    public float boostCapacity = 3f;
    [Tooltip("Capacity burned per second while boosting.")]
    public float boostBurnRate = 1f;
    [Tooltip("Capacity regenerated per second.")]
    public float boostRegenRate = 0.35f;

    [Header("Respawn")]
    [Tooltip("Fall below this height and the car respawns.")]
    public float fallHeight = -12f;
    public KeyCode resetKey = KeyCode.R;

    [Header("Wheel visuals (optional)")]
    public Transform[] frontWheels = new Transform[0];
    public Transform[] rearWheels = new Transform[0];
    [Tooltip("Visual-only wheel radius used to scale spin speed.")]
    public float wheelVisualRadius = 0.34f;
    public float wheelSteerAngle = 28f;
    [Tooltip("Tick on Unity e04208 if your wheels appear to roll backwards.")]
    public bool invertWheelSpin = false;

    [Header("Input (gamepad-friendly)")]
    public string verticalAxis = "Vertical";    // default Unity input
    public string horizontalAxis = "Horizontal";

    // ---- Read-only state for HUD / camera ----
    public float SpeedKmh { get { return speedKmh; } }
    public float Boost01 { get { return boostCapacity > 0f ? boostFuel / boostCapacity : 0f; } }
    public bool IsBoosting { get; private set; }
    public bool IsDrifting { get; private set; }
    public bool IsGrounded { get; private set; }
    public Vector3 Velocity { get { return rb ? rb.velocity : Vector3.zero; } }

    /// <summary>Raised every time the car respawns.</summary>
    public event Action Respawned;

    Rigidbody rb;
    float speedKmh;
    float boostFuel;
    float lastForwardSpeed;
    float visualSpin;
    float steerVisual;
    float rawSteer;
    Vector3 spawnPos;
    Quaternion spawnRot;
    Quaternion[] frontBase = new Quaternion[0];
    Quaternion[] rearBase = new Quaternion[0];

    void Awake()
    {
        rb = GetComponent<Rigidbody>();
        rb.mass = 1200f;
        rb.drag = 0f;
        rb.angularDrag = 0.05f;
        rb.interpolation = RigidbodyInterpolation.Interpolate;
        rb.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
        rb.centerOfMass = new Vector3(0f, -0.25f, 0f);

        CacheWheelBases(frontWheels, ref frontBase);
        CacheWheelBases(rearWheels, ref rearBase);
        boostFuel = boostCapacity;
    }

    void Start()
    {
        spawnPos = transform.position;
        spawnRot = transform.rotation;
    }

    static void CacheWheelBases(Transform[] wheels, ref Quaternion[] cache)
    {
        cache = new Quaternion[wheels.Length];
        for (int i = 0; i < wheels.Length; i++)
            cache[i] = wheels[i] ? wheels[i].localRotation : Quaternion.identity;
    }

    bool InputAllowed
    {
        get
        {
            var race = RaceManager.Instance;
            return race == null || race.State != RaceManager.RaceState.Countdown;
        }
    }

    void FixedUpdate()
    {
        float dt = Time.fixedDeltaTime;
        boostFuel = Mathf.Min(boostFuel + boostRegenRate * dt, boostCapacity);

        float vertical = Input.GetAxisRaw(verticalAxis);
        float horizontal = Input.GetAxisRaw(horizontalAxis);
        bool boostHeld = Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift);
        bool driftHeld = Input.GetKey(KeyCode.Space);
        if (!InputAllowed)
            vertical = 0f;

        // --- Ground probe ---
        RaycastHit hit;
        Vector3 origin = transform.position + transform.up * 0.5f;
        bool grounded = Physics.Raycast(origin, -transform.up, out hit,
            0.5f + groundRayLength, groundMask, QueryTriggerInteraction.Ignore);
        IsGrounded = grounded;

        // --- Velocity shaping (arcade: direct, predictable) ---
        Vector3 local = transform.InverseTransformDirection(rb.velocity);
        float forward = local.z;
        float lateral = local.x;

        IsDrifting = grounded && driftHeld && Mathf.Abs(forward) > 1f;
        IsBoosting = false;
        float grip = IsDrifting ? driftLateralGrip : lateralGrip;

        if (grounded)
        {
            // Lateral grip: bleed off sideways speed.
            lateral *= Mathf.Clamp01(1f - grip * dt);

            if (vertical > 0.1f)
            {
                bool wantBoost = boostHeld && boostFuel > 0f && forward > 0.5f;
                IsBoosting = wantBoost;
                if (wantBoost)
                    boostFuel = Mathf.Max(0f, boostFuel - boostBurnRate * dt);

                float rate = accelRate * (IsBoosting ? boostAccelMultiplier : 1f);
                float cap = (IsBoosting ? boostMaxSpeed : maxSpeed) / 3.6f;
                if (forward < cap)
                    forward = Mathf.Min(forward + rate * dt, cap);
            }
            else if (vertical < -0.1f)
            {
                if (forward > 0.2f)
                    forward = Mathf.Max(forward - brakeRate * dt, 0f);
                else
                    forward = Mathf.Max(forward - accelRate * 0.6f * dt, -reverseMaxSpeed / 3.6f);
            }
            else
            {
                float drop = coastDrag * dt * (1f + Mathf.Abs(forward) * 0.08f);
                forward = Mathf.MoveTowards(forward, 0f, drop);
            }

            // Stick to the surface (helps on ramps/kerbs).
            local.y = local.y - downforce * dt;
        }
        else
        {
            // Airborne: mild drag so jumps feel weighty; steering only yaws.
            lateral *= Mathf.Clamp01(1f - 0.2f * dt);
            forward *= Mathf.Clamp01(1f - 0.05f * dt);
        }

        local.x = lateral;
        local.z = forward;
        rb.velocity = transform.TransformDirection(local);
        speedKmh = Mathf.Abs(local.z) * 3.6f;
        lastForwardSpeed = local.z;

        // --- Steering ---
        float speedFactor = Mathf.Clamp01(Mathf.Abs(forward) / 8f);   // need motion to turn
        float steerMul = (IsDrifting ? driftSteerMultiplier : 1f) * (grounded ? 1f : 0.45f);
        float reverseMul = forward < -0.5f ? -1f : 1f;                 // invert while reversing
        float yawDelta = horizontal * steerStrength * speedFactor * steerMul * reverseMul * dt;
        rb.angularVelocity = Vector3.Lerp(rb.angularVelocity, Vector3.zero, grounded ? 0.5f : 0.05f);

        Quaternion desired = rb.rotation * Quaternion.Euler(0f, yawDelta, 0f);
        if (grounded)
        {
            // Align with the surface normal (keeps ramps looking right).
            Quaternion flat = Flatten(hit.normal);
            desired = Quaternion.Slerp(rb.rotation, flat, 1f - Mathf.Exp(-6f * dt))
                      * Quaternion.Euler(0f, yawDelta, 0f);
        }
        rb.MoveRotation(desired);

        // --- Respawn ---
        if (transform.position.y < fallHeight || Input.GetKeyDown(resetKey))
            Respawn();
    }

    /// <summary>Rotation aligned with the given surface normal, preserving heading.</summary>
    Quaternion Flatten(Vector3 up)
    {
        Vector3 fwd = transform.forward;
        Vector3 flattened = fwd - up * Vector3.Dot(fwd, up);
        if (flattened.sqrMagnitude < 0.01f)
            flattened = Vector3.ProjectOnPlane(transform.forward, Vector3.up);
        return Quaternion.LookRotation(flattened.normalized, up);
    }

    public void Respawn()
    {
        transform.position = spawnPos + Vector3.up * 0.05f;
        transform.rotation = spawnRot;
        if (rb)
        {
            rb.velocity = Vector3.zero;
            rb.angularVelocity = Vector3.zero;
        }
        boostFuel = boostCapacity;
        if (Respawned != null) Respawned();
    }

    void Update()
    {
        // --- Wheel visuals ---
        float dt = Time.deltaTime;
        rawSteer = Input.GetAxisRaw(horizontalAxis);
        float spinDir = invertWheelSpin ? 1f : -1f;
        visualSpin += spinDir * (lastForwardSpeed / Mathf.Max(0.05f, wheelVisualRadius)) * dt * Mathf.Rad2Deg;
        if (Mathf.Abs(visualSpin) > 3600000f) visualSpin %= 360f;
        steerVisual = Mathf.Lerp(steerVisual, rawSteer * wheelSteerAngle, 1f - Mathf.Exp(-10f * dt));

        ApplyWheelTransform(frontWheels, frontBase, steerVisual);
        ApplyWheelTransform(rearWheels, rearBase, 0f);
    }

    void ApplyWheelTransform(Transform[] wheels, Quaternion[] bases, float steer)
    {
        if (wheels == null) return;
        for (int i = 0; i < wheels.Length; i++)
        {
            if (!wheels[i] || i >= bases.Length) continue;
            // steer (parent space) * base orientation * spin around the axle
            wheels[i].localRotation =
                Quaternion.Euler(0f, steer, 0f) * bases[i] * Quaternion.Euler(0f, visualSpin, 0f);
        }
    }
}
