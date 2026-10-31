using UnityEngine;

namespace KnightRider3D
{
    public static class Palette
    {
        public static readonly Color Red = new Color(1f, 0.14f, 0.22f, 1f);
        public static readonly Color RedHot = new Color(1f, 0.32f, 0.36f, 1f);
        public static readonly Color Amber = new Color(1f, 0.71f, 0.28f, 1f);
        public static readonly Color Cyan = new Color(0.5f, 0.91f, 1f, 1f);
        public static readonly Color Ink = new Color(0.018f, 0.022f, 0.04f, 1f);
        public static readonly Color Panel = new Color(0.035f, 0.046f, 0.075f, 0.82f);
        public static readonly Color Line = new Color(1f, 1f, 1f, 0.14f);
        public static readonly Color Muted = new Color(0.55f, 0.6f, 0.7f, 1f);
        public static readonly Color Gold = new Color(0.78f, 0.6f, 0.25f, 1f);
    }

    /// <summary>
    /// Generates every texture at runtime. No image files, no external assets.
    /// </summary>
    public static class TextureFactory
    {
        private static Texture2D _white;
        private static Texture2D _glow;
        private static Texture2D _circle;
        private static Texture2D _circleRing;
        private static Texture2D _ring;
        private static Texture2D _shadow;
        private static Texture2D _asphalt;
        private static Texture2D _sky;
        private static Texture2D _city;
        private static Texture2D _moon;

        public static Texture2D White
        {
            get
            {
                if (_white == null)
                {
                    _white = new Texture2D(1, 1, TextureFormat.RGBA32, false);
                    _white.SetPixel(0, 0, Color.white);
                    _white.Apply();
                    _white.name = "White";
                }
                return _white;
            }
        }

        public static Texture2D Glow
        {
            get
            {
                if (_glow != null) return _glow;
                int size = 128;
                Color32[] pixels = new Color32[size * size];
                for (int y = 0; y < size; y++)
                {
                    for (int x = 0; x < size; x++)
                    {
                        float dx = (x + 0.5f) / size * 2f - 1f;
                        float dy = (y + 0.5f) / size * 2f - 1f;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01(1f - d);
                        a = a * a * (0.28f + 0.72f * Mathf.Pow(a, 2.2f));
                        a = Mathf.Clamp01(a * 1.45f);
                        pixels[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255f));
                    }
                }
                _glow = Make(pixels, size, size, "Glow");
                _glow.wrapMode = TextureWrapMode.Clamp;
                return _glow;
            }
        }

