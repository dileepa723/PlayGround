using System.Collections.Generic;
using UnityEngine;

namespace KnightRider3D
{
    public enum GameState
    {
        Menu,
        Playing,
        Paused,
        Over
    }

    public class ToastMsg
    {
        public string Text;
        public Color Color;
        public float Life;
    }

    /// <summary>
    /// Mirrors the browser game: a 120 second neon-highway pursuit, data cores,
    /// interceptors, near-miss combos, turbo jumps and a molecular bonded shell.
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public const float StartTime = 120f;
        public const float BaseMax = 96f;
        public const float TurboMax = 134f;
        public const float CarXLimit = WorldBuilder.RoadHalf - 1.1f;

        public GameState State = GameState.Menu;
        public float GameTime;
        public float Speed;
        public float Turbo = 100f;
        public float Shield = 100f;
        public float Score;
        public float Distance;
        public float TimeLeft = StartTime;
        public float ComboTimer;
        public float JumpY;
        public float JumpV;
        public float LaserCooldown;
        public float Invuln;
        public float CarX;
        public float Steer;
        public float TopSpeed;
        public float Shake;
        public float Flash;
        public float OverDelay;
        public int Combo;
        public int Kills;
        public int Cores;
        public float BestMultiplier = 1f;
        public bool Airborne;
        public bool BoostActive;
        public bool Ended;
        public string EndReason = "";

        public KittCar Kitt;
        public WorldBuilder World;
        public FxManager Fx;
        public SynthAudio Audio;
        public Hud Hud;
        public ChaseCamera CameraRig;
        public Camera MainCamera;
        public EnemyVehicle TargetEnemy;
        public readonly List<ToastMsg> Toasts = new List<ToastMsg>();

        private readonly List<TrafficVehicle> _traffic = new List<TrafficVehicle>();
        private readonly List<EnemyVehicle> _enemies = new List<EnemyVehicle>();
        private readonly List<DataCore> _cores = new List<DataCore>();
        private readonly List<Ramp> _ramps = new List<Ramp>();

        private float _trafficTimer;
        private float _enemyTimer;
        private float _coreTimer;
        private float _rampTimer;
        private float _elapsed;
        private float _trailTimer;
        private bool _boostWasOn;
        private bool _started;

        public float SpeedNorm { get { return Mathf.Clamp01(Speed / TurboMax); } }
        public float SpeedMph { get { return Speed * 2.23694f; } }
        public float DistanceMiles { get { return Distance / 1609.34f; } }
        public float Multiplier { get { return 1f + Mathf.Min(Combo, 12) * 0.25f; } }

        private void Awake()
        {
            Application.targetFrameRate = 60;
            QualitySettings.vSyncCount = 0;

            SetupLighting();
            SetupCamera();

            Fx = gameObject.AddComponent<FxManager>();

            GameObject worldGo = new GameObject("World");
            World = worldGo.AddComponent<WorldBuilder>();
            World.Build();

            Kitt = KittCar.Build();
            Kitt.Root.position = new Vector3(WorldBuilder.Lanes[2], 0f, 0f);

            Audio = gameObject.AddComponent<SynthAudio>();
            Audio.Init();

            Hud = gameObject.AddComponent<Hud>();
            Hud.Init(this);

            BuildPools();
            ResetGame();
            Audio.SetMode("menu");
        }

        private void SetupLighting()
        {
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Exponential;
            RenderSettings.fogDensity = 0.0022f;
            RenderSettings.fogColor = new Color(0.078f, 0.043f, 0.11f);
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.22f, 0.16f, 0.29f);

            GameObject moon = new GameObject("MoonLight");
            Light moonLight = moon.AddComponent<Light>();
            moonLight.type = LightType.Directional;
            moonLight.color = new Color(0.63f, 0.70f, 1f);
            moonLight.intensity = 1.05f;
            moonLight.shadows = LightShadows.None;
            moon.transform.rotation = Quaternion.Euler(48f, -28f, 0f);

            GameObject rim = new GameObject("RimLight");
            Light rimLight = rim.AddComponent<Light>();
            rimLight.type = LightType.Directional;
            rimLight.color = new Color(0.78f, 0.42f, 1f);
            rimLight.intensity = 0.5f;
            rimLight.shadows = LightShadows.None;
            rim.transform.rotation = Quaternion.Euler(12f, 150f, 0f);

