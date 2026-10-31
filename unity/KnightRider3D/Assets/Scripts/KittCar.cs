using UnityEngine;

namespace KnightRider3D
{
    /// <summary>
    /// Procedural K.I.T.T. — a black Trans Am-style wedge with a bouncing red
    /// scanner, gold pinstripes, T-tops, louvers, pop-up-era quad lamps and
    /// turbine wheels. Forward is -Z, matching the web build.
    /// </summary>
    public class KittCar
    {
        public Transform Root;
        public GameObject GameObject;
        public Material[] ScannerMaterials;
        public SpriteRenderer ScannerGlow;
        public Light ScannerLight;
        public Material[] BrakeMaterials;
        public SpriteRenderer[] BrakeGlows;
        public Transform[] WheelSpins;
        public Transform[] FrontSteer;
        public SpriteRenderer[] Exhaust;

        private float _pitch;
        private float _roll;
        private float _yaw;

        public static KittCar Build()
        {
            KittCar car = new KittCar();
            GameObject root = new GameObject("K.I.T.T.");
            car.Root = root.transform;
            car.GameObject = root;

            Material bodyMat = GameMaterials.Body;
            Material trimMat = GameMaterials.Trim;
            Material glassMat = GameMaterials.Glass;
            Material goldMat = GameMaterials.Gold;

            // Body loft (front at -Z, tail at +Z)
            LoftSection[] sections =
            {
                new LoftSection(-2.50f, 1.60f, 0.36f, 0.60f),
                new LoftSection(-2.18f, 1.88f, 0.32f, 0.71f),
                new LoftSection(-1.25f, 2.00f, 0.29f, 0.81f),
                new LoftSection(-0.50f, 2.04f, 0.28f, 0.845f),
                new LoftSection(0.90f, 2.04f, 0.28f, 0.86f),
                new LoftSection(2.10f, 2.00f, 0.30f, 0.88f),
                new LoftSection(2.46f, 1.90f, 0.37f, 0.85f)
            };
            MeshUtils.MakeMeshObject("Body", MeshUtils.Loft(sections, true), bodyMat, car.Root);

            // Rocker panels and bumpers
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(car.Root, "Rocker", new Vector3(side * 1.0f, 0.27f, 0.1f),
                    new Vector3(0.09f, 0.16f, 2.9f), trimMat);
            }
            MeshUtils.Box(car.Root, "FrontLip", new Vector3(0f, 0.32f, -2.47f),
                new Vector3(1.84f, 0.15f, 0.22f), trimMat);
            MeshUtils.Box(car.Root, "RearLip", new Vector3(0f, 0.34f, 2.47f),
                new Vector3(1.90f, 0.17f, 0.20f), trimMat);

            // Hood
            MeshUtils.Box(car.Root, "Hood", new Vector3(0f, 0.825f, -1.35f),
                new Vector3(1.16f, 0.025f, 1.55f), bodyMat, Quaternion.Euler(2.6f, 0f, 0f));

            // Greenhouse
            LoftSection[] cabinSections =
            {
                new LoftSection(-0.68f, 1.56f, 0.84f, 0.85f),
                new LoftSection(0.04f, 1.52f, 0.84f, 1.29f),
                new LoftSection(0.98f, 1.50f, 0.84f, 1.30f),
                new LoftSection(1.50f, 1.60f, 0.84f, 0.90f)
            };
            MeshUtils.MakeMeshObject("Greenhouse", MeshUtils.Loft(cabinSections, false), glassMat, car.Root);

            // Rear hatch, louvers, sails and quarter glass
            MeshUtils.Box(car.Root, "Hatch", new Vector3(0f, 1.085f, 1.53f),
                new Vector3(1.34f, 0.025f, 1.28f), glassMat, Quaternion.Euler(19f, 0f, 0f));
            for (int i = 0; i < 6; i++)
            {
                float t = i / 5f;
                MeshUtils.Box(car.Root, "Louver", new Vector3(0f, 1.305f - t * 0.38f, 1.0f + t * 1.0f),
                    new Vector3(1.22f, 0.028f, 0.075f), trimMat, Quaternion.Euler(19f, 0f, 0f));
            }
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(car.Root, "Sail", new Vector3(side * 0.74f, 1.09f, 1.52f),
                    new Vector3(0.055f, 0.40f, 1.02f), bodyMat, Quaternion.Euler(19f, 0f, 0f));
                MeshUtils.Box(car.Root, "QuarterGlass", new Vector3(side * 0.755f, 1.06f, 1.12f),
                    new Vector3(0.024f, 0.27f, 0.82f), glassMat, Quaternion.Euler(15.5f, 0f, 0f));
                MeshUtils.Box(car.Root, "QuarterTrim", new Vector3(side * 0.768f, 1.20f, 1.10f),
                    new Vector3(0.014f, 0.018f, 0.86f), trimMat, Quaternion.Euler(15.5f, 0f, 0f));
            }

