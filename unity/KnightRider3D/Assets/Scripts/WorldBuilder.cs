using System.Collections.Generic;
using UnityEngine;

namespace KnightRider3D
{
    /// <summary>
    /// The neon Nevada highway. The road texture and roadside furniture scroll
    /// toward the player while the distant skyline and mountains stay put.
    /// </summary>
    public class WorldBuilder : MonoBehaviour
    {
        public const float RoadHalf = 9.2f;
        public static readonly float[] Lanes = { -6.7f, -2.23f, 2.23f, 6.7f };
        public const float ScrollSpan = 520f;

        public Material RoadMaterial { get; private set; }
        private readonly List<Transform> _scrollables = new List<Transform>();
        private Transform _world;

        public void Build()
        {
            _world = transform;

            BuildSky();
            BuildGroundAndRoad();
            BuildGuardRails();
            BuildStreetFurniture();
            BuildBackdrop();
            BuildTitleBackdrop();
        }

        private void BuildSky()
        {
            GameObject sky = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            sky.name = "SkyDome";
            Collider col = sky.GetComponent<Collider>();
            if (col != null) Destroy(col);
            sky.transform.SetParent(_world, false);
            sky.transform.localScale = Vector3.one * 900f;
            Material mat = new Material(GameMaterials.SpriteBase);
            mat.mainTexture = TextureFactory.Sky;
            mat.color = Color.white;
            MeshRenderer r = sky.GetComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            r.sortingOrder = -100;

            Visuals.MoonSprite(_world, new Vector3(-190f, 245f, -820f), 120f);
            Visuals.MoonSprite(_world, new Vector3(78f, 105f, 240f), 52f);
        }

        private void BuildGroundAndRoad()
        {
            // Desert floor
            Material groundMat = GameMaterials.Paint(new Color(0.035f, 0.031f, 0.052f));
            GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
            ground.name = "Desert";
            Collider gc = ground.GetComponent<Collider>();
            if (gc != null) Destroy(gc);
            ground.transform.SetParent(_world, false);
            ground.transform.localPosition = new Vector3(0f, -0.06f, -180f);
            ground.transform.localScale = new Vector3(40f, 1f, 70f);
            MeshRenderer gr = ground.GetComponent<MeshRenderer>();
            gr.sharedMaterial = groundMat;
            gr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            gr.receiveShadows = false;

            RoadMaterial = GameMaterials.Paint(new Color(0.12f, 0.13f, 0.17f));
            RoadMaterial.mainTexture = TextureFactory.Asphalt;
            RoadMaterial.mainTextureScale = new Vector2(1f, 15.625f);
            if (RoadMaterial.HasProperty("_Glossiness")) RoadMaterial.SetFloat("_Glossiness", 0.55f);

            GameObject road = GameObject.CreatePrimitive(PrimitiveType.Plane);
            road.name = "Highway";
            Collider rc = road.GetComponent<Collider>();
            if (rc != null) Destroy(rc);
            road.transform.SetParent(_world, false);
            road.transform.localPosition = new Vector3(0f, 0f, -200f);
            road.transform.localScale = new Vector3(1.84f, 1f, 50f);
            MeshRenderer rr = road.GetComponent<MeshRenderer>();
            rr.sharedMaterial = RoadMaterial;
            rr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            rr.receiveShadows = false;

            // Concrete shoulders
            Material shoulderMat = GameMaterials.Paint(new Color(0.16f, 0.145f, 0.15f));
            for (int side = -1; side <= 1; side += 2)
            {
                GameObject shoulder = GameObject.CreatePrimitive(PrimitiveType.Plane);
                shoulder.name = "Shoulder";
                Collider sc = shoulder.GetComponent<Collider>();
                if (sc != null) Destroy(sc);
                shoulder.transform.SetParent(_world, false);
                shoulder.transform.localPosition = new Vector3(side * 13.2f, 0.005f, -200f);
                shoulder.transform.localScale = new Vector3(0.8f, 1f, 50f);
                MeshRenderer sr = shoulder.GetComponent<MeshRenderer>();
                sr.sharedMaterial = shoulderMat;
                sr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                sr.receiveShadows = false;
            }
        }