            GameObject key = new GameObject("KeyLight");
            Light keyLight = key.AddComponent<Light>();
            keyLight.type = LightType.Directional;
            keyLight.color = new Color(0.9f, 0.92f, 1f);
            keyLight.intensity = 0.55f;
            keyLight.shadows = LightShadows.None;
            key.transform.rotation = Quaternion.Euler(35f, -170f, 0f);

            GameObject fill = new GameObject("CoolFill");
            Light fillLight = fill.AddComponent<Light>();
            fillLight.type = LightType.Directional;
            fillLight.color = new Color(0.42f, 0.62f, 1f);
            fillLight.intensity = 0.45f;
            fillLight.shadows = LightShadows.None;
            fill.transform.rotation = Quaternion.Euler(20f, 40f, 0f);
        }

        private void SetupCamera()
        {
            GameObject camGo = new GameObject("Main Camera");
            camGo.tag = "MainCamera";
            MainCamera = camGo.AddComponent<Camera>();
            camGo.AddComponent<AudioListener>();
            camGo.transform.position = new Vector3(0f, 2.5f, 9f);
            CameraRig = camGo.AddComponent<ChaseCamera>();
            CameraRig.Init(MainCamera);
        }

        private void BuildPools()
        {
            string[] kinds =
            {
                "sedan", "suv", "truck", "sedan", "sedan", "suv", "truck",
                "sedan", "suv", "sedan", "sedan", "suv", "truck", "sedan"
            };
            for (int i = 0; i < kinds.Length; i++)
            {
                TrafficVehicle v = VehicleFactory.BuildTraffic(kinds[i]);
                _traffic.Add(v);
            }
            for (int i = 0; i < 5; i++) _enemies.Add(VehicleFactory.BuildEnemy());
            for (int i = 0; i < 4; i++) _cores.Add(VehicleFactory.BuildCore());
            for (int i = 0; i < 2; i++) _ramps.Add(VehicleFactory.BuildRamp());
        }

        public void ResetGame()
        {
            State = GameState.Menu;
            Speed = 0f;
            Turbo = 100f;
            Shield = 100f;
            Score = 0f;
            Distance = 0f;
            TimeLeft = StartTime;
            Combo = 0;
            ComboTimer = 0f;
            Kills = 0;
            Cores = 0;
            TopSpeed = 0f;
            JumpY = 0f;
            JumpV = 0f;
            Airborne = false;
            BoostActive = false;
            Invuln = 0f;
            LaserCooldown = 0f;
            CarX = WorldBuilder.Lanes[2];
            Steer = 0f;
            Shake = 0f;
            Flash = 0f;
            OverDelay = 0f;
            Ended = false;
            EndReason = "";
            BestMultiplier = 1f;
            _elapsed = 0f;
            _trafficTimer = 1.6f;
            _enemyTimer = 7f;
            _coreTimer = 3f;
            _rampTimer = 20f;
            _boostWasOn = false;
            _started = false;
            TargetEnemy = null;
            Toasts.Clear();

            for (int i = 0; i < _traffic.Count; i++)
            {
                _traffic[i].Active = false;
                _traffic[i].Passed = false;
                _traffic[i].Scored = false;
                _traffic[i].Collided = false;
                _traffic[i].Go.SetActive(false);
            }
            for (int i = 0; i < _enemies.Count; i++)
            {
                _enemies[i].Active = false;
                _enemies[i].Passed = false;
                _enemies[i].Scored = false;
                _enemies[i].Collided = false;
                _enemies[i].Go.SetActive(false);
            }
            for (int i = 0; i < _cores.Count; i++)
            {
                _cores[i].Active = false;
                _cores[i].Go.SetActive(false);
            }
            for (int i = 0; i < _ramps.Count; i++)
            {
                _ramps[i].Active = false;
                _ramps[i].Go.SetActive(false);
            }
            if (Kitt != null)
            {
                Kitt.Root.position = new Vector3(CarX, 0f, 0f);
                Kitt.Root.rotation = Quaternion.identity;
            }
        }

        public void StartRun()
        {
            ResetGame();
            State = GameState.Playing;
            Speed = 42f;
            Invuln = 2.2f;
            Toast("K.I.T.T. ONLINE - GO", Palette.Amber);
            _spawnTrafficAt(-70f, 0.55f, 34f);
            _spawnTrafficAt(-130f, 2f, 30f);
            _spawnTrafficAt(-210f, 3f, 37f);
            _spawnTrafficAt(-300f, 1f, 28f);
            _spawnCoreAt(-150f, 1.4f);
            _spawnEnemyAt(-260f);
            Audio.SetMode("playing");
            _started = true;
        }

        public void Pause()
        {
            if (State != GameState.Playing) return;
            State = GameState.Paused;
            Audio.SetMode("paused");
        }

        public void Resume()
        {
            if (State != GameState.Paused) return;
            State = GameState.Playing;
            Audio.SetMode("playing");
        }

        public void TogglePause()
        {
            if (State == GameState.Playing) Pause();
            else if (State == GameState.Paused) Resume();
        }

        public void GoMenu()
        {
            ResetGame();
            Audio.SetMode("menu");
        }

        public void EndRun(string reason)
        {
            if (Ended) return;
            Ended = true;
            State = GameState.Over;
            EndReason = reason;
            OverDelay = 1.1f;
            Audio.SetMode("over");
            Audio.GameOver();
            TargetEnemy = null;
            for (int i = 0; i < _traffic.Count; i++) { _traffic[i].Active = false; _traffic[i].Go.SetActive(false); }
            for (int i = 0; i < _enemies.Count; i++) { _enemies[i].Active = false; _enemies[i].Go.SetActive(false); }
            for (int i = 0; i < _cores.Count; i++) { _cores[i].Active = false; _cores[i].Go.SetActive(false); }
            for (int i = 0; i < _ramps.Count; i++) { _ramps[i].Active = false; _ramps[i].Go.SetActive(false); }
        }

        public void Restart()
        {
            StartRun();
        }

        public void Toast(string text, Color color)
        {
            ToastMsg t = new ToastMsg();
            t.Text = text;
            t.Color = color;
            t.Life = 1.45f;
            Toasts.Add(t);
            while (Toasts.Count > 3) Toasts.RemoveAt(0);
        }

        public float AddScore(float baseScore)
        {
            float mult = Multiplier;
            Score += baseScore * mult;
            return mult;
        }

        public void BumpCombo()
        {
            Combo++;
            ComboTimer = 4.5f;
            BestMultiplier = Mathf.Max(BestMultiplier, Multiplier);
        }

        private void Update()
        {
            float dt = Mathf.Min(Time.deltaTime, 0.05f);
            GameTime += dt;
            LaserCooldown = Mathf.Max(0f, LaserCooldown - dt);
            Invuln = Mathf.Max(0f, Invuln - dt);
            Shake = Mathf.Max(0f, Shake - dt * 2.4f);
            Flash = Mathf.Max(0f, Flash - dt * 2.2f);
            OverDelay = Mathf.Max(0f, OverDelay - dt);
            for (int i = Toasts.Count - 1; i >= 0; i--)
            {
                Toasts[i].Life -= dt;
                if (Toasts[i].Life <= 0f) Toasts.RemoveAt(i);
            }

            HandleHotkeys();

            if (State == GameState.Menu)
            {
                UpdateMenu(dt);
                return;
            }
            if (State == GameState.Paused)
            {
                Kitt.UpdateCar(dt * 0.15f, 0f, Steer, false, false, GameTime, false);
                return;
            }
            if (State == GameState.Over)
            {
                Speed = Mathf.Lerp(Speed, 0f, 1f - Mathf.Exp(-1.1f * dt));
                World.ScrollWorld(dt, Speed);
                Kitt.Root.position = new Vector3(CarX, JumpY, 0f);
                Kitt.UpdateCar(dt, Speed, Steer, true, false, GameTime, false);
                CameraRig.Tick(dt, false, CarX, Speed, JumpY, false, GameTime, Shake);
                Audio.UpdateAudio(dt, SpeedNorm, false, false);
                return;
            }

            UpdatePlaying(dt);
        }

        private void HandleHotkeys()
        {
            if (Input.GetKeyDown(KeyCode.P) || Input.GetKeyDown(KeyCode.Escape))
            {
                if (State == GameState.Playing || State == GameState.Paused) TogglePause();
            }
            if (Input.GetKeyDown(KeyCode.M))
            {
                Audio.ToggleMute();
            }
            if (State == GameState.Menu && (Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.Space)))
            {
                StartRun();
            }
            else if (State == GameState.Over && OverDelay <= 0f &&
                (Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.Space)))
            {
                StartRun();
            }
            else if (State == GameState.Paused && Input.GetKeyDown(KeyCode.Return))
            {
                Resume();
            }
        }

        private void UpdateMenu(float dt)
        {
            Speed = 8f;
            Steer = Mathf.Sin(GameTime * 0.3f) * 0.06f;
            World.ScrollWorld(dt, 12f + Mathf.Sin(GameTime * 0.4f) * 2f);
            Kitt.Root.position = new Vector3(CarX, 0f, 0f);
            Kitt.UpdateCar(dt, 8f, Steer, false, false, GameTime, false);
            CameraRig.Tick(dt, true, CarX, Speed, 0f, false, GameTime, 0f);
            Audio.UpdateAudio(dt, 0f, false, false);
        }

        private void UpdatePlaying(float dt)
        {
            _elapsed += dt;
            TimeLeft -= dt;
            if (TimeLeft <= 0f)
            {
                TimeLeft = 0f;
                EndRun("time");
                return;
            }

            ComboTimer -= dt;
            if (ComboTimer <= 0f && Combo > 0) Combo = 0;

            bool throttle, brake, boost, fire;
            float steerInput;
            ReadInput(out throttle, out brake, out steerInput, out boost, out fire);

            BoostActive = boost && Turbo > 1f && Speed > 4f;
            if (BoostActive)
            {
                Turbo = Mathf.Max(0f, Turbo - 23f * dt);
                Speed += 38f * dt;
                if (!_boostWasOn)
                {
                    Audio.Boost();
                    Toast("TURBO BOOST", Palette.Cyan);
                    Shake = Mathf.Max(Shake, 0.4f);
                }
                _boostWasOn = true;
            }
            else
            {
                _boostWasOn = false;
                Turbo = Mathf.Min(100f, Turbo + 4.2f * dt);
                if (throttle) Speed += 17f * dt;
                if (brake) Speed -= 44f * dt;
                else if (!throttle) Speed -= 7f * dt;
                if (Speed > BaseMax) Speed = Mathf.Max(BaseMax, Speed - 12f * dt);
            }
            Speed = Mathf.Clamp(Speed, 0f, BoostActive ? TurboMax : Mathf.Max(BaseMax, Speed));

            Steer = Mathf.Lerp(Steer, steerInput, 1f - Mathf.Exp(-9f * dt));
            float lateral = 8f + Speed * 0.036f;
            CarX += Steer * lateral * dt;
            if (CarX < -CarXLimit)
            {
                CarX = -CarXLimit;
                Steer *= 0.4f;
                Shake = Mathf.Max(Shake, 0.1f);
            }
            if (CarX > CarXLimit)
            {
                CarX = CarXLimit;
                Steer *= 0.4f;
                Shake = Mathf.Max(Shake, 0.1f);
            }

            if (Airborne)
            {
                JumpY += JumpV * dt;
                JumpV -= 30f * dt;
                if (JumpY <= 0f)
                {
                    JumpY = 0f;
                    JumpV = 0f;
                    Airborne = false;
                    Shake = Mathf.Max(Shake, 0.5f);
                    Fx.Sparks(new Vector3(CarX, 0.2f, 1.8f), Palette.Amber, 8);
                    Audio.Crash();
                }
            }

            Distance += Speed * dt;
            TopSpeed = Mathf.Max(TopSpeed, Speed);
            Score += Speed * dt * 0.28f;

            UpdateEntities(dt);

            _trafficTimer -= dt;
            if (_trafficTimer <= 0f)
            {
                _trafficTimer = Mathf.Max(0.58f, 1.55f - _elapsed * 0.012f);
                SpawnTraffic();
            }
            _enemyTimer -= dt;
            if (_enemyTimer <= 0f)
            {
                _enemyTimer = Mathf.Max(3.6f, 8.5f - _elapsed * 0.05f);
                SpawnEnemy();
            }
            _coreTimer -= dt;
            if (_coreTimer <= 0f)
            {
                _coreTimer = 6.5f + Random.value * 3f;
                SpawnCore();
            }
            _rampTimer -= dt;
            if (_rampTimer <= 0f)
            {
                _rampTimer = 22f + Random.value * 14f;
                SpawnRamp();
            }

            if (fire) Fire();

            Kitt.Root.position = new Vector3(CarX, JumpY, 0f);
            Kitt.UpdateCar(dt, Speed, Steer, brake, BoostActive, GameTime, Airborne);

            _trailTimer -= dt;
            if (BoostActive && _trailTimer <= 0f)
            {
                _trailTimer = 0.035f;
                Vector3 rear = new Vector3(CarX + (Random.value - 0.5f) * 1.1f, 0.45f + JumpY, 2.45f);
                Fx.Trail(rear, new Color(1f, 0.48f, 0.14f));
            }

            // Target lock
            EnemyVehicle target = null;
            float best = -999f;
            for (int i = 0; i < _enemies.Count; i++)
            {
                EnemyVehicle e = _enemies[i];
                if (!e.Active) continue;
                float ex = e.Go.transform.position.x;
                if (e.Z > -4f || e.Z < -85f) continue;
                if (Mathf.Abs(ex - CarX) > 6.5f) continue;
                if (e.Z > best)
                {
                    best = e.Z;
                    target = e;
                }
            }
            TargetEnemy = target;

            CameraRig.Tick(dt, false, CarX, Speed, JumpY, BoostActive, GameTime, Shake);
            Audio.UpdateAudio(dt, SpeedNorm, BoostActive, true);
        }

        private void ReadInput(out bool throttle, out bool brake, out float steer, out bool boost, out bool fire)
        {
            bool touch = Hud != null && Hud.IsTouch;
            throttle = Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow) ||
                (touch && State == GameState.Playing);
            brake = Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow) ||
                (touch && Hud.TouchBrake);
            float keyboardSteer = 0f;
            if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) keyboardSteer += 1f;
            if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) keyboardSteer -= 1f;
            steer = Mathf.Clamp(keyboardSteer + (touch ? Hud.TouchSteer : 0f), -1f, 1f);
            boost = Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift) ||
                (touch && Hud.TouchBoost);
            fire = Input.GetKey(KeyCode.F) || Input.GetKey(KeyCode.Space) || (touch && Hud.TouchFire);
            if (!touch && State == GameState.Playing && Input.GetMouseButton(0) &&
                (Hud == null || !Hud.PointerBlocked(Input.mousePosition)))
            {
                fire = true;
            }
        }

        private void UpdateEntities(float dt)
        {
            for (int i = 0; i < _traffic.Count; i++)
            {
                TrafficVehicle t = _traffic[i];
                if (!t.Active) continue;
                t.Z += (Speed - t.Speed) * dt;
                t.Go.transform.position = new Vector3(t.X, 0f, t.Z);

                if (t.Z > 1.5f && !t.Passed)
                {
                    t.Passed = true;
                    float dist = Mathf.Abs(t.X - CarX);
                    if (dist > 1.95f && dist < 3.4f)
                    {
                        t.Scored = true;
                        BumpCombo();
                        float mult = AddScore(120f);
                        Turbo = Mathf.Min(100f, Turbo + 4.5f);
                        Audio.NearMiss();
                        if (Combo == 1 || Combo % 3 == 0) Toast("NEAR MISS  x" + mult.ToString("0.00"), Palette.Cyan);
                    }
                }
                if (Mathf.Abs(t.Z) < 3.9f && !t.Collided && Mathf.Abs(t.X - CarX) < 1.2f + t.HalfW - 0.35f)
                {
                    t.Collided = true;
                    t.Scored = true;
                    if (ApplyHit(t.X, t.Z, false))
                    {
                        t.Active = false;
                        t.Go.SetActive(false);
                    }
                    else
                    {
                        t.Collided = false;
                    }
                }
                if (t.Z > 32f) DeactivateTraffic(t);
            }

            for (int i = 0; i < _enemies.Count; i++)
            {
                EnemyVehicle e = _enemies[i];
                if (!e.Active) continue;
                e.Z += (Speed - e.Speed) * dt;
                e.Phase += dt * 1.8f;
                float ex = e.X + Mathf.Sin(e.Phase) * 0.9f;
                e.Go.transform.position = new Vector3(ex, 0f, e.Z);
                e.Go.transform.rotation = Quaternion.Euler(0f, 0f, Mathf.Sin(e.Phase * 0.7f) * 1.7f);
                bool blink = Mathf.Sin(GameTime * 11f + e.Phase) > 0f;
                if (e.RedLight != null) e.RedLight.SetActive(blink);
                if (e.BlueLight != null) e.BlueLight.SetActive(!blink);
                if (e.Glow != null) e.Glow.color = blink
                    ? new Color(1f, 0.12f, 0.22f, 0.55f)
                    : new Color(0.18f, 0.42f, 1f, 0.55f);

                if (e.Z > 1.5f && !e.Passed)
                {
                    e.Passed = true;
                    float dist = Mathf.Abs(ex - CarX);
                    if (dist > 1.95f && dist < 3.4f)
                    {
                        e.Scored = true;
                        BumpCombo();
                        float mult = AddScore(120f);
                        Turbo = Mathf.Min(100f, Turbo + 4.5f);
                        Audio.NearMiss();
                        if (Combo == 1 || Combo % 3 == 0) Toast("NEAR MISS  x" + mult.ToString("0.00"), Palette.Cyan);
                    }
                }
                if (Mathf.Abs(e.Z) < 4.1f && !e.Collided && Mathf.Abs(ex - CarX) < 1.95f)
                {
                    e.Collided = true;
                    e.Scored = true;
                    if (ApplyHit(ex, e.Z, true))
                    {
                        e.Active = false;
                        e.Go.SetActive(false);
                    }
                    else
                    {
                        e.Collided = false;
                    }
                }
                if (e.Z > 32f) DeactivateEnemy(e);
            }

            for (int i = 0; i < _cores.Count; i++)
            {
                DataCore c = _cores[i];
                if (!c.Active) continue;
                c.Z += Speed * dt;
                c.Bob += dt * 2f;
                c.Go.transform.position = new Vector3(c.X, 1.25f + Mathf.Sin(c.Bob) * 0.22f, c.Z);
                c.Go.transform.Rotate(0f, dt * 90f, 0f, Space.World);
                if (c.Ring2 != null) c.Ring2.Rotate(0f, 0f, dt * 140f, Space.Self);
                if (c.Core != null) c.Core.Rotate(dt * 70f, dt * 50f, 0f, Space.Self);

                if (Mathf.Abs(c.Z) < 3.2f && Mathf.Abs(c.X - CarX) < 2.3f && !Airborne)
                {
                    c.Active = false;
                    c.Go.SetActive(false);
                    Cores++;
                    BumpCombo();
                    TimeLeft = Mathf.Min(999f, TimeLeft + 7f);
                    Shield = Mathf.Min(100f, Shield + 10f);
                    Turbo = Mathf.Min(100f, Turbo + 30f);
                    float mult = AddScore(200f);
                    Audio.Pickup();
                    Fx.Sparks(new Vector3(c.X, 1.2f, c.Z), Palette.Amber, 14);
                    Fx.Shockwave(new Vector3(c.X, 0.3f, c.Z), Palette.Amber, 3.2f);
                    Toast("DATA CORE  +7s  +" + Mathf.RoundToInt(200f * mult), Palette.Amber);
                }
                if (c.Z > 30f)
                {
                    c.Active = false;
                    c.Go.SetActive(false);
                }
            }

            for (int i = 0; i < _ramps.Count; i++)
            {
                Ramp r = _ramps[i];
                if (!r.Active) continue;
                r.Z += Speed * dt;
                r.Go.transform.position = new Vector3(r.X, 0.02f, r.Z);
                if (Mathf.Abs(r.Z) < 3.2f && Mathf.Abs(r.X - CarX) < 2f && !Airborne)
                {
                    Airborne = true;
                    JumpV = 11.5f;
                    JumpY = 0.15f;
                    Audio.Jump();
                    Shake = Mathf.Max(Shake, 0.45f);
                    Toast("TURBO JUMP", Palette.Cyan);
                    Fx.Sparks(new Vector3(CarX, 0.4f, 2f), Palette.Cyan, 10);
                }
                if (r.Z > 25f)
                {
                    r.Active = false;
                    r.Go.SetActive(false);
                }
            }
        }

        private bool ApplyHit(float x, float z, bool isEnemy)
        {
            if (Invuln > 0f || Airborne) return false;
            Vector3 pos = new Vector3((CarX + x) * 0.5f, 0.9f, z * 0.5f);
            bool ramming = BoostActive && Speed > 105f && !isEnemy;
            Invuln = 1.4f;
            Shake = 1.2f;
            Audio.Crash();
            Fx.Explosion(pos, isEnemy ? new Color(1f, 0.3f, 0.2f) : new Color(1f, 0.55f, 0.18f));
            Fx.Shockwave(new Vector3(x, 0.25f, z), new Color(1f, 0.35f, 0.24f), 6f);
            Combo = 0;
            ComboTimer = 0f;
            Flash = 1f;

            if (ramming)
            {
                Shield = Mathf.Max(0f, Shield - 12f);
                Speed *= 0.9f;
                Score += 250f;
                Toast("TURBO RAM  +250", Palette.Cyan);
            }
            else
            {
                float damage = isEnemy ? 34f : 28f;
                Shield = Mathf.Max(0f, Shield - damage);
                Speed *= 0.52f;
                Toast("SHELL IMPACT  -" + Mathf.RoundToInt(damage) + "%", Palette.RedHot);
            }
            if (Shield <= 0f) EndRun("disabled");
            return true;
        }

        public void Fire()
        {
            if (State != GameState.Playing || LaserCooldown > 0f) return;
            LaserCooldown = 0.34f;
            Audio.Laser();
            float noseY = 0.78f + JumpY;
            Vector3 originL = new Vector3(CarX - 0.45f, noseY, -2.3f);
            Vector3 originR = new Vector3(CarX + 0.45f, noseY, -2.3f);
            Fx.Sparks(originL, new Color(0.75f, 0.96f, 1f), 4);
            Fx.Sparks(originR, new Color(0.75f, 0.96f, 1f), 4);

            EnemyVehicle target = FindTarget();
            if (target != null)
            {
                float tx = target.Go.transform.position.x;
                Vector3 to = new Vector3(tx, 0.85f, target.Z + 1.2f);
                Fx.Beam(originL, to, new Color(0.75f, 0.96f, 1f));
                Fx.Beam(originR, to, new Color(0.75f, 0.96f, 1f));
                Fx.Explosion(new Vector3(tx, 1f, target.Z), new Color(1f, 0.48f, 0.14f));
                Fx.Shockwave(new Vector3(tx, 0.3f, target.Z), new Color(1f, 0.55f, 0.18f), 8f);
                Audio.Crash();
                Kills++;
                BumpCombo();
                float mult = AddScore(300f);
                Turbo = Mathf.Min(100f, Turbo + 16f);
                Toast("INTERCEPTOR DOWN  +" + Mathf.RoundToInt(300f * mult), Palette.Amber);
                Shake = Mathf.Max(Shake, 0.35f);
                DeactivateEnemy(target);
                TargetEnemy = null;
            }
            else
            {
                Vector3 to = new Vector3(CarX + (Random.value - 0.5f) * 1.2f, noseY - 0.08f, -70f);
                Fx.Beam(originL, new Vector3(CarX - 0.5f, noseY - 0.08f, -70f), new Color(0.65f, 0.94f, 1f));
                Fx.Beam(originR, new Vector3(CarX + 0.5f, noseY - 0.08f, -70f), new Color(0.65f, 0.94f, 1f));
                Fx.Sparks(to, new Color(0.62f, 0.96f, 1f), 8);
            }
        }

        private EnemyVehicle FindTarget()
        {
            EnemyVehicle target = null;
            float best = -999f;
            for (int i = 0; i < _enemies.Count; i++)
            {
                EnemyVehicle e = _enemies[i];
                if (!e.Active) continue;
                float ex = e.Go.transform.position.x;
                if (e.Z > -4f || e.Z < -85f) continue;
                if (Mathf.Abs(ex - CarX) > 6.5f) continue;
                if (e.Z > best)
                {
                    best = e.Z;
                    target = e;
                }
            }
            return target;
        }

        private void DeactivateTraffic(TrafficVehicle t)
        {
            t.Active = false;
            t.Go.SetActive(false);
        }

        private void DeactivateEnemy(EnemyVehicle e)
        {
            e.Active = false;
            e.Go.SetActive(false);
        }

        private void SpawnTraffic()
        {
            int active = 0;
            for (int i = 0; i < _traffic.Count; i++) if (_traffic[i].Active) active++;
            if (active >= 11) return;
            int laneIndex = Random.Range(0, 4);
            float lane = WorldBuilder.Lanes[laneIndex];
            for (int i = 0; i < _traffic.Count; i++)
            {
                TrafficVehicle t = _traffic[i];
                if (!t.Active) continue;
                if (Mathf.Abs(t.X - lane) < 2.6f && t.Z < -60f && t.Z > -420f) return;
            }
            float roll = Random.value;
            string want = roll < 0.18f ? "truck" : roll < 0.44f ? "suv" : "sedan";
            TrafficVehicle chosen = null;
            for (int i = 0; i < _traffic.Count; i++)
            {
                if (_traffic[i].Active) continue;
                if (_traffic[i].Kind == want) { chosen = _traffic[i]; break; }
            }
            if (chosen == null)
            {
                for (int i = 0; i < _traffic.Count; i++)
                {
                    if (!_traffic[i].Active) { chosen = _traffic[i]; break; }
                }
            }
            if (chosen == null) return;
            float speed = chosen.Kind == "truck" ? 23f + Random.value * 6f
                : chosen.Kind == "suv" ? 27f + Random.value * 7f
                : 31f + Random.value * 8f;
            chosen.Active = true;
            chosen.Passed = false;
            chosen.Scored = false;
            chosen.Collided = false;
            chosen.Z = -360f - Random.value * 60f;
            chosen.X = lane + (Random.value - 0.5f) * 0.55f;
            chosen.Speed = speed;
            chosen.Go.SetActive(true);
            chosen.Go.transform.position = new Vector3(chosen.X, 0f, chosen.Z);
        }

        private void _spawnTrafficAt(float z, float laneIndex, float speed)
        {
            TrafficVehicle chosen = null;
            for (int i = 0; i < _traffic.Count; i++)
            {
                if (!_traffic[i].Active) { chosen = _traffic[i]; break; }
            }
            if (chosen == null) return;
            float lane = WorldBuilder.Lanes[Mathf.Clamp(Mathf.RoundToInt(laneIndex), 0, 3)];
            chosen.Active = true;
            chosen.Passed = false;
            chosen.Scored = false;
            chosen.Collided = false;
            chosen.Z = z;
            chosen.X = lane + (Random.value - 0.5f) * 0.5f;
            chosen.Speed = speed;
            chosen.Go.SetActive(true);
            chosen.Go.transform.position = new Vector3(chosen.X, 0f, chosen.Z);
        }

        private void _spawnEnemyAt(float z)
        {
            EnemyVehicle e = null;
            for (int i = 0; i < _enemies.Count; i++)
            {
                if (!_enemies[i].Active) { e = _enemies[i]; break; }
            }
            if (e == null) return;
            e.Active = true;
            e.Passed = false;
            e.Scored = false;
            e.Collided = false;
            e.X = WorldBuilder.Lanes[Random.Range(0, 4)];
            e.Z = z;
            e.Speed = 28f + Random.value * 8f;
            e.Phase = Random.value * 10f;
            e.Go.SetActive(true);
            e.Go.transform.position = new Vector3(e.X, 0f, e.Z);
        }

        private void SpawnEnemy()
        {
            int active = 0;
            for (int i = 0; i < _enemies.Count; i++) if (_enemies[i].Active) active++;
            if (active >= 4) return;
            _spawnEnemyAt(-380f - Random.value * 60f);
        }

        private void _spawnCoreAt(float z, float laneIndex)
        {
            DataCore c = null;
            for (int i = 0; i < _cores.Count; i++)
            {
                if (!_cores[i].Active) { c = _cores[i]; break; }
            }
            if (c == null) return;
            c.Active = true;
            c.Z = z;
            c.X = WorldBuilder.Lanes[Mathf.Clamp(Mathf.RoundToInt(laneIndex), 0, 3)] + (Random.value - 0.5f) * 1.2f;
            c.Bob = Random.value * 6f;
            c.Go.SetActive(true);
            c.Go.transform.position = new Vector3(c.X, 1.2f, c.Z);
        }

        private void SpawnCore()
        {
            int active = 0;
            for (int i = 0; i < _cores.Count; i++) if (_cores[i].Active) active++;
            if (active >= 3) return;
            _spawnCoreAt(-220f - Random.value * 180f, Random.Range(0, 4));
        }

        private void SpawnRamp()
        {
            for (int i = 0; i < _ramps.Count; i++)
            {
                if (_ramps[i].Active) continue;
                Ramp r = _ramps[i];
                r.Active = true;
                r.Z = -320f;
                r.X = WorldBuilder.Lanes[Random.Range(0, 4)];
                r.Go.SetActive(true);
                r.Go.transform.position = new Vector3(r.X, 0.02f, r.Z);
                return;
            }
        }

        public float BestMultiplierValue { get { return BestMultiplier; } }
        public float SpeedValue { get { return Speed; } }
        public bool Started { get { return _started; } }
    }
}
