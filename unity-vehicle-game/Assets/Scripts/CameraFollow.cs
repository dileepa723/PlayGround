using UnityEngine;

/// <summary>
/// Smooth chase camera: trails behind the car, leans toward the velocity
/// direction in corners, opens FOV with speed and boost.
/// Add to the Main Camera and assign the vehicle root as target.
/// </summary>
[RequireComponent(typeof(Camera))]
public class CameraFollow : MonoBehaviour
{
    public Transform target;
    public float distance = 7.5f;
    public float height = 3.2f;
    public float lookAhead = 4f;

    [Tooltip("Higher = snappier follow.")]
    public float positionSmooth = 8f;
    public float lookSmooth = 12f;

    [Header("FOV")]
    public float baseFov = 65f;
    public float maxFov = 82f;
    public float fovSmooth = 5f;

    VehicleController vehicle;
    Vector3 currentPos;
    Vector3 currentLook;
    float currentFov;

    void Start()
    {
        currentFov = baseFov;
        if (target)
        {
            currentPos = transform.position;
            currentLook = target.position + Vector3.up * 1.2f;
            vehicle = target.GetComponent<VehicleController>();
        }
    }

    void LateUpdate()
    {
        if (target == null)
        {
            var car = FindObjectOfType<VehicleController>();
            if (car != null) { target = car.transform; Start(); }
            return;
        }
        if (vehicle == null)
            vehicle = target.GetComponent<VehicleController>();

        // Face along travel direction, blended with the car heading.
        Vector3 dir = target.forward;
        if (vehicle != null && vehicle.Velocity.sqrMagnitude > 16f)
            dir = Vector3.Slerp(target.forward, vehicle.Velocity.normalized, 0.35f);

        dir.y *= 0.4f;                       // don't tilt the camera into the sky on slopes
        if (dir.sqrMagnitude > 0.001f) dir.Normalize();
        else dir = target.forward;

        Vector3 desiredPos = target.position - dir * distance + Vector3.up * height;
        float t = 1f - Mathf.Exp(-positionSmooth * Time.deltaTime);
        currentPos = Vector3.Lerp(currentPos, desiredPos, t);
        transform.position = currentPos;

        Vector3 lookPoint = target.position + target.forward * lookAhead + Vector3.up * 1.2f;
        currentLook = Vector3.Lerp(currentLook, lookPoint, 1f - Mathf.Exp(-lookSmooth * Time.deltaTime));
        transform.rotation = Quaternion.LookRotation(currentLook - transform.position, Vector3.up);

        // FOV kick with speed + boost.
        float speed01 = vehicle != null ? Mathf.Clamp01(vehicle.SpeedKmh / 170f) : 0f;
        float boost01 = vehicle != null && vehicle.IsBoosting ? 1f : 0f;
        float targetFov = Mathf.Lerp(baseFov, maxFov, speed01 * 0.5f + boost01 * 0.5f);
        currentFov = Mathf.Lerp(currentFov, targetFov, 1f - Mathf.Exp(-fovSmooth * Time.deltaTime));
        GetComponent<Camera>().fieldOfView = currentFov;
    }
}