        private void BuildGuardRails()
        {
            Material railMat = GameMaterials.Paint(new Color(0.21f, 0.22f, 0.26f));
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(_world, "GuardRail", new Vector3(side * 9.65f, 0.7f, -200f),
                    new Vector3(0.09f, 0.16f, 500f), railMat);
                MeshUtils.Box(_world, "GuardRailLow", new Vector3(side * 9.65f, 0.44f, -200f),
                    new Vector3(0.07f, 0.10f, 500f), railMat);
                for (int z = 45; z >= -445; z -= 14)
                {
                    MeshUtils.Box(_world, "RailPost", new Vector3(side * 9.65f, 0.48f, z),
                        new Vector3(0.09f, 1.0f, 0.12f), railMat);
                }
            }

            // Reflective posts scroll so the speed reads even at the edges.
            Material reflectorMat = GameMaterials.Amber;
            Material postMat = GameMaterials.Trim;
            for (int side = -1; side <= 1; side += 2)
            {
                for (int i = 0; i < 26; i++)
                {
                    GameObject root = new GameObject("Reflector");
                    root.transform.SetParent(_world, false);
                    root.transform.localPosition = new Vector3(side * 9.3f, 0f, 30f - i * 20f);
                    MeshUtils.Box(root.transform, "Post", new Vector3(0f, 0.45f, 0f),
                        new Vector3(0.05f, 0.9f, 0.05f), postMat);
                    MeshUtils.Box(root.transform, "Reflector", new Vector3(0f, 0.82f, 0f),
                        new Vector3(0.10f, 0.12f, 0.03f), reflectorMat);
                    _scrollables.Add(root.transform);
                }
            }
        }

        private void BuildStreetFurniture()
        {
            Material poleMat = GameMaterials.Paint(new Color(0.16f, 0.17f, 0.2f));
            Material lampMat = GameMaterials.Emissive(new Color(1f, 0.66f, 0.28f), 3.2f);
            for (int i = 0; i < 12; i++)
            {
                int side = i % 2 == 0 ? -1 : 1;
                GameObject root = new GameObject("Streetlight");
                root.transform.SetParent(_world, false);
                root.transform.localPosition = new Vector3(side * 11.4f, 0f, 20f - i * 42f);
                MeshUtils.Cylinder(root.transform, "Pole", new Vector3(0f, 4.2f, 0f),
                    new Vector3(0.16f, 4.3f, 0.16f), poleMat);
                MeshUtils.Box(root.transform, "Arm", new Vector3(side * -1.3f, 8.35f, 0f),
                    new Vector3(2.6f, 0.09f, 0.12f), poleMat);
                MeshUtils.Box(root.transform, "Lamp", new Vector3(side * -2.45f, 8.25f, 0f),
                    new Vector3(0.55f, 0.10f, 0.22f), lampMat);
                Visuals.GlowSprite(root.transform, "LampGlow", new Vector3(side * -2.45f, 8.15f, 0f),
                    new Color(1f, 0.65f, 0.28f), 1.5f, 0.7f);
                _scrollables.Add(root.transform);
            }

            // Gantry signs
            BuildGantry("LAS VEGAS", "61 · KNIGHT FOUNDATION TEST RANGE", -85f);
            BuildGantry("SECTOR 7", "K.I.T.T. PURSUIT CORRIDOR", -235f);
            BuildGantry("NEVADA", "SPEED LIMIT 300 · TURBO ONLY", -390f);

            // Overpasses
            for (int i = 0; i < 2; i++)
            {
                GameObject root = new GameObject("Overpass");
                root.transform.SetParent(_world, false);
                root.transform.localPosition = new Vector3(0f, 0f, -155f - i * 230f);
                Material concrete = GameMaterials.Paint(new Color(0.12f, 0.115f, 0.13f));
                MeshUtils.Box(root.transform, "Deck", new Vector3(0f, 7.0f, 0f),
                    new Vector3(27f, 0.85f, 3.2f), concrete);
                MeshUtils.Box(root.transform, "UnderGlow", new Vector3(0f, 6.52f, 0f),
                    new Vector3(25f, 0.05f, 0.35f), GameMaterials.Cyan);
                for (int side = -1; side <= 1; side += 2)
                {
                    MeshUtils.Box(root.transform, "Column", new Vector3(side * 11.5f, 3.2f, 0f),
                        new Vector3(1.0f, 6.4f, 1.2f), concrete);
                }
                _scrollables.Add(root.transform);
            }

            // Cacti and rocks
            Material cactusMat = GameMaterials.Paint(new Color(0.10f, 0.20f, 0.13f));
            Material rockMat = GameMaterials.Paint(new Color(0.12f, 0.11f, 0.15f));
            for (int i = 0; i < 22; i++)
            {
                int side = Random.value < 0.5f ? -1 : 1;
                float x = side * Random.Range(13f, 30f);
                float z = Random.Range(-450f, 15f);
                if (i % 3 == 0)
                {
                    GameObject rock = MeshUtils.Box(_world, "Rock", new Vector3(x, 0.4f, z),
                        new Vector3(Random.Range(1.4f, 4.2f), Random.Range(0.8f, 2.6f), Random.Range(1.4f, 3.6f)),
                        rockMat, Quaternion.Euler(Random.Range(-12f, 12f), Random.Range(0f, 360f), Random.Range(-8f, 8f)));
                    _scrollables.Add(rock.transform);
                }
                else
                {
                    GameObject root = new GameObject("Cactus");
                    root.transform.SetParent(_world, false);
                    root.transform.localPosition = new Vector3(x, 0f, z);
                    MeshUtils.Cylinder(root.transform, "Trunk", new Vector3(0f, 1.4f, 0f),
                        new Vector3(0.32f, 1.4f, 0.32f), cactusMat);
                    MeshUtils.Box(root.transform, "Arm", new Vector3(0.38f, 1.7f, 0f),
                        new Vector3(0.16f, 0.8f, 0.16f), cactusMat);
                    MeshUtils.Box(root.transform, "ArmTop", new Vector3(0.62f, 2.05f, 0f),
                        new Vector3(0.5f, 0.16f, 0.16f), cactusMat);
                    _scrollables.Add(root.transform);
                }
            }
        }

