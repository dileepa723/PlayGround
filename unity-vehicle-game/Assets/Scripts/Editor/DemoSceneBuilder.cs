using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

/// <summary>
/// One-click demo track generator.
/// Menu: Tools > Vehicle Game > Build Demo Scene.
/// Creates a full playable scene: oval track, 8 gates (lap + finish), coins,
/// ramps, cones, the player car, chase camera, RaceManager and HUD, then saves it.
/// </summary>
public static class DemoSceneBuilder
{
    const float RoadRadius = 55f;   // track centerline radius
    const float RoadWidth = 14f;    // drivable width
    const float RoadTopY = 0.5f;    // top surface of the road slabs
    const int Segments = 56;        // road slab count
    const int Gates = 8;            // checkpoints (gate 0 = FINISH)
    const int Laps = 3;

    [MenuItem("Tools/Vehicle Game/Build Demo Scene")]
    public static void Build()
    {
        var scene = EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);

        // ---------- Materials ----------
        var grass = Solid(new Color(0.36f, 0.60f, 0.30f));
        var asphalt = Solid(new Color(0.24f, 0.24f, 0.27f));
        var kerb = Solid(new Color(0.9f, 0.9f, 0.92f));
        var banner = Solid(new Color(0.95f, 0.75f, 0.10f));
        var bodyCol = Solid(new Color(0.85f, 0.16f, 0.16f));
        var glassCol = Solid(new Color(0.10f, 0.13f, 0.16f));
        var darkCol = Solid(new Color(0.08f, 0.08f, 0.09f));
        var rubberCol = Solid(new Color(0.10f, 0.10f, 0.11f));
        var rimCol = Solid(new Color(0.55f, 0.55f, 0.58f));
        var coinCol = Solid(new Color(1f, 0.82f, 0.15f));
        var rampCol = Solid(new Color(0.72f, 0.38f, 0.12f));
        var coneCol = Solid(new Color(1f, 0.45f, 0.05f));

        // ---------- Ground ----------
        var ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
        ground.name = "Ground";
        ground.transform.position = Vector3.zero;
        ground.transform.localScale = Vector3.one * 30f;   // 300 x 300
        ground.GetComponent<Renderer>().sharedMaterial = grass;
        ground.isStatic = true;

        // ---------- Road (segments of an oval) ----------
        float circumference = 2f * Mathf.PI * RoadRadius;
        float segLen = circumference / Segments + 0.5f;    // slight overlap, no gaps
        for (int i = 0; i < Segments; i++)
        {
            float a = i * Mathf.PI * 2f / Segments;
            Vector3 pos = Circle(a, RoadRadius);
            pos.y = 0.25f;                                  // slab center: top at RoadTopY
            Box("Road " + i, null, pos, Vector3.zero, new Vector3(segLen, 0.5f, RoadWidth), asphalt);
        }

        // White finish strip at gate 0.
        {
            Vector3 pos = Circle(0f, RoadRadius);
            pos.y = RoadTopY + 0.02f;
            Box("FinishStrip", null, pos, Vector3.zero, new Vector3(2.5f, 0.04f, RoadWidth), kerb);
        }

        // ---------- Gates / checkpoints ----------
        for (int i = 0; i < Gates; i++)
        {
            float a = i * Mathf.PI * 2f / Gates;
            float gateHeight = i == 0 ? 8f : 7f;

            var gate = new GameObject(i == 0 ? "Gate 0 (FINISH)" : "Gate " + i);
            gate.transform.position = Circle(a, RoadRadius);
            gate.transform.position = new Vector3(gate.transform.position.x, RoadTopY, gate.transform.position.z);
            gate.transform.rotation = Quaternion.LookRotation(Tangent(a));

            Box("Pillar L", gate.transform, new Vector3(-RoadWidth * 0.5f - 0.5f, gateHeight * 0.5f, 0f),
                Vector3.zero, new Vector3(0.8f, gateHeight, 0.9f), kerb);
            Box("Pillar R", gate.transform, new Vector3(RoadWidth * 0.5f + 0.5f, gateHeight * 0.5f, 0f),
                Vector3.zero, new Vector3(0.8f, gateHeight, 0.9f), kerb);
            Box("Banner", gate.transform, new Vector3(0f, gateHeight + 0.4f, 0f),
                Vector3.zero, new Vector3(RoadWidth + 2f, 0.9f, 0.9f), i == 0 ? banner : kerb);

            int order = i;
            bool isFinish = i == 0;
            var trigger = new GameObject("GateTrigger", typeof(BoxCollider), typeof(Checkpoint));
            trigger.transform.SetParent(gate.transform, false);
            trigger.transform.localPosition = new Vector3(0f, gateHeight * 0.5f, 0f);
            var col = trigger.GetComponent<BoxCollider>();
            col.isTrigger = true;
            col.size = new Vector3(RoadWidth, gateHeight, 3.5f);
            var cp = trigger.GetComponent<Checkpoint>();
            cp.Order = order;
            cp.IsFinish = isFinish;
        }

