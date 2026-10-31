using UnityEngine;

namespace KnightRider3D
{
    public class TrafficVehicle
    {
        public GameObject Go;
        public bool Active;
        public bool Passed;
        public bool Scored;
        public bool Collided;
        public float X;
        public float Z;
        public float Speed;
        public float HalfW;
        public float HalfL;
        public string Kind;
    }

    public class EnemyVehicle
    {
        public GameObject Go;
        public bool Active;
        public bool Passed;
        public bool Scored;
        public bool Collided;
        public float X;
        public float Z;
        public float Speed;
        public float Phase;
        public GameObject RedLight;
        public GameObject BlueLight;
        public SpriteRenderer Glow;
    }

    public class DataCore
    {
        public GameObject Go;
        public bool Active;
        public float X;
        public float Z;
        public float Bob;
        public Transform Core;
        public Transform Ring1;
        public Transform Ring2;
    }

    public class Ramp
    {
        public GameObject Go;
        public bool Active;
        public float X;
        public float Z;
    }

    public static class VehicleFactory
    {
        private static readonly Color[] TrafficColors =
        {
            new Color(0.55f, 0.13f, 0.19f),
            new Color(0.16f, 0.25f, 0.40f),
            new Color(0.74f, 0.72f, 0.68f),
            new Color(0.24f, 0.25f, 0.28f),
            new Color(0.35f, 0.40f, 0.47f),
            new Color(0.49f, 0.23f, 0.15f),
            new Color(0.14f, 0.30f, 0.29f),
            new Color(0.62f, 0.58f, 0.51f)
        };

        public static TrafficVehicle BuildTraffic(string kind)
        {
            TrafficVehicle vehicle = new TrafficVehicle();
            vehicle.Kind = kind;
            vehicle.HalfW = kind == "truck" ? 1.15f : 1.0f;
            vehicle.HalfL = kind == "truck" ? 3.6f : 2.3f;
            GameObject group = new GameObject("Traffic_" + kind);
            vehicle.Go = group;
            Transform root = group.transform;

            Color paint = TrafficColors[Random.Range(0, TrafficColors.Length)];
            Material paintMat = GameMaterials.Paint(paint);
            Material glassMat = GameMaterials.Glass;
            Material trimMat = GameMaterials.Trim;

            if (kind == "truck")
            {
                MeshUtils.Box(root, "Box", new Vector3(0f, 1.45f, 0f),
                    new Vector3(2.2f, 2.1f, 5.4f), paintMat);
                MeshUtils.Box(root, "Cab", new Vector3(0f, 1.06f, -3.1f),
                    new Vector3(2.15f, 1.35f, 1.7f), paintMat);
                MeshUtils.Box(root, "Windshield", new Vector3(0f, 1.35f, -3.96f),
                    new Vector3(1.9f, 0.62f, 0.05f), glassMat);
                MeshUtils.Box(root, "Chassis", new Vector3(0f, 0.45f, 0f),
                    new Vector3(2.0f, 0.35f, 6.6f), trimMat);
                for (int z = -1; z <= 1; z += 2)
                {
                    for (int x = -1; x <= 1; x += 2)
                    {
                        GameObject pivot = new GameObject("Wheel");
                        pivot.transform.SetParent(root, false);
                        pivot.transform.localPosition = new Vector3(x * 0.92f, 0.46f, z * 2.25f);
                        KittCar.BuildWheel(pivot.transform, 0.46f, 0.30f, false);
                    }
                }
            }
            else if (kind == "suv")
            {
                MeshUtils.Box(root, "Body", new Vector3(0f, 0.66f, 0f),
                    new Vector3(1.98f, 0.72f, 4.5f), paintMat);
                MeshUtils.MakeMeshObject("Cabin", MeshUtils.Cabin(1.84f, 0.64f, 2.7f),
                    glassMat, root).transform.localPosition = new Vector3(0f, 1.24f, 0.28f);
                MeshUtils.Box(root, "Roof", new Vector3(0f, 1.56f, 0.36f),
                    new Vector3(1.66f, 0.08f, 2.2f), paintMat);
                AddWheels(root, 1.45f, 0.40f);
            }
            else
            {
                MeshUtils.MakeMeshObject("Body", MeshUtils.Wedge(1.92f, 0.56f, 4.3f, 0.2f),
                    paintMat, root).transform.localPosition = new Vector3(0f, 0.56f, 0f);
                MeshUtils.MakeMeshObject("Cabin", MeshUtils.Cabin(1.66f, 0.52f, 1.95f),
                    glassMat, root).transform.localPosition = new Vector3(0f, 1.02f, 0.15f);
                AddWheels(root, 1.4f, 0.34f);
            }

            float rearZ = kind == "truck" ? 2.72f : kind == "suv" ? 2.27f : 2.16f;
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(root, "Tail", new Vector3(side * (kind == "truck" ? 0.84f : 0.66f),
                        kind == "truck" ? 1.0f : 0.66f, rearZ),
                    new Vector3(0.34f, 0.12f, 0.03f), GameMaterials.Tail);
                Visuals.GlowSprite(root, "TailGlow",
                    new Vector3(side * (kind == "truck" ? 0.84f : 0.66f),
                        kind == "truck" ? 1.0f : 0.66f, rearZ + 0.04f),
                    Palette.Red, 0.40f, 0.45f);
                MeshUtils.Box(root, "Head", new Vector3(side * 0.62f, 0.62f, kind == "truck" ? -3.97f : -2.15f),
                    new Vector3(0.36f, 0.10f, 0.02f), GameMaterials.Headlight);
            }