        private void BuildGantry(string title, string subtitle, float z)
        {
            GameObject root = new GameObject("Sign_" + title);
            root.transform.SetParent(_world, false);
            root.transform.localPosition = new Vector3(0f, 0f, z);
            Material poleMat = GameMaterials.Paint(new Color(0.11f, 0.12f, 0.15f));
            Material panelMat = GameMaterials.Paint(new Color(0.025f, 0.03f, 0.045f));
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(root.transform, "Post", new Vector3(side * 10.7f, 3.9f, 0f),
                    new Vector3(0.20f, 7.8f, 0.20f), poleMat);
            }
            MeshUtils.Box(root.transform, "Beam", new Vector3(0f, 7.65f, 0f),
                new Vector3(21.4f, 0.16f, 0.18f), poleMat);
            MeshUtils.Box(root.transform, "Panel", new Vector3(0f, 6.1f, 0f),
                new Vector3(8.4f, 2.9f, 0.16f), panelMat);
            MeshUtils.Box(root.transform, "PanelLine", new Vector3(0f, 7.42f, 0.10f),
                new Vector3(8.0f, 0.035f, 0.02f), GameMaterials.Amber);
            MeshUtils.Box(root.transform, "PanelLine2", new Vector3(0f, 4.72f, 0.10f),
                new Vector3(8.0f, 0.02f, 0.02f), GameMaterials.Amber);
            Visuals.GlowSprite(root.transform, "SignGlow", new Vector3(0f, 6.1f, 0.6f),
                new Color(1f, 0.75f, 0.32f), 4.5f, 0.14f);

            AddText(root.transform, title, new Vector3(0f, 6.45f, 0.12f), 0.085f, 64,
                new Color(1f, 0.95f, 0.85f));
            AddText(root.transform, subtitle, new Vector3(0f, 5.55f, 0.12f), 0.042f, 44,
                new Color(0.72f, 0.78f, 0.88f));