        // ---------- Coins (3 per gate gap, centerline) ----------
        for (int i = 0; i < Gates; i++)
        {
            float gapAngle = Mathf.PI * 2f / Gates;
            for (int k = 1; k <= 3; k++)
            {
                float a = i * gapAngle + gapAngle * k / 4f;
                Vector3 pos = Circle(a, RoadRadius);
                pos.y = RoadTopY + 0.85f;
                var coin = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                coin.name = "Coin " + i + "-" + k;
                coin.transform.position = pos;
                coin.transform.localScale = new Vector3(0.9f, 0.9f, 0.2f);
                coin.GetComponent<Renderer>().sharedMaterial = coinCol;
                coin.GetComponent<SphereCollider>().isTrigger = true;
                coin.AddComponent<CoinCollectible>();
            }
        }

        // ---------- Fun zone: ramps + cones ----------
        var fun = new GameObject("FunZone");
        Box("Ramp A", fun.transform, new Vector3(-6f, 0.8f, 6f), new Vector3(-16f, 25f, 0f),
            new Vector3(9f, 0.6f, 7f), rampCol);
        Box("Ramp B", fun.transform, new Vector3(10f, 0.8f, -2f), new Vector3(-16f, -110f, 0f),
            new Vector3(9f, 0.6f, 7f), rampCol);

        for (int i = 0; i < 6; i++)
        {
            float a = Mathf.PI * 2f * i / 6f + 0.3f;
            Vector3 pos = Circle(a, RoadRadius - (RoadWidth * 0.5f - 1.6f));
            pos.y = RoadTopY + 0.55f;
            Box("Cone " + i, null, pos, Vector3.zero, new Vector3(0.7f, 1.1f, 0.7f), coneCol);
        }

        // ---------- Player car ----------
        var car = new GameObject("Player", typeof(Rigidbody), typeof(VehicleController), typeof(BoxCollider));
        float spawnA = 0.045f;   // just past the finish line, behind gate 1
        car.transform.position = Circle(spawnA, RoadRadius);
        car.transform.position = new Vector3(car.transform.position.x, RoadTopY, car.transform.position.z);
        car.transform.rotation = Quaternion.LookRotation(Tangent(spawnA));

        Box("Body", car.transform, new Vector3(0f, 0.75f, 0f), Vector3.zero,
            new Vector3(2.05f, 0.85f, 4.5f), bodyCol);
        Box("Cabin", car.transform, new Vector3(0f, 1.38f, -0.35f), Vector3.zero,
            new Vector3(1.65f, 0.6f, 1.9f), glassCol);
        Box("Spoiler", car.transform, new Vector3(0f, 1.32f, -2.25f), Vector3.zero,
            new Vector3(2.1f, 0.12f, 0.55f), darkCol);

        var boxCol = car.GetComponent<BoxCollider>();
        boxCol.center = new Vector3(0f, 0.9f, 0f);
        boxCol.size = new Vector3(2.0f, 1.8f, 4.4f);

        var wheelsParent = new GameObject("Wheels");
        wheelsParent.transform.SetParent(car.transform, false);
        var front = new List<Transform>();
        var rear = new List<Transform>();
        AddWheel(wheelsParent.transform, "Wheel FL", new Vector3(-0.98f, 0.34f, 1.45f), rubberCol, rimCol, front);
        AddWheel(wheelsParent.transform, "Wheel FR", new Vector3(0.98f, 0.34f, 1.45f), rubberCol, rimCol, front);
        AddWheel(wheelsParent.transform, "Wheel RL", new Vector3(-0.98f, 0.34f, -1.45f), rubberCol, rimCol, rear);
        AddWheel(wheelsParent.transform, "Wheel RR", new Vector3(0.98f, 0.34f, -1.45f), rubberCol, rimCol, rear);

        var controller = car.GetComponent<VehicleController>();
        controller.frontWheels = front.ToArray();
        controller.rearWheels = rear.ToArray();
        controller.maxSpeed = 120f;
        controller.boostMaxSpeed = 170f;

        var rb2 = car.GetComponent<Rigidbody>();
        rb2.mass = 1200f;

        // ---------- Camera ----------
        Camera cam = Camera.main;
        if (cam == null) cam = Object.FindObjectOfType<Camera>();
        if (cam != null)
        {
            cam.transform.position = car.transform.position - car.transform.forward * 7.5f + Vector3.up * 3.2f;
            cam.transform.rotation = Quaternion.LookRotation(car.transform.position - cam.transform.position);
            var follow = cam.gameObject.AddComponent<CameraFollow>();
            follow.target = car.transform;
            follow.baseFov = 65f;
            follow.maxFov = 82f;
        }