            // T-top spine and smoked panels
            MeshUtils.Box(car.Root, "RoofSpine", new Vector3(0f, 1.322f, 0.5f),
                new Vector3(0.44f, 0.055f, 1.06f), bodyMat);
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(car.Root, "TTop", new Vector3(side * 0.45f, 1.31f, 0.48f),
                    new Vector3(0.50f, 0.03f, 0.98f), glassMat);
                MeshUtils.Box(car.Root, "TTopRail", new Vector3(side * 0.69f, 1.31f, 0.48f),
                    new Vector3(0.035f, 0.035f, 1.02f), trimMat);
                MeshUtils.Box(car.Root, "APillar", new Vector3(side * 0.73f, 1.06f, -0.32f),
                    new Vector3(0.055f, 0.055f, 0.68f), trimMat, Quaternion.Euler(-35f, 0f, 0f));
                MeshUtils.Box(car.Root, "BPillar", new Vector3(side * 0.73f, 1.07f, 0.98f),
                    new Vector3(0.06f, 0.50f, 0.09f), trimMat);
            }

            // Rear deck / spoiler
            MeshUtils.Box(car.Root, "Deck", new Vector3(0f, 0.878f, 1.72f),
                new Vector3(1.78f, 0.022f, 1.24f), bodyMat);
            MeshUtils.Box(car.Root, "Spoiler", new Vector3(0f, 0.975f, 2.34f),
                new Vector3(1.86f, 0.05f, 0.26f), trimMat, Quaternion.Euler(-4.5f, 0f, 0f));
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(car.Root, "SpoilerPlate", new Vector3(side * 0.96f, 0.955f, 2.36f),
                    new Vector3(0.045f, 0.18f, 0.36f), trimMat);
                MeshUtils.Box(car.Root, "SpoilerStrut", new Vector3(side * 0.64f, 0.94f, 2.37f),
                    new Vector3(0.07f, 0.19f, 0.10f), trimMat);
                GameObject pipe = MeshUtils.Cylinder(car.Root, "TailPipe",
                    new Vector3(side * 0.55f, 0.30f, 2.56f),
                    new Vector3(0.11f, 0.08f, 0.11f), GameMaterials.Rim,
                    Quaternion.Euler(90f, 0f, 0f));
                pipe.transform.localScale = new Vector3(0.11f, 0.16f, 0.11f);
            }

            // Gold pinstripes
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(car.Root, "StripeHigh", new Vector3(side * 1.017f, 0.76f, 0.02f),
                    new Vector3(0.012f, 0.018f, 4.1f), goldMat);
                MeshUtils.Box(car.Root, "StripeLow", new Vector3(side * 1.011f, 0.45f, 0.06f),
                    new Vector3(0.008f, 0.010f, 3.5f), goldMat);
                MeshUtils.Box(car.Root, "HoodStripe", new Vector3(side * 0.56f, 0.833f, -1.35f),
                    new Vector3(0.018f, 0.008f, 1.5f), goldMat, Quaternion.Euler(2.6f, 0f, 0f));

                // Mirrors
                MeshUtils.Box(car.Root, "MirrorArm", new Vector3(side * 1.01f, 0.95f, -0.48f),
                    new Vector3(0.12f, 0.035f, 0.035f), trimMat);
                MeshUtils.Box(car.Root, "Mirror", new Vector3(side * 1.08f, 0.97f, -0.44f),
                    new Vector3(0.13f, 0.09f, 0.19f), bodyMat);

                // Side markers
                MeshUtils.Box(car.Root, "FrontMarker", new Vector3(side * 1.02f, 0.54f, -2.0f),
                    new Vector3(0.012f, 0.045f, 0.09f), GameMaterials.Amber);
                MeshUtils.Box(car.Root, "RearMarker", new Vector3(side * 1.02f, 0.54f, 2.08f),
                    new Vector3(0.012f, 0.045f, 0.09f), GameMaterials.RedLight);
            }

            // Scanner
            GameObject scannerGroup = new GameObject("Scanner");
            scannerGroup.transform.SetParent(car.Root, false);
            scannerGroup.transform.localPosition = new Vector3(0f, 0.535f, -2.53f);
            MeshUtils.Box(scannerGroup.transform, "ScannerHousing", Vector3.zero,
                new Vector3(1.24f, 0.165f, 0.10f), trimMat);
            car.ScannerMaterials = new Material[8];
            float segW = 0.108f;
            float segGap = 0.024f;
            float total = 8f * segW + 7f * segGap;
            for (int i = 0; i < 8; i++)
            {
                Material mat = new Material(GameMaterials.RedLight);
                car.ScannerMaterials[i] = mat;
                MeshUtils.Box(scannerGroup.transform, "ScannerSeg" + i,
                    new Vector3(-total / 2f + segW / 2f + i * (segW + segGap), 0f, -0.05f),
                    new Vector3(segW, 0.08f, 0.045f), mat);
            }
            car.ScannerGlow = Visuals.GlowSprite(scannerGroup.transform, "ScannerGlow",
                new Vector3(0f, 0f, -0.14f), Palette.Red, 1.85f, 0.55f);
            GameObject scannerLightGo = new GameObject("ScannerLight");
            scannerLightGo.transform.SetParent(scannerGroup.transform, false);
            scannerLightGo.transform.localPosition = new Vector3(0f, 0.02f, -0.4f);
            car.ScannerLight = scannerLightGo.AddComponent<Light>();
            car.ScannerLight.type = LightType.Point;
            car.ScannerLight.color = new Color(1f, 0.08f, 0.16f);
            car.ScannerLight.range = 8f;
            car.ScannerLight.intensity = 2.2f;

            // Headlights
            for (int i = 0; i < 4; i++)
            {
                float x = i < 2 ? -0.7f + i * 0.3f : 0.4f + (i - 2) * 0.3f;
                MeshUtils.Box(car.Root, "Headlight" + i, new Vector3(x, 0.42f, -2.535f),
                    new Vector3(0.24f, 0.09f, 0.03f), GameMaterials.Headlight);
                Visuals.GlowSprite(car.Root, "HeadlightGlow" + i, new Vector3(x, 0.42f, -2.56f),
                    new Color(0.78f, 0.9f, 1f), 0.42f, 0.22f);
            }
            for (int side = -1; side <= 1; side += 2)
            {
                GameObject lightGo = new GameObject("Headlight");
                lightGo.transform.SetParent(car.Root, false);
                lightGo.transform.localPosition = new Vector3(side * 0.62f, 0.42f, -2.48f);
                Vector3 target = car.Root.TransformPoint(new Vector3(side * 1.05f, -0.55f, -24f));
                lightGo.transform.LookAt(target);
                Light light = lightGo.AddComponent<Light>();
                light.type = LightType.Spot;
                light.color = new Color(0.76f, 0.86f, 1f);
                light.range = 34f;
                light.spotAngle = 40f;
                light.intensity = 2.6f;
                light.shadows = LightShadows.None;
                light.renderMode = LightRenderMode.ForcePixel;

                // Amber indicator
                MeshUtils.Box(car.Root, "Indicator", new Vector3(side * 0.86f, 0.42f, -2.53f),
                    new Vector3(0.12f, 0.055f, 0.02f), GameMaterials.Amber);
            }

            // Tail panel and brake bars
            MeshUtils.Box(car.Root, "TailPanel", new Vector3(0f, 0.68f, 2.48f),
                new Vector3(1.70f, 0.30f, 0.035f), trimMat);
            car.BrakeMaterials = new Material[6];
            car.BrakeGlows = new SpriteRenderer[2];
            int index = 0;
            for (int side = -1; side <= 1; side += 2)
            {
                for (int i = 0; i < 3; i++)
                {
                    Material mat = new Material(GameMaterials.Tail);
                    car.BrakeMaterials[index++] = mat;
                    MeshUtils.Box(car.Root, "TailBar", new Vector3(side * 0.48f, 0.60f + i * 0.075f, 2.505f),
                        new Vector3(0.56f, 0.045f, 0.02f), mat);
                }
                car.BrakeGlows[side < 0 ? 0 : 1] = Visuals.GlowSprite(car.Root, "TailGlow",
                    new Vector3(side * 0.48f, 0.68f, 2.52f), Palette.Red, 0.62f, 0.34f);
            }

            // Plate
            MeshUtils.Box(car.Root, "Plate", new Vector3(0f, 0.40f, 2.49f),
                new Vector3(0.48f, 0.24f, 0.02f), trimMat);
            GameObject plateText = new GameObject("PlateText");
            plateText.transform.SetParent(car.Root, false);
            plateText.transform.localPosition = new Vector3(0f, 0.40f, 2.503f);
            TextMesh tm = plateText.AddComponent<TextMesh>();
            tm.text = "KITT";
            tm.font = GameFonts.Display;
            tm.fontSize = 48;
            tm.characterSize = 0.0034f;
            tm.anchor = TextAnchor.MiddleCenter;
            tm.alignment = TextAlignment.Center;
            tm.color = new Color(0.9f, 0.93f, 1f);
            MeshRenderer tmRenderer = plateText.GetComponent<MeshRenderer>();
            if (tmRenderer != null && GameFonts.Display != null)
            {
                tmRenderer.sharedMaterial = GameFonts.Display.material;
            }

            // Wheels
            car.WheelSpins = new Transform[4];
            car.FrontSteer = new Transform[2];
            Vector3[] wheelPositions =
            {
                new Vector3(-0.93f, 0.35f, -1.55f),
                new Vector3(0.93f, 0.35f, -1.55f),
                new Vector3(-0.93f, 0.35f, 1.55f),
                new Vector3(0.93f, 0.35f, 1.55f)
            };
            for (int i = 0; i < 4; i++)
            {
                bool front = i < 2;
                GameObject pivot = new GameObject("WheelPivot" + i);
                pivot.transform.SetParent(car.Root, false);
                pivot.transform.localPosition = wheelPositions[i];
                GameObject spin = new GameObject("WheelSpin");
                spin.transform.SetParent(pivot.transform, false);
                BuildWheel(spin.transform, 0.35f, 0.30f, true);
                car.WheelSpins[i] = spin.transform;
                if (front) car.FrontSteer[i] = pivot.transform;
            }

            // Exhaust flames
            car.Exhaust = new SpriteRenderer[2];
            for (int side = -1; side <= 1; side += 2)
            {
                SpriteRenderer flame = Visuals.GlowSprite(car.Root, "Exhaust",
                    new Vector3(side * 0.55f, 0.30f, 2.72f), new Color(1f, 0.48f, 0.12f), 0.55f, 0f);
                flame.gameObject.SetActive(false);
                car.Exhaust[side < 0 ? 0 : 1] = flame;
            }

            // Underglow + contact shadow
            Material underMat = new Material(GameMaterials.SpriteBase);
            underMat.mainTexture = TextureFactory.Glow;
            underMat.color = new Color(0.8f, 0f, 0.08f, 0.10f);
            GameObject underglow = MeshUtils.MakeMeshObject("Underglow", MeshUtils.Quad(3.2f, 6.0f), underMat, car.Root);
            underglow.transform.localPosition = new Vector3(0f, 0.025f, 0f);
            underglow.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            Visuals.GroundShadow(car.Root, new Vector3(0f, 0.015f, 0f), 2.8f, 6.0f, 0.9f);

            return car;
        }

        public static void BuildWheel(Transform parent, float radius, float width, bool detailed)
        {
            Quaternion axle = Quaternion.Euler(0f, 0f, 90f);
            MeshUtils.Cylinder(parent, "Tire", Vector3.zero,
                new Vector3(radius * 2f, width * 0.5f, radius * 2f), GameMaterials.Tire, axle);
            MeshUtils.Cylinder(parent, "Rim", Vector3.zero,
                new Vector3(radius * 1.18f, width * 0.52f, radius * 1.18f), GameMaterials.Rim, axle);
            if (!detailed) return;
            int spokes = 5;
            for (int side = -1; side <= 1; side += 2)
            {
                float x = side * (width * 0.5f + 0.004f);
                MeshUtils.Box(parent, "Hub", new Vector3(x, 0f, 0f),
                    new Vector3(0.035f, radius * 0.34f, radius * 0.34f), GameMaterials.Rim);
                for (int i = 0; i < spokes; i++)
                {
                    float a = (float)i / spokes * 360f;
                    MeshUtils.Box(parent, "Spoke", new Vector3(x, 0f, 0f),
                        new Vector3(0.026f, radius * 0.84f, radius * 0.10f),
                        GameMaterials.Rim, Quaternion.Euler(a, 0f, 0f));
                }
            }
        }

        public void UpdateCar(float dt, float speed, float steer, bool braking, bool boost,
            float time, bool airborne)
        {
            float speedNorm = Mathf.Clamp01(Mathf.Abs(speed) / 90f);
            for (int i = 0; i < WheelSpins.Length; i++)
            {
                WheelSpins[i].Rotate(Vector3.right, -speed * dt / 0.35f * Mathf.Rad2Deg, Space.Self);
            }
            for (int i = 0; i < FrontSteer.Length; i++)
            {
                float target = steer * 20f;
                float y = Mathf.LerpAngle(FrontSteer[i].localEulerAngles.y, target, 1f - Mathf.Pow(0.001f, dt));
                FrontSteer[i].localRotation = Quaternion.Euler(0f, y, 0f);
            }

            float targetPitch = airborne ? -6.9f : boost ? 1.3f : braking ? -1.2f : 0.2f;
            float targetRoll = -steer * 2.6f * (0.4f + speedNorm);
            float targetYaw = -steer * 4.3f;
            _pitch = Mathf.LerpAngle(_pitch, targetPitch, 1f - Mathf.Pow(0.005f, dt));
            _roll = Mathf.LerpAngle(_roll, targetRoll, 1f - Mathf.Pow(0.002f, dt));
            _yaw = Mathf.LerpAngle(_yaw, targetYaw, 1f - Mathf.Pow(0.002f, dt));
            Root.localRotation = Quaternion.Euler(_pitch, _yaw, _roll);

            // Scanner sweep
            const float period = 1.15f;
            float raw = (time % period) / period;
            float tri = raw < 0.5f ? raw * 2f : (1f - raw) * 2f;
            float pos = tri * 7f;
            float strongest = 0f;
            for (int i = 0; i < ScannerMaterials.Length; i++)
            {
                float d = Mathf.Abs(i - pos);
                float v = Mathf.Max(0f, 1f - d / 1.7f);
                float intensity = Mathf.Pow(v, 1.6f);
                strongest = Mathf.Max(strongest, intensity);
                Color c = new Color(1f, 0.03f + 0.14f * intensity, 0.06f + 0.12f * intensity, 1f);
                ScannerMaterials[i].color = c;
                ScannerMaterials[i].SetColor("_EmissionColor", c * 3.2f);
            }
            if (ScannerGlow != null)
            {
                ScannerGlow.color = new Color(1f, 0.10f + 0.10f * strongest, 0.15f, 0.26f + strongest * 0.55f);
            }
            if (ScannerLight != null) ScannerLight.intensity = 1.4f + strongest * 6.5f;

            for (int i = 0; i < BrakeMaterials.Length; i++)
            {
                Color c = braking ? new Color(1f, 0.08f, 0.14f) : new Color(0.28f, 0.01f, 0.02f);
                BrakeMaterials[i].SetColor("_EmissionColor", c * (braking ? 2.6f : 0.5f));
            }
            for (int i = 0; i < BrakeGlows.Length; i++)
            {
                if (BrakeGlows[i] == null) continue;
                Color c = BrakeGlows[i].color;
                c.a = braking ? 0.72f : 0.30f;
                BrakeGlows[i].color = c;
            }

            bool flame = boost && !airborne;
            for (int i = 0; i < Exhaust.Length; i++)
            {
                if (Exhaust[i] == null) continue;
                Exhaust[i].gameObject.SetActive(flame);
                if (!flame) continue;
                float flicker = 0.65f + Mathf.PingPong(time * 22f + i * 1.7f, 0.6f);
                Exhaust[i].color = new Color(1f, 0.48f, 0.12f, 0.55f * flicker);
                Exhaust[i].transform.localScale = Visuals.GlowScale(0.55f * (0.8f + flicker * 0.6f));
            }
        }
    }
}