            Visuals.GroundShadow(root, new Vector3(0f, 0.012f, 0f), 2.4f,
                kind == "truck" ? 7.2f : 4.8f, 0.8f);
            group.SetActive(false);
            return vehicle;
        }

        private static void AddWheels(Transform root, float z, float radius)
        {
            for (int x = -1; x <= 1; x += 2)
            {
                for (int s = -1; s <= 1; s += 2)
                {
                    GameObject pivot = new GameObject("Wheel");
                    pivot.transform.SetParent(root, false);
                    pivot.transform.localPosition = new Vector3(x * 0.9f, radius, s * z);
                    KittCar.BuildWheel(pivot.transform, radius, 0.26f, false);
                }
            }
        }

        public static EnemyVehicle BuildEnemy()
        {
            EnemyVehicle enemy = new EnemyVehicle();
            GameObject group = new GameObject("Interceptor");
            enemy.Go = group;
            Transform root = group.transform;
            Material bodyMat = GameMaterials.Paint(new Color(0.055f, 0.06f, 0.085f));
            Material cabinMat = GameMaterials.Glass;
            Material trim = GameMaterials.Trim;

            MeshUtils.MakeMeshObject("Body", MeshUtils.Wedge(2.08f, 0.66f, 4.8f, 0.26f),
                bodyMat, root).transform.localPosition = new Vector3(0f, 0.62f, 0f);
            MeshUtils.MakeMeshObject("Cabin", MeshUtils.Cabin(1.78f, 0.58f, 2.1f),
                cabinMat, root).transform.localPosition = new Vector3(0f, 1.12f, 0.22f);
            MeshUtils.Box(root, "BullBar", new Vector3(0f, 0.42f, -2.42f),
                new Vector3(2.0f, 0.22f, 0.24f), trim);

            for (int x = -1; x <= 1; x += 2)
            {
                for (int z = -1; z <= 1; z += 2)
                {
                    GameObject pivot = new GameObject("Wheel");
                    pivot.transform.SetParent(root, false);
                    pivot.transform.localPosition = new Vector3(x * 0.98f, 0.40f, z * 1.55f);
                    KittCar.BuildWheel(pivot.transform, 0.40f, 0.30f, false);
                }
            }

            MeshUtils.Box(root, "LightBarBase", new Vector3(0f, 1.46f, 0.1f),
                new Vector3(1.15f, 0.09f, 0.3f), trim);
            enemy.RedLight = MeshUtils.Box(root, "RedLight", new Vector3(-0.28f, 1.53f, 0.1f),
                new Vector3(0.42f, 0.12f, 0.18f), GameMaterials.RedLight);
            enemy.BlueLight = MeshUtils.Box(root, "BlueLight", new Vector3(0.28f, 1.53f, 0.1f),
                new Vector3(0.42f, 0.12f, 0.18f), GameMaterials.Emissive(new Color(0.1f, 0.35f, 1f), 2.4f));
            enemy.Glow = Visuals.GlowSprite(root, "LightGlow", new Vector3(0f, 1.52f, 0.12f),
                Palette.Red, 1.4f, 0.5f);

            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(root, "Tail", new Vector3(side * 0.62f, 0.72f, 2.42f),
                    new Vector3(0.50f, 0.10f, 0.02f), GameMaterials.Tail);
            }
            Visuals.GroundShadow(root, new Vector3(0f, 0.012f, 0f), 2.6f, 5.6f, 0.85f);
            group.SetActive(false);
            return enemy;
        }

        public static DataCore BuildCore()
        {
            DataCore core = new DataCore();
            GameObject group = new GameObject("DataCore");
            core.Go = group;
            core.Core = MeshUtils.MakeMeshObject("Core", MeshUtils.Octahedron(0.42f),
                GameMaterials.Emissive(new Color(1f, 0.72f, 0.26f), 2.8f), group.transform).transform;
            GameObject ring1 = MeshUtils.MakeMeshObject("Ring1", MeshUtils.Ring(0.66f, 0.75f, 40),
                GameMaterials.Emissive(new Color(1f, 0.8f, 0.4f), 2.2f), group.transform);
            ring1.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            GameObject ring2 = MeshUtils.MakeMeshObject("Ring2", MeshUtils.Ring(0.84f, 0.91f, 40),
                GameMaterials.Emissive(new Color(1f, 0.8f, 0.4f), 2.2f), group.transform);
            ring2.transform.localRotation = Quaternion.Euler(72f, 12f, 0f);
            core.Ring1 = ring1.transform;
            core.Ring2 = ring2.transform;
            Visuals.GlowSprite(group.transform, "CoreGlow", Vector3.zero,
                new Color(1f, 0.66f, 0.2f), 2.8f, 0.55f);
            group.SetActive(false);
            return core;
        }

        public static Ramp BuildRamp()
        {
            Ramp ramp = new Ramp();
            GameObject group = new GameObject("Ramp");
            ramp.Go = group;
            Transform root = group.transform;
            MeshUtils.MakeMeshObject("RampMesh", MeshUtils.Ramp(3.4f, 7.5f, 1.45f),
                GameMaterials.Paint(new Color(0.09f, 0.10f, 0.14f)), root);
            Material amber = GameMaterials.Amber;
            for (int i = 0; i < 4; i++)
            {
                float t = (i + 0.5f) / 4f;
                float z = 3.75f - t * 7.5f;
                float y = t * 1.45f + 0.035f;
                MeshUtils.Box(root, "Chevron", new Vector3(0f, y, z),
                    new Vector3(2.3f, 0.035f, 0.18f), amber,
                    Quaternion.Euler(-11f, 0f, 0f));
            }
            for (int side = -1; side <= 1; side += 2)
            {
                MeshUtils.Box(root, "Edge", new Vector3(side * 1.7f, 0.72f, 0f),
                    new Vector3(0.09f, 0.06f, 7.5f), GameMaterials.Cyan,
                    Quaternion.Euler(-11f, 0f, 0f));
            }
            group.SetActive(false);
            return ramp;
        }
    }
}