        // ---------- Race manager ----------
        var race = new GameObject("RaceManager", typeof(RaceManager));
        race.GetComponent<RaceManager>().totalLaps = Laps;

        // ---------- HUD ----------
        BuildHud();

        // ---------- Save + build settings ----------
        if (!AssetDatabase.IsValidFolder("Assets/Scenes"))
            AssetDatabase.CreateFolder("Assets", "Scenes");
        const string scenePath = "Assets/Scenes/Vehicle Demo.unity";
        EditorSceneManager.SaveScene(scene, scenePath);

        var list = new List<EditorBuildSettingsScene>(EditorBuildSettings.scenes);
        if (!list.Exists(s => s.path == scenePath))
        {
            list.Add(new EditorBuildSettingsScene(scenePath, true));
            EditorBuildSettings.scenes = list.ToArray();
        }

        Debug.Log("Vehicle demo scene created at " + scenePath + " — press Play to drive!");
    }

    static void BuildHud()
    {
        var canvasGo = new GameObject("HUD", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
        var canvas = canvasGo.GetComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        var scaler = canvasGo.GetComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920f, 1080f);
        scaler.matchWidthOrHeight = 0.5f;

        Font font = DefaultFont();

        var hud = canvasGo.AddComponent<GameHUD>();

        var white = Color.white;
        var soft = new Color(1f, 1f, 1f, 0.75f);
        var gold = new Color(1f, 0.85f, 0.3f);

        hud.speedText = TextOn("Speed", canvas.transform, font, new Vector2(0f, 0f), new Vector2(0f, 0f),
            new Vector2(30f, 34f), new Vector2(420f, 70f), 46f, TextAnchor.LowerLeft, white);
        AddOutline(hud.speedText, new Color(0f, 0f, 0f, 0.9f), 3f);

        // Boost bar
        var label = TextOn("BoostLabel", canvas.transform, font, new Vector2(0f, 0f), new Vector2(0f, 0f),
            new Vector2(30f, 116f), new Vector2(220f, 24f), 18f, TextAnchor.LowerLeft, soft);
        label.text = "BOOST";

        var bg = ImageOn("BoostBG", canvas.transform, new Vector2(0f, 0f), new Vector2(0f, 0f),
            new Vector2(30f, 146f), new Vector2(220f, 20f), new Color(0f, 0f, 0f, 0.55f));
        var fillGo = new GameObject("BoostFill", typeof(RectTransform), typeof(Image));
        fillGo.transform.SetParent(bg.transform, false);
        var frt = fillGo.GetComponent<RectTransform>();
        frt.anchorMin = new Vector2(0f, 0f);
        frt.anchorMax = new Vector2(0f, 1f);
        frt.pivot = new Vector2(0f, 0.5f);
        frt.offsetMin = Vector2.zero;
        frt.sizeDelta = new Vector2(220f, 0f);
        frt.localScale = Vector3.one;
        fillGo.GetComponent<Image>().color = new Color(0.4f, 0.9f, 1f);
        hud.boostFill = fillGo.GetComponent<Image>();

        hud.timeText = TextOn("Time", canvas.transform, font, new Vector2(0.5f, 1f), new Vector2(0.5f, 1f),
            new Vector2(0f, -30f), new Vector2(500f, 70f), 46f, TextAnchor.UpperCenter, white);
        AddOutline(hud.timeText, new Color(0f, 0f, 0f, 0.9f), 3f);

        hud.bestText = TextOn("Best", canvas.transform, font, new Vector2(0.5f, 1f), new Vector2(0.5f, 1f),
            new Vector2(0f, -104f), new Vector2(500f, 30f), 22f, TextAnchor.UpperCenter, gold);

        hud.lapText = TextOn("Lap", canvas.transform, font, new Vector2(0f, 1f), new Vector2(0f, 1f),
            new Vector2(30f, -30f), new Vector2(340f, 40f), 32f, TextAnchor.UpperLeft, white);
        AddOutline(hud.lapText, new Color(0f, 0f, 0f, 0.9f), 3f);

        hud.coinText = TextOn("Coins", canvas.transform, font, new Vector2(1f, 1f), new Vector2(1f, 1f),
            new Vector2(-30f, -30f), new Vector2(340f, 40f), 32f, TextAnchor.UpperRight, gold);
        AddOutline(hud.coinText, new Color(0, 0, 0, 0.9f), 3f);

        hud.messageText = TextOn("Message", canvas.transform, font, new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f),
            new Vector2(0f, 130f), new Vector2(1500f, 110f), 64f, TextAnchor.MiddleCenter, white);
        AddOutline(hud.messageText, new Color(0f, 0f, 0f, 0.95f), 5f);

        var hints = TextOn("Hints", canvas.transform, font, new Vector2(1f, 0f), new Vector2(1f, 0f),
            new Vector2(-30f, 34f), new Vector2(760f, 30f), 20f, TextAnchor.LowerRight, soft);
        hints.text = "WASD / arrows drive   •   SHIFT boost   •   SPACE drift   •   R reset";
    }

    // ---------- helpers ----------

    static Vector3 Circle(float angle, float radius)
    {
        return new Vector3(Mathf.Sin(angle) * radius, 0f, Mathf.Cos(angle) * radius);
    }

    static Vector3 Tangent(float angle)
    {
        return new Vector3(Mathf.Cos(angle), 0f, -Mathf.Sin(angle));
    }

    static GameObject Box(string name, Transform parent, Vector3 localPos, Vector3 localRot, Vector3 scale, Material mat)
    {
        var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
        go.name = name;
        if (parent != null) go.transform.SetParent(parent, false);
        go.transform.localPosition = localPos;
        if (localRot != Vector3.zero) go.transform.localRotation = Quaternion.Euler(localRot);
        go.transform.localScale = scale;
        go.GetComponent<Renderer>().sharedMaterial = mat;
        return go;
    }

    static void AddWheel(Transform parent, string name, Vector3 localPos, Material rubber, Material rim, List<Transform> list)
    {
        var wheel = new GameObject(name);
        wheel.transform.SetParent(parent, false);
        wheel.transform.localPosition = localPos;
        wheel.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);   // cylinder axis -> X

        var tire = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        tire.name = "Tire";
        Object.DestroyImmediate(tire.GetComponent<Collider>());
        tire.transform.SetParent(wheel.transform, false);
        tire.transform.localScale = new Vector3(0.68f, 0.22f, 0.68f);
        tire.GetComponent<Renderer>().sharedMaterial = rubber;

        var hub = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        hub.name = "Hub";
        Object.DestroyImmediate(hub.GetComponent<Collider>());
        hub.transform.SetParent(wheel.transform, false);
        hub.transform.localScale = new Vector3(0.4f, 0.42f, 0.4f);
        hub.GetComponent<Renderer>().sharedMaterial = rim;

        list.Add(wheel.transform);
    }

    static GameObject ImageOn(string name, Transform parent, Vector2 anchor, Vector2 pivot,
        Vector2 pos, Vector2 size, Color color)
    {
        var go = new GameObject(name, typeof(RectTransform), typeof(Image));
        go.transform.SetParent(parent, false);
        var rt = go.GetComponent<RectTransform>();
        SetRect(rt, anchor, pivot, pos, size);
        go.GetComponent<Image>().color = color;
        go.GetComponent<Image>().raycastTarget = false;
        return go;
    }

    static Text TextOn(string name, Transform parent, Font font, Vector2 anchor, Vector2 pivot,
        Vector2 pos, Vector2 size, float fontSize, TextAnchor align, Color color)
    {
        var go = new GameObject(name, typeof(RectTransform));
        go.transform.SetParent(parent, false);
        SetRect(go.GetComponent<RectTransform>(), anchor, pivot, pos, size);
        var t = go.AddComponent<Text>();
        if (font != null) t.font = font;
        t.fontSize = (int)fontSize;
        t.alignment = align;
        t.color = color;
        t.horizontalOverflow = HorizontalWrapMode.Overflow;
        t.verticalOverflow = VerticalWrapMode.Overflow;
        t.raycastTarget = false;
        return t;
    }

    static void SetRect(RectTransform rt, Vector2 anchor, Vector2 pivot, Vector2 pos, Vector2 size)
    {
        rt.anchorMin = anchor;
        rt.anchorMax = anchor;
        rt.pivot = pivot;
        rt.anchoredPosition = pos;
        rt.sizeDelta = size;
    }

    static void AddOutline(Graphic graphic, Color color, float thickness)
    {
        if (graphic == null) return;
        var outline = graphic.gameObject.AddComponent<Outline>();
        outline.effectColor = color;
        outline.effectDistance = new Vector2(thickness, thickness);
    }

    static Font DefaultFont()
    {
        string[] names = { "LegacyRuntime.ttf", "Arial.ttf" };
        foreach (string n in names)
        {
            try
            {
                var f = Resources.GetBuiltinResource<Font>(n);
                if (f != null) return f;
            }
            catch { /* try next */ }
        }
        return null;
    }

    static Material Solid(Color c)
    {
        Shader shader = Shader.Find("Standard");
        if (shader == null) shader = Shader.Find("Universal Render Pipeline/Lit");
        if (shader == null) shader = Shader.Find("Unlit/Color");
        if (shader == null) shader = Shader.Find("Sprites/Default");
        var m = new Material(shader);
        if (m.HasProperty("_Color")) m.color = c;
        else if (m.HasProperty("_BaseColor")) m.SetColor("_BaseColor", c);
        return m;
    }
}