            _scrollables.Add(root.transform);
        }

        private void AddText(Transform parent, string text, Vector3 pos, float characterSize,
            int fontSize, Color color)
        {
            GameObject go = new GameObject("Text");
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            TextMesh tm = go.AddComponent<TextMesh>();
            tm.text = text;
            tm.font = GameFonts.Display;
            tm.fontSize = fontSize;
            tm.characterSize = characterSize;
            tm.anchor = TextAnchor.MiddleCenter;
            tm.alignment = TextAlignment.Center;
            tm.color = color;
            MeshRenderer mr = go.GetComponent<MeshRenderer>();
            if (mr != null && GameFonts.Display != null) mr.sharedMaterial = GameFonts.Display.material;
        }

        private void BuildBackdrop()
        {
            // City silhouette, mountains and distant haze behind the highway.
            GameObject city = MeshUtils.MakeMeshObject("City", MeshUtils.Quad(760f, 110f),
                GameMaterials.Unlit(new Color(0.62f, 0.55f, 0.76f), TextureFactory.City), _world);
            city.transform.localPosition = new Vector3(0f, 33f, -585f);
            city.transform.localRotation = Quaternion.Euler(0f, 180f, 0f);

            Material mtnFar = GameMaterials.Unlit(new Color(0.075f, 0.055f, 0.11f));
            Material mtnMid = GameMaterials.Unlit(new Color(0.055f, 0.038f, 0.082f));
            GameObject m1 = MeshUtils.MakeMeshObject("MountainsFar",
                MeshUtils.MountainRange(1100f, 210f, 30, 12), mtnFar, _world);
            m1.transform.localPosition = new Vector3(0f, -6f, -760f);
            GameObject m2 = MeshUtils.MakeMeshObject("MountainsNear",
                MeshUtils.MountainRange(950f, 135f, 26, 71), mtnMid, _world);
            m2.transform.localPosition = new Vector3(0f, -6f, -610f);
        }

        private void BuildTitleBackdrop()
        {
            // The attract camera looks back up the highway (+Z), so this is the
            // postcard behind K.I.T.T. on the title screen.
            Material mtnA = GameMaterials.Unlit(new Color(0.085f, 0.06f, 0.12f));
            Material mtnB = GameMaterials.Unlit(new Color(0.055f, 0.04f, 0.085f));
            GameObject m1 = MeshUtils.MakeMeshObject("TitleMountains",
                MeshUtils.MountainRange(620f, 140f, 24, 44), mtnA, _world);
            m1.transform.localPosition = new Vector3(30f, -8f, 290f);
            GameObject m2 = MeshUtils.MakeMeshObject("TitleMountainsNear",
                MeshUtils.MountainRange(520f, 95f, 20, 9), mtnB, _world);
            m2.transform.localPosition = new Vector3(15f, -6f, 240f);

            GameObject city = MeshUtils.MakeMeshObject("TitleCity", MeshUtils.Quad(420f, 80f),
                GameMaterials.Unlit(new Color(0.7f, 0.55f, 0.72f), TextureFactory.City), _world);
            city.transform.localPosition = new Vector3(10f, 24f, 270f);

            // Neon arch spanning the highway behind K.I.T.T.
            Material pole = GameMaterials.Paint(new Color(0.05f, 0.055f, 0.08f));
            Material cyan = GameMaterials.Cyan;
            Material red = GameMaterials.RedLight;
            GameObject arch = new GameObject("NeonArch");
            arch.transform.SetParent(_world, false);
            arch.transform.localPosition = new Vector3(0f, 0f, 32f);
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(arch.transform, "ArchPost", new Vector3(side * 10.2f, 3.2f, 0f),
                    new Vector3(0.45f, 6.4f, 0.45f), pole);
                MeshUtils.Box(arch.transform, "ArchNeon", new Vector3(side * 9.92f, 3.2f, 0f),
                    new Vector3(0.06f, 6.2f, 0.06f), cyan);
            }
            MeshUtils.Box(arch.transform, "ArchTop", new Vector3(0f, 7.0f, 0f),
                new Vector3(21f, 0.45f, 0.45f), pole);
            MeshUtils.Box(arch.transform, "ArchTopNeon", new Vector3(0f, 6.74f, 0f),
                new Vector3(20.6f, 0.06f, 0.06f), red);
            AddText(arch.transform, "KNIGHT FOUNDATION", new Vector3(0f, 7.0f, -0.28f), 0.055f, 48,
                new Color(1f, 0.7f, 0.72f));
            Visuals.GlowSprite(arch.transform, "ArchGlow", new Vector3(0f, 6.7f, -0.4f),
                Palette.Red, 7.5f, 0.12f);

            // Warm horizon glows behind the sign.
            Visuals.GlowSprite(_world, "HorizonGlowA", new Vector3(-90f, 30f, 260f),
                new Color(1f, 0.35f, 0.25f), 80f, 0.16f);
            Visuals.GlowSprite(_world, "HorizonGlowB", new Vector3(100f, 25f, 250f),
                new Color(0.35f, 0.55f, 1f), 60f, 0.12f);
        }

        public void ScrollWorld(float dt, float speed)
        {
            float dz = speed * dt;
            if (RoadMaterial != null)
            {
                Vector2 offset = RoadMaterial.mainTextureOffset;
                offset.y -= dz / 32f;
                RoadMaterial.mainTextureOffset = offset;
            }
            for (int i = 0; i < _scrollables.Count; i++)
            {
                Transform t = _scrollables[i];
                Vector3 p = t.localPosition;
                p.z += dz;
                if (p.z > 70f) p.z -= ScrollSpan;
                t.localPosition = p;
            }
        }
    }
}