        public static Texture2D Circle
        {
            get
            {
                if (_circle != null) return _circle;
                int size = 128;
                Color32[] pixels = new Color32[size * size];
                for (int y = 0; y < size; y++)
                {
                    for (int x = 0; x < size; x++)
                    {
                        float dx = (x + 0.5f) / size * 2f - 1f;
                        float dy = (y + 0.5f) / size * 2f - 1f;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01((0.96f - d) * 32f);
                        pixels[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255f));
                    }
                }
                _circle = Make(pixels, size, size, "Circle");
                return _circle;
            }
        }

        public static Texture2D CircleRing
        {
            get
            {
                if (_circleRing != null) return _circleRing;
                int size = 128;
                Color32[] pixels = new Color32[size * size];
                for (int y = 0; y < size; y++)
                {
                    for (int x = 0; x < size; x++)
                    {
                        float dx = (x + 0.5f) / size * 2f - 1f;
                        float dy = (y + 0.5f) / size * 2f - 1f;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01(1f - Mathf.Abs(d - 0.88f) * 22f);
                        pixels[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255f));
                    }
                }
                _circleRing = Make(pixels, size, size, "CircleRing");
                return _circleRing;
            }
        }

        public static Texture2D Ring
        {
            get
            {
                if (_ring != null) return _ring;
                int size = 128;
                Color32[] pixels = new Color32[size * size];
                for (int y = 0; y < size; y++)
                {
                    for (int x = 0; x < size; x++)
                    {
                        float dx = (x + 0.5f) / size * 2f - 1f;
                        float dy = (y + 0.5f) / size * 2f - 1f;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01(1f - Mathf.Abs(d - 0.78f) * 18f);
                        pixels[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255f));
                    }
                }
                _ring = Make(pixels, size, size, "Ring");
                return _ring;
            }
        }

        public static Texture2D Shadow
        {
            get
            {
                if (_shadow != null) return _shadow;
                int size = 128;
                Color32[] pixels = new Color32[size * size];
                for (int y = 0; y < size; y++)
                {
                    for (int x = 0; x < size; x++)
                    {
                        float dx = (x + 0.5f) / size * 2f - 1f;
                        float dy = (y + 0.5f) / size * 2f - 1f;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01(1f - d);
                        a = Mathf.Pow(a, 1.7f);
                        pixels[y * size + x] = new Color32(0, 0, 0, (byte)(a * 220f));
                    }
                }
                _shadow = Make(pixels, size, size, "Shadow");
                return _shadow;
            }
        }

        public static Texture2D Asphalt
        {
            get
            {
                if (_asphalt != null) return _asphalt;
                const int W = 256;
                const int H = 512;
                Color32[] pixels = new Color32[W * H];
                Color baseColor = new Color(0.078f, 0.084f, 0.11f);
                Random.State old = Random.state;
                Random.InitState(1982);
                for (int y = 0; y < H; y++)
                {
                    for (int x = 0; x < W; x++)
                    {
                        float n = Random.value;
                        float v = 0.72f + n * 0.5f;
                        pixels[y * W + x] = new Color(baseColor.r * v, baseColor.g * v, baseColor.b * v, 1f);
                    }
                }
                // Broad mottling
                for (int i = 0; i < 120; i++)
                {
                    int cx = Random.Range(0, W);
                    int cy = Random.Range(0, H);
                    int r = Random.Range(8, 42);
                    float bright = Random.value > 0.55f ? 0.045f : -0.05f;
                    for (int y = Mathf.Max(0, cy - r); y < Mathf.Min(H, cy + r); y++)
                    {
                        for (int x = Mathf.Max(0, cx - r); x < Mathf.Min(W, cx + r); x++)
                        {
                            float d = Vector2.Distance(new Vector2(x, y), new Vector2(cx, cy)) / r;
                            if (d >= 1f) continue;
                            float a = (1f - d) * (1f - d) * bright;
                            Color c = pixels[y * W + x];
                            pixels[y * W + x] = new Color(
                                Mathf.Clamp01(c.r + a),
                                Mathf.Clamp01(c.g + a),
                                Mathf.Clamp01(c.b + a), 1f);
                        }
                    }
                }
                // Lane dashes (texture spans 18m x 32m)
                int period = H / 4;
                int dash = Mathf.RoundToInt(period * 0.42f);
                foreach (float laneX in new[] { -4.5f, 0f, 4.5f })
                {
                    int lx = Mathf.RoundToInt((laneX + 9f) / 18f * W);
                    for (int i = 0; i < 4; i++)
                    {
                        int y0 = i * period + 8;
                        for (int y = y0; y < y0 + dash; y++)
                        {
                            for (int x = lx - 1; x <= lx + 1; x++)
                            {
                                if (x < 0 || x >= W || y < 0 || y >= H) continue;
                                pixels[y * W + x] = new Color(0.86f, 0.88f, 0.94f, 1f);
                            }
                        }
                    }
                }
                foreach (float edge in new[] { -8.55f, 8.55f })
                {
                    int ex = Mathf.RoundToInt((edge + 9f) / 18f * W);
                    for (int y = 0; y < H; y++)
                    {
                        for (int x = ex - 1; x <= ex + 1; x++)
                        {
                            if (x < 0 || x >= W) continue;
                            pixels[y * W + x] = new Color(0.83f, 0.86f, 0.93f, 1f);
                        }
                    }
                }
                Random.state = old;
                _asphalt = Make(pixels, W, H, "Asphalt");
                _asphalt.wrapMode = TextureWrapMode.Repeat;
                _asphalt.filterMode = FilterMode.Trilinear;
                _asphalt.anisoLevel = 8;
                return _asphalt;
            }
        }

        public static Texture2D Sky
        {
            get
            {
                if (_sky != null) return _sky;
                const int W = 1024;
                const int H = 512;
                Color32[] pixels = new Color32[W * H];
                Color top = new Color(0.008f, 0.012f, 0.043f);
                Color mid = new Color(0.051f, 0.039f, 0.118f);
                Color horizon = new Color(0.23f, 0.071f, 0.22f);
                Color glow = new Color(0.63f, 0.13f, 0.24f);
                Color ground = new Color(0.035f, 0.024f, 0.055f);
                Random.State old = Random.state;
                Random.InitState(1982);
                for (int y = 0; y < H; y++)
                {
                    float t = (float)y / (H - 1);
                    Color c;
                    if (t < 0.45f) c = Color.Lerp(ground, horizon, t / 0.45f * 0.7f);
                    else if (t < 0.52f) c = Color.Lerp(horizon, glow, (t - 0.45f) / 0.07f);
                    else if (t < 0.68f) c = Color.Lerp(mid, horizon, (0.68f - t) / 0.16f * 0.55f);
                    else c = Color.Lerp(top, mid, (1f - t) / 0.32f);
                    float band = Mathf.Exp(-Mathf.Pow((t - 0.5f) * 34f, 2f));
                    c += new Color(0.26f, 0.09f, 0.05f) * band * 0.45f;
                    for (int x = 0; x < W; x++)
                    {
                        Color px = c;
                        if (t > 0.55f && Random.value < 0.0022f)
                        {
                            float b = 0.45f + Random.value * 0.55f;
                            bool warm = Random.value < 0.16f;
                            px = new Color(warm ? b : b * 0.8f, warm ? b * 0.8f : b * 0.86f,
                                warm ? b * 0.65f : b, 1f);
                        }
                        pixels[y * W + x] = px;
                    }
                }
                Random.state = old;
                _sky = Make(pixels, W, H, "Sky");
                _sky.wrapMode = TextureWrapMode.Clamp;
                return _sky;
            }
        }

        public static Texture2D City
        {
            get
            {
                if (_city != null) return _city;
                const int W = 512;
                const int H = 256;
                Color32[] pixels = new Color32[W * H];
                for (int i = 0; i < pixels.Length; i++) pixels[i] = new Color32(0, 0, 0, 0);
                Random.State old = Random.state;
                Random.InitState(61);
                int x = 0;
                while (x < W)
                {
                    int bw = Random.Range(10, 34);
                    int bh = Random.Range(26, 190);
                    float tint = Random.Range(0.06f, 0.16f);
                    Color body = new Color(tint * 0.55f, tint * 0.45f, tint, 1f);
                    for (int yy = 0; yy < bh; yy++)
                    {
                        for (int xx = 0; xx < bw; xx++)
                        {
                            if (x + xx >= W) continue;
                            pixels[yy * W + x + xx] = body;
                        }
                    }
                    // lit windows
                    for (int wy = 5; wy < bh - 4; wy += 9)
                    {
                        for (int wx = 3; wx < bw - 2; wx += 7)
                        {
                            if (Random.value > 0.36f) continue;
                            bool warm = Random.value < 0.7f;
                            Color win = warm
                                ? new Color(1f, 0.55f + Random.value * 0.3f, 0.22f, 0.9f)
                                : new Color(0.45f, 0.8f, 1f, 0.9f);
                            for (int ay = 0; ay < 3; ay++)
                            {
                                for (int ax = 0; ax < 3; ax++)
                                {
                                    int px = x + wx + ax;
                                    int py = wy + ay;
                                    if (px < W && py < H) pixels[py * W + px] = win;
                                }
                            }
                        }
                    }
                    x += bw + Random.Range(1, 5);
                }
                Random.state = old;
                _city = Make(pixels, W, H, "City");
                return _city;
            }
        }

        public static Texture2D Moon
        {
            get
            {
                if (_moon != null) return _moon;
                const int S = 128;
                Color32[] pixels = new Color32[S * S];
                float cx = S * 0.5f;
                float cy = S * 0.5f;
                for (int y = 0; y < S; y++)
                {
                    for (int x = 0; x < S; x++)
                    {
                        float dx = x - cx;
                        float dy = y - cy;
                        float d = Mathf.Sqrt(dx * dx + dy * dy);
                        float a = Mathf.Clamp01((S * 0.40f - d) * 0.4f);
                        Color c = new Color(0.87f, 0.91f, 1f);
                        // subtle maria
                        float m = Mathf.Sin(dx * 0.31f) * Mathf.Cos(dy * 0.24f);
                        c *= 0.92f + m * 0.06f;
                        pixels[y * S + x] = new Color(c.r, c.g, c.b, a);
                    }
                }
                _moon = Make(pixels, S, S, "Moon");
                return _moon;
            }
        }

        private static Texture2D Make(Color32[] pixels, int w, int h, string name)
        {
            Texture2D tex = new Texture2D(w, h, TextureFormat.RGBA32, false);
            tex.name = name;
            tex.SetPixels32(pixels);
            tex.Apply();
            tex.filterMode = FilterMode.Bilinear;
            return tex;
        }

        public static Sprite ToSprite(Texture2D tex)
        {
            return Sprite.Create(tex, new Rect(0f, 0f, tex.width, tex.height),
                new Vector2(0.5f, 0.5f), 100f, 0, SpriteMeshType.FullRect);
        }
    }

    public static class GameMaterials
    {
        private static Material _body;
        private static Material _trim;
        private static Material _glass;
        private static Material _gold;
        private static Material _tire;
        private static Material _rim;
        private static Material _headlight;
        private static Material _tail;
        private static Material _redLight;
        private static Material _amber;
        private static Material _cyan;
        private static Material _spriteBase;

        private static Material Make(Color color, float metallic, float smoothness, Color? emission = null)
        {
            Material baseMat = Resources.Load<Material>("Materials/StandardBase");
            Material mat = baseMat != null ? new Material(baseMat) : new Material(Shader.Find("Standard"));
            mat.color = color;
            if (mat.HasProperty("_Metallic")) mat.SetFloat("_Metallic", metallic);
            if (mat.HasProperty("_Glossiness")) mat.SetFloat("_Glossiness", smoothness);
            if (emission.HasValue)
            {
                mat.EnableKeyword("_EMISSION");
                if (mat.HasProperty("_EmissionColor")) mat.SetColor("_EmissionColor", emission.Value);
                mat.globalIlluminationFlags = MaterialGlobalIlluminationFlags.RealtimeEmissive;
            }
            return mat;
        }

        public static Material Body => _body ?? (_body = Make(new Color(0.06f, 0.07f, 0.105f), 0.55f, 0.78f));
        public static Material Trim => _trim ?? (_trim = Make(new Color(0.03f, 0.033f, 0.045f), 0.6f, 0.5f));
        public static Material Glass => _glass ?? (_glass = Make(new Color(0.045f, 0.082f, 0.13f), 0.75f, 0.9f));
        public static Material Gold => _gold ?? (_gold = Make(new Color(0.73f, 0.54f, 0.19f), 0.9f, 0.6f, new Color(0.16f, 0.09f, 0.02f)));
        public static Material Tire => _tire ?? (_tire = Make(new Color(0.02f, 0.022f, 0.03f), 0.02f, 0.12f));
        public static Material Rim => _rim ?? (_rim = Make(new Color(0.55f, 0.6f, 0.68f), 0.95f, 0.72f));
        public static Material Headlight => _headlight ?? (_headlight = Make(new Color(0.55f, 0.7f, 0.9f), 0.2f, 0.8f, new Color(0.6f, 0.85f, 1.4f)));
        public static Material Tail => _tail ?? (_tail = Make(new Color(0.36f, 0.02f, 0.04f), 0.2f, 0.5f, new Color(0.6f, 0.02f, 0.05f)));
        public static Material RedLight => _redLight ?? (_redLight = Make(new Color(1f, 0.05f, 0.12f), 0.1f, 0.4f, new Color(2.4f, 0.08f, 0.14f)));
        public static Material Amber => _amber ?? (_amber = Make(new Color(1f, 0.62f, 0.18f), 0.2f, 0.4f, new Color(2.3f, 0.9f, 0.2f)));
        public static Material Cyan => _cyan ?? (_cyan = Make(new Color(0.3f, 0.85f, 1f), 0.2f, 0.4f, new Color(0.3f, 1.9f, 2.4f)));

        public static Material Paint(Color color)
        {
            return Make(color, 0.45f, 0.62f);
        }

        public static Material Emissive(Color color, float strength = 2.2f)
        {
            return Make(color, 0.1f, 0.4f, color * strength);
        }

        public static Material Unlit(Color color, Texture2D texture = null)
        {
            Material mat = SpriteBase != null ? new Material(SpriteBase) : new Material(Shader.Find("Sprites/Default"));
            mat.color = color;
            if (texture != null) mat.mainTexture = texture;
            return mat;
        }

        /// <summary>
        /// Sprites/Default lives in a Resources material so WebGL shader stripping
        /// cannot remove the shader used by runtime-generated glow materials.
        /// </summary>
        public static Material SpriteBase
        {
            get
            {
                if (_spriteBase == null)
                {
                    _spriteBase = Resources.Load<Material>("Materials/SpriteBase");
                    if (_spriteBase == null) _spriteBase = new Material(Shader.Find("Sprites/Default"));
                }
                return _spriteBase;
            }
        }
    }

    public static class Visuals
    {
        private static Sprite _glow;
        private static Sprite _ring;
        private static Sprite _shadow;
        private static Sprite _moon;

        public static Sprite Glow => _glow != null ? _glow : (_glow = TextureFactory.ToSprite(TextureFactory.Glow));
        public static Sprite Ring => _ring != null ? _ring : (_ring = TextureFactory.ToSprite(TextureFactory.Ring));
        public static Sprite Shadow => _shadow != null ? _shadow : (_shadow = TextureFactory.ToSprite(TextureFactory.Shadow));
        public static Sprite Moon => _moon != null ? _moon : (_moon = TextureFactory.ToSprite(TextureFactory.Moon));

        public static Vector3 GlowScale(float size)
        {
            const float unit = 1.28f;
            return Vector3.one * (size / unit);
        }

        public static SpriteRenderer GlowSprite(Transform parent, string name, Vector3 pos, Color color,
            float size, float alpha = 1f)
        {
            GameObject go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = Glow;
            Color c = color;
            c.a = alpha;
            sr.color = c;
            sr.sortingOrder = 4;
            go.transform.localScale = GlowScale(size);
            return sr;
        }

        public static GameObject GroundShadow(Transform parent, Vector3 pos, float w, float l, float alpha = 0.8f)
        {
            Material mat = new Material(GameMaterials.SpriteBase);
            mat.mainTexture = TextureFactory.Shadow;
            mat.color = new Color(0f, 0f, 0f, alpha);
            GameObject go = MeshUtils.MakeMeshObject("Shadow", MeshUtils.Quad(w, l), mat, parent);
            go.transform.localPosition = pos;
            go.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            return go;
        }

        public static SpriteRenderer MoonSprite(Transform parent, Vector3 pos, float size)
        {
            GameObject go = new GameObject("Moon");
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = Moon;
            sr.color = new Color(0.9f, 0.94f, 1f, 1f);
            float unit = 1.28f;
            go.transform.localScale = Vector3.one * (size / unit);
            return sr;
        }
    }

    public static class GameFonts
    {
        private static Font _display;
        private static Font _body;
        private static Font _bodyMedium;

        public static Font Display
        {
            get
            {
                if (_display == null) _display = Resources.Load<Font>("Fonts/Orbitron");
                if (_display == null) _display = Builtin();
                return _display;
            }
        }

        public static Font Body
        {
            get
            {
                if (_body == null) _body = Resources.Load<Font>("Fonts/Rajdhani-SemiBold");
                if (_body == null) _body = Display;
                return _body;
            }
        }

        public static Font BodyMedium
        {
            get
            {
                if (_bodyMedium == null) _bodyMedium = Resources.Load<Font>("Fonts/Rajdhani-Medium");
                if (_bodyMedium == null) _bodyMedium = Body;
                return _bodyMedium;
            }
        }

        private static Font Builtin()
        {
            Font f = null;
            try { f = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf"); } catch { }
            if (f == null)
            {
                try { f = Resources.GetBuiltinResource<Font>("Arial.ttf"); } catch { }
            }
            if (f == null) f = Font.CreateDynamicFontFromOSFont("Arial", 24);
            return f;
        }
    }
}
