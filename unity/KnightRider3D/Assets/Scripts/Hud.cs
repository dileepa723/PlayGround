using UnityEngine;

namespace KnightRider3D
{
    /// <summary>
    /// Mirror of the web HUD, drawn entirely with IMGUI so the Unity build needs
    /// no prefabs, canvases or external sprites. Also owns mobile touch buttons,
    /// which are polled directly so steering and firing work at the same time.
    /// </summary>
    public class Hud : MonoBehaviour
    {
        private const float VirtualHeight = 1080f;

        private GameManager _game;
        private bool _touch;
        private bool _portrait;
        private bool _compact;
        private float _scale = 1f;
        private float _vw = 1920f;
        private float _pad = 34f;
        private bool _stylesReady;
        private Texture2D _white;
        private Texture2D _circle;
        private Texture2D _ring;
        private int _best;
        private bool _savedOver;

        private GUIStyle _micro;
        private GUIStyle _label;
        private GUIStyle _value;
        private GUIStyle _score;
        private GUIStyle _titleKnight;
        private GUIStyle _titleRider;
        private GUIStyle _eyebrow;
        private GUIStyle _headline;
        private GUIStyle _body;
        private GUIStyle _blurb;
        private GUIStyle _button;
        private GUIStyle _buttonSmall;
        private GUIStyle _center;
        private GUIStyle _centerBig;
        private GUIStyle _toast;
        private GUIStyle _key;
        private GUIStyle _statLabel;
        private GUIStyle _statValue;

        private Rect _steerLeft;
        private Rect _steerRight;
        private Rect _brakeRect;
        private Rect _boostRect;
        private Rect _fireRect;
        private Rect _pauseRect;
        private Rect _soundRect;

        private bool _leftHeld;
        private bool _rightHeld;

        public bool IsTouch { get { return _touch; } }
        public bool TouchBrake { get; private set; }
        public bool TouchBoost { get; private set; }
        public bool TouchFire { get; private set; }

        public float TouchSteer
        {
            get { return (_rightHeld ? 1f : 0f) - (_leftHeld ? 1f : 0f); }
        }

        public void Init(GameManager game)
        {
            _game = game;
            _touch = Application.isMobilePlatform ||
                (Input.touchSupported && Mathf.Min(Screen.width, Screen.height) <= 900);
            _best = PlayerPrefs.GetInt("KITT_BEST", 0);
            RefreshLayout();
        }

        private void Update()
        {
            if (_game == null) return;
            RefreshLayout();
            _touch = Application.isMobilePlatform ||
                (Input.touchSupported && Mathf.Min(Screen.width, Screen.height) <= 900);

            if (_game.State == GameState.Over)
            {
                if (!_savedOver)
                {
                    _savedOver = true;
                    int score = Mathf.RoundToInt(_game.Score);
                    if (score > _best)
                    {
                        _best = score;
                        PlayerPrefs.SetInt("KITT_BEST", _best);
                        PlayerPrefs.Save();
                    }
                }
            }
            else
            {
                _savedOver = false;
            }

            if (_touch) ReadTouches();
            else ClearTouchState();
        }

        private void ClearTouchState()
        {
            _leftHeld = false;
            _rightHeld = false;
            TouchBrake = false;
            TouchBoost = false;
            TouchFire = false;
        }

        private void ReadTouches()
        {
            ClearTouchState();
            if (_game.State != GameState.Playing && _game.State != GameState.Paused) return;

            bool usedMouse = false;
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    Touch t = Input.touches[i];
                    Vector2 p = ToGui(t.position);
                    if (_game.State == GameState.Playing) ApplyPoint(p);
                    if (t.phase == TouchPhase.Began)
                    {
                        if (_pauseRect.Contains(p)) _game.TogglePause();
                        else if (_soundRect.Contains(p)) _game.Audio.ToggleMute();
                    }
                }
                usedMouse = true;
            }

            // Editor / desktop fallback when the touch layout is forced on.
            if (!usedMouse && Input.GetMouseButton(0))
            {
                Vector2 p = ToGui(Input.mousePosition);
                if (_game.State == GameState.Playing) ApplyPoint(p);
            }
        }

        private void ApplyPoint(Vector2 p)
        {
            if (_steerLeft.Contains(p)) _leftHeld = true;
            if (_steerRight.Contains(p)) _rightHeld = true;
            if (_brakeRect.Contains(p)) TouchBrake = true;
            if (_boostRect.Contains(p)) TouchBoost = true;
            if (_fireRect.Contains(p)) TouchFire = true;
        }

        private Vector2 ToGui(Vector3 screenPoint)
        {
            return new Vector2(screenPoint.x / _scale, (Screen.height - screenPoint.y) / _scale);
        }

        public bool PointerBlocked(Vector2 screenPoint)
        {
            Vector2 p = ToGui(screenPoint);
            return _steerLeft.Contains(p) || _steerRight.Contains(p) ||
                _brakeRect.Contains(p) || _boostRect.Contains(p) || _fireRect.Contains(p) ||
                _pauseRect.Contains(p) || _soundRect.Contains(p);
        }

        private void RefreshLayout()
        {
            float h = Mathf.Max(1f, Screen.height);
            _scale = Mathf.Clamp(h / VirtualHeight, 0.42f, 1.4f);
            _vw = Screen.width / _scale;
            _portrait = Screen.height > Screen.width;
            _compact = _vw < 900f;
            _pad = Mathf.Clamp(_vw * 0.019f, 18f, 40f);

            float top = _compact ? 18f : 32f;
            float pauseY = top + (_compact ? 78f : 122f);            _pauseRect = new Rect(_vw - _pad - 46f, pauseY, 46f, 46f);
            _soundRect = new Rect(_pauseRect.x - 56f, pauseY, 46f, 46f);

            float mid = VirtualHeight * 0.54f;
            if (!_portrait)
            {
                _steerLeft = new Rect(_pad + 2f, mid - 58f, 118f, 118f);
                _steerRight = new Rect(_pad + 140f, mid - 58f, 118f, 118f);
                _brakeRect = new Rect(_vw - _pad - 332f, mid - 36f, 94f, 94f);
                _boostRect = new Rect(_vw - _pad - 232f, mid - 68f, 104f, 104f);
                _fireRect = new Rect(_vw - _pad - 112f, mid - 38f, 112f, 112f);
            }
            else
            {
                _steerLeft = new Rect(_pad + 4f, VirtualHeight - 296f, 110f, 110f);
                _steerRight = new Rect(_pad + 126f, VirtualHeight - 296f, 110f, 110f);
                _brakeRect = new Rect(_vw - _pad - 268f, VirtualHeight - 236f, 84f, 84f);
                _boostRect = new Rect(_vw - _pad - 176f, VirtualHeight - 266f, 96f, 96f);
                _fireRect = new Rect(_vw - _pad - 94f, VirtualHeight - 316f, 94f, 94f);
            }
        }

        private void EnsureStyles()
        {
            if (_stylesReady) return;
            _stylesReady = true;
            _white = TextureFactory.White;
            _circle = TextureFactory.Circle;
            _ring = TextureFactory.Ring;

            _micro = MakeStyle(GameFonts.Display, 10, TextAnchor.UpperLeft);
            _label = MakeStyle(GameFonts.Body, 13, TextAnchor.UpperLeft);
            _value = MakeStyle(GameFonts.Display, 20, TextAnchor.UpperLeft);
            _score = MakeStyle(GameFonts.Display, 48, TextAnchor.UpperRight);
            _titleKnight = MakeStyle(GameFonts.Display, 112, TextAnchor.MiddleLeft);
            _titleKnight.fontStyle = FontStyle.Bold;
            _titleRider = MakeStyle(GameFonts.Display, 136, TextAnchor.MiddleLeft);
            _titleRider.fontStyle = FontStyle.Bold;
            _eyebrow = MakeStyle(GameFonts.Display, 11, TextAnchor.MiddleLeft);
            _headline = MakeStyle(GameFonts.Display, 54, TextAnchor.MiddleLeft);
            _headline.fontStyle = FontStyle.Bold;
            _body = MakeStyle(GameFonts.Body, 22, TextAnchor.UpperLeft);
            _blurb = MakeStyle(GameFonts.Body, 19, TextAnchor.UpperLeft);
            _blurb.wordWrap = true;
            _button = MakeStyle(GameFonts.Display, 19, TextAnchor.MiddleCenter);
            _button.fontStyle = FontStyle.Bold;
            _buttonSmall = MakeStyle(GameFonts.Display, 11, TextAnchor.MiddleCenter);
            _center = MakeStyle(GameFonts.Body, 16, TextAnchor.MiddleCenter);
            _centerBig = MakeStyle(GameFonts.Display, 30, TextAnchor.MiddleCenter);
            _centerBig.fontStyle = FontStyle.Bold;
            _toast = MakeStyle(GameFonts.Display, 19, TextAnchor.MiddleCenter);
            _toast.fontStyle = FontStyle.Bold;
            _key = MakeStyle(GameFonts.Display, 12, TextAnchor.MiddleCenter);
            _statLabel = MakeStyle(GameFonts.Display, 10, TextAnchor.MiddleCenter);
            _statValue = MakeStyle(GameFonts.Display, 26, TextAnchor.MiddleCenter);
            _statValue.fontStyle = FontStyle.Bold;
        }

        private static GUIStyle MakeStyle(Font font, int size, TextAnchor anchor)
        {
            GUIStyle style = new GUIStyle();
            style.font = font;
            style.fontSize = size;
            style.alignment = anchor;
            style.normal.textColor = Color.white;
            style.wordWrap = false;
            style.richText = false;
            style.clipping = TextClipping.Overflow;
            return style;
        }

        private void OnGUI()
        {
            if (_game == null) return;
            RefreshLayout();
            EnsureStyles();

            Matrix4x4 oldMatrix = GUI.matrix;
            GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, new Vector3(_scale, _scale, 1f));

            if (_game.State == GameState.Menu)
            {
                DrawTitle();
            }
            else
            {
                DrawHud();
                if (_game.State == GameState.Playing && _touch) DrawTouchControls();
                if (_game.State == GameState.Paused) DrawPause();
                if (_game.State == GameState.Over && _game.OverDelay <= 0f) DrawGameOver();
            }

            DrawDamageFlash();
            GUI.matrix = oldMatrix;
        }

        // ------------------------------------------------------------------ title

        private void DrawTitle()
        {
            float left = _pad + (float)(_vw > 1280 ? 34 : 0);
            float contentW = Mathf.Min(_vw - left - _pad, 780f);

            if (!_portrait)
            {
                RectFill(new Rect(0f, 0f, _vw * 0.40f, VirtualHeight), new Color(0.008f, 0.012f, 0.025f, 0.82f));
                RectFill(new Rect(_vw * 0.40f, 0f, _vw * 0.20f, VirtualHeight), new Color(0.008f, 0.012f, 0.025f, 0.44f));
                RectFill(new Rect(_vw * 0.60f, 0f, _vw * 0.16f, VirtualHeight), new Color(0.008f, 0.012f, 0.025f, 0.16f));
            }
            else
            {
                RectFill(new Rect(0f, 0f, _vw, VirtualHeight), new Color(0.008f, 0.012f, 0.025f, 0.56f));
            }

            DrawEdgeVignette();

            // Top rail
            RectFill(new Rect(left, 42f, 3f, 20f), Palette.Red);
            DrawText(new Rect(left + 12f, 36f, 480f, 30f), "KNIGHT INDUSTRIES", _micro,
                new Color(0.78f, 0.82f, 0.9f), false);
            if (!_portrait)
            {
                DrawText(new Rect(_vw - _pad - 420f, 36f, 420f, 30f), "KF-3D  /  1982  /  NEVADA", _micro,
                    new Color(0.62f, 0.67f, 0.78f), false);
            }

            float titleSize = Mathf.Clamp(_vw * 0.066f, 54f, 118f);
            _titleKnight.fontSize = Mathf.RoundToInt(titleSize);
            _titleRider.fontSize = Mathf.RoundToInt(titleSize * 1.18f);

            float y = _portrait ? 218f : 236f;
            DrawText(new Rect(left, y - 34f, contentW, 28f),
                "A KNIGHT FOUNDATION PURSUIT SIMULATION  ·  3D", _eyebrow,
                new Color(0.62f, 0.68f, 0.8f), false);
            RectFill(new Rect(left, y - 14f, Mathf.Min(120f, contentW * 0.2f), 2f),
                new Color(1f, 0.14f, 0.22f, 0.8f));

            DrawText(new Rect(left, y, contentW, titleSize * 1.05f), "KNIGHT", _titleKnight,
                new Color(0.95f, 0.97f, 1f), true);
            DrawText(new Rect(left, y + titleSize * 0.88f, contentW, titleSize * 1.3f), "RIDER", _titleRider,
                new Color(1f, 0.14f, 0.22f), true);

            float scanY = y + titleSize * 2.16f;
            DrawScannerStrip(new Rect(left, scanY, Mathf.Min(360f, contentW), 18f), 12, true);

            DrawText(new Rect(left, scanY + 32f, contentW, 34f),
                "One man. One machine. A highway full of trouble.", _body,
                new Color(0.84f, 0.88f, 0.96f), true);
            DrawText(new Rect(left, scanY + 68f, Mathf.Min(contentW, 620f), 62f),
                "Take the wheel of K.I.T.T. — turbo through the Nevada night, collect\nFoundation data cores and laser the interceptors off the road.",
                _blurb, new Color(0.55f, 0.61f, 0.72f), false);

            Rect startButton = new Rect(left, scanY + 148f, Mathf.Min(390f, contentW), 86f);
            if (TextButton(startButton, "▶   ENGAGE", Palette.Red, true))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.StartRun();
            }
            DrawText(new Rect(startButton.x + 20f, startButton.yMax - 24f, startButton.width - 40f, 18f),
                _touch ? "TAP TO DEPLOY" : "PRESS ENTER OR TAP", _micro,
                new Color(0.75f, 0.8f, 0.9f), false);

            float controlsY = startButton.yMax + 30f;
            if (!_portrait)
            {
                DrawKeyHint(left, controlsY, "W", "THROTTLE");
                DrawKeyHint(left + 150f, controlsY, "A / D", "STEER");
                DrawKeyHint(left + 290f, controlsY, "SHIFT", "TURBO");
                DrawKeyHint(left + 430f, controlsY, "F", "LASER");
            }
            else
            {
                DrawText(new Rect(left, controlsY, contentW, 46f),
                    _touch ? "ON-SCREEN STEERING  ·  TURBO  ·  LASER" : "WASD DRIVE  ·  SHIFT TURBO  ·  F FIRE  ·  P PAUSE",
                    _label, new Color(0.55f, 0.61f, 0.72f), false);
            }

            if (!_portrait)
            {
                float sideX = _vw - _pad - 310f;
                RectFill(new Rect(_vw - _pad - 318f, 470f, 1f, 250f), new Color(1f, 1f, 1f, 0.12f));
                DrawText(new Rect(sideX, 482f, 310f, 26f), "UNIT  K.I.T.T.", _micro,
                    new Color(0.78f, 0.82f, 0.9f), false);
                DrawText(new Rect(sideX, 512f, 310f, 120f),
                    "KNIGHT INDUSTRIES\nTWO THOUSAND\nAI  ONLINE\nSHELL  ARMED", _label,
                    new Color(0.52f, 0.58f, 0.7f), false);
                DrawText(new Rect(sideX, 664f, 310f, 90f),
                    "FAN-MADE TRIBUTE\nTHREE.JS + UNITY\nNO COPYRIGHTED AUDIO", _micro,
                    new Color(0.4f, 0.45f, 0.55f), false);
            }

            string bestText = _best > 0 ? "BEST SCORE  " + _best.ToString("000000") : "NO RUNS ON RECORD";
            DrawText(new Rect(_pad, VirtualHeight - 64f, _vw * 0.45f, 24f),
                "◈  AUDIO RECOMMENDED — HEADPHONES ON", _micro,
                new Color(0.4f, 0.45f, 0.55f), false);
            DrawText(new Rect(_vw * 0.42f, VirtualHeight - 64f, _vw * 0.56f - _pad, 24f),
                bestText + "   ·   WEBGL / UNITY  ·  60FPS", _micro,
                new Color(0.4f, 0.45f, 0.55f), true);
        }

        private void DrawKeyHint(float x, float y, string key, string label)
        {
            float w = Mathf.Max(46f, key.Length * 15f);
            Rect cap = new Rect(x, y, w, 32f);
            RectFill(cap, new Color(0.03f, 0.04f, 0.06f, 0.75f));
            Border(cap, new Color(1f, 1f, 1f, 0.2f), 1f);
            DrawText(cap, key, _key, Color.white, false);
            DrawText(new Rect(x + w + 10f, y + 7f, 120f, 24f), label, _micro,
                new Color(0.55f, 0.61f, 0.72f), false);
        }

        // -------------------------------------------------------------------- hud

        private void DrawHud()
        {
            float top = _compact ? 18f : 32f;
            float missionW = _compact ? Mathf.Min(_vw * 0.55f, 330f) : 360f;

            // Mission / timer panel
            Rect mission = new Rect(_pad, top, missionW, _compact ? 96f : 122f);
            Panel(mission, Palette.Red);
            DrawText(new Rect(mission.x + 16f, mission.y + 10f, mission.width - 24f, 18f),
                "KNIGHT FOUNDATION  /  MOBILE UNIT", _micro, new Color(0.6f, 0.65f, 0.75f), false);
            DrawText(new Rect(mission.x + 16f, mission.y + (_compact ? 28f : 30f), mission.width - 24f, 30f),
                "PURSUIT PROTOCOL", _value, new Color(0.94f, 0.96f, 1f), true);

            float statY = mission.y + (_compact ? 56f : 66f);
            DrawText(new Rect(mission.x + 16f, statY, 150f, 16f), "MISSION TIME", _micro,
                new Color(0.48f, 0.53f, 0.62f), false);
            string timeText = FormatTime(_game.TimeLeft);
            Color timeColor = _game.TimeLeft <= 15f
                ? new Color(1f, 0.3f, 0.36f) : new Color(1f, 0.71f, 0.28f);
            DrawText(new Rect(mission.x + 16f, statY + 16f, 150f, 28f), timeText, _value, timeColor, true);
            DrawText(new Rect(mission.x + 150f, statY, mission.width - 172f, 16f), "DISTANCE", _micro,
                new Color(0.48f, 0.53f, 0.62f), false);
            DrawText(new Rect(mission.x + 150f, statY + 16f, mission.width - 172f, 28f),
                _game.DistanceMiles.ToString("0.00") + " MI", _value, timeColor, true);

            // Score
            float scoreW = _compact ? Mathf.Min(210f, _vw * 0.4f) : 360f;
            float scoreX = _vw - _pad - scoreW;
            DrawText(new Rect(scoreX, top, scoreW, 22f), "SCORE", _micro,
                new Color(0.48f, 0.53f, 0.62f), false);
            _score.fontSize = _compact ? 32 : 48;
            DrawText(new Rect(scoreX, top + (_compact ? 16f : 20f), scoreW, _compact ? 44f : 62f),
                Mathf.RoundToInt(_game.Score).ToString("000000"), _score, Color.white, true);
            if (_game.Combo > 0)
            {
                DrawText(new Rect(scoreX, top + (_compact ? 58f : 80f), scoreW, 24f),
                    "COMBO  ×" + Multiplier().ToString("0.00"), _micro,
                    new Color(1f, 0.71f, 0.28f), true);
            }

            if (!_compact)
            {
                DrawDefense(new Rect(_pad, VirtualHeight - _pad - 158f, 270f, 158f));
                DrawPursuit(new Rect(_vw - _pad - 484f, VirtualHeight - _pad - 138f, 232f, 138f));
                DrawSpeedGauge(new Rect(_vw - _pad - 236f, VirtualHeight - _pad - 236f, 220f, 220f));
            }
            else if (!_portrait)
            {
                DrawCompactBars(new Rect(_pad, top + 104f, 330f, 72f));
                DrawText(new Rect(scoreX, top + 82f, scoreW, 36f),
                    Mathf.RoundToInt(_game.SpeedMph) + " MPH", _value,
                    new Color(1f, 0.55f, 0.55f), true);
            }
            else
            {
                DrawCompactBars(new Rect(_pad, top + 104f, Mathf.Min(_vw - _pad * 2f, 430f), 72f));
                DrawText(new Rect(scoreX, top + 82f, scoreW, 36f),
                    Mathf.RoundToInt(_game.SpeedMph) + " MPH", _value,
                    new Color(1f, 0.55f, 0.55f), true);
            }

            DrawTargetLock();
            DrawToasts();
            DrawSystemButtons();
        }

        private float Multiplier()
        {
            return 1f + Mathf.Min(_game.Combo, 12) * 0.25f;
        }

        private void DrawSystemButtons()
        {
            bool hover = _pauseRect.Contains(Event.current.mousePosition);
            RectFill(_pauseRect, new Color(0.02f, 0.03f, 0.05f, hover ? 0.9f : 0.62f));
            Border(_pauseRect, new Color(1f, 0.14f, 0.22f, hover ? 0.9f : 0.35f), 1f);
            DrawText(_pauseRect, "II", _buttonSmall, new Color(0.85f, 0.9f, 1f), false);
            if (GUI.Button(_pauseRect, GUIContent.none, GUIStyle.none))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.TogglePause();
            }

            bool soundHover = _soundRect.Contains(Event.current.mousePosition);
            RectFill(_soundRect, new Color(0.02f, 0.03f, 0.05f, soundHover ? 0.9f : 0.62f));
            Border(_soundRect, new Color(1f, 1f, 1f, soundHover ? 0.55f : 0.18f), 1f);
            bool muted = _game.Audio != null && _game.Audio.Muted;
            DrawText(_soundRect, muted ? "OFF" : "SFX", _micro, muted
                ? new Color(1f, 0.42f, 0.4f) : new Color(0.72f, 0.78f, 0.9f), false);
            if (GUI.Button(_soundRect, GUIContent.none, GUIStyle.none))
            {
                if (_game.Audio != null) _game.Audio.ToggleMute();
            }
        }

        private void DrawDefense(Rect panel)
        {
            Panel(panel, new Color(1f, 0.14f, 0.22f, 0.8f));
            DrawText(new Rect(panel.x + 14f, panel.y + 10f, panel.width - 24f, 18f),
                "MOLECULAR BONDED SHELL", _micro, new Color(0.48f, 0.53f, 0.62f), false);

            float rowY = panel.y + 34f;
            float gap = 5f;
            float cellW = (panel.width - 28f - gap * 3f) / 4f;
            for (int i = 0; i < 4; i++)
            {
                Rect cell = new Rect(panel.x + 14f + i * (cellW + gap), rowY, cellW, 12f);
                bool on = _game.Shield > i * 25f + 1f;
                Color c = _game.Shield < 38f
                    ? new Color(1f, 0.71f, 0.28f) : new Color(1f, 0.22f, 0.28f);
                RectFill(cell, on ? c : new Color(1f, 1f, 1f, 0.08f));
                if (on) RectFill(new Rect(cell.x, cell.y, cell.width, 2f), new Color(1f, 1f, 1f, 0.35f));
            }

            DrawText(new Rect(panel.x + panel.width - 110f, rowY + 16f, 96f, 34f),
                Mathf.RoundToInt(_game.Shield) + "%", _value,
                _game.Shield < 38f ? new Color(1f, 0.71f, 0.28f) : Color.white, true);

            float turboY = panel.y + 90f;
            DrawText(new Rect(panel.x + 14f, turboY, 180f, 18f), "TURBO", _micro,
                new Color(0.5f, 0.91f, 1f), false);
            DrawBar(new Rect(panel.x + 14f, turboY + 18f, panel.width - 28f, 10f),
                _game.Turbo / 100f, _game.Turbo < 25f
                    ? new Color(1f, 0.71f, 0.28f) : new Color(0.5f, 0.91f, 1f));

            string state = _game.BoostActive ? "BOOST ENGAGED" : _game.Turbo > 99f ? "RESERVOIR FULL" : "CHARGING";
            DrawText(new Rect(panel.x + 14f, panel.y + 128f, panel.width - 28f, 18f),
                state, _micro, new Color(0.42f, 0.48f, 0.6f), false);
        }

        private void DrawCompactBars(Rect area)
        {
            DrawText(new Rect(area.x, area.y, 140f, 16f), "SHELL " + Mathf.RoundToInt(_game.Shield) + "%",
                _micro, _game.Shield < 38f ? new Color(1f, 0.71f, 0.28f) : new Color(1f, 0.4f, 0.45f), false);
            DrawBar(new Rect(area.x, area.y + 18f, area.width, 8f), _game.Shield / 100f,
                _game.Shield < 38f ? new Color(1f, 0.71f, 0.28f) : new Color(1f, 0.22f, 0.28f));
            DrawText(new Rect(area.x, area.y + 34f, 140f, 16f), "TURBO " + Mathf.RoundToInt(_game.Turbo) + "%",
                _micro, new Color(0.5f, 0.91f, 1f), false);
            DrawBar(new Rect(area.x, area.y + 52f, area.width, 8f), _game.Turbo / 100f,
                _game.Turbo < 25f ? new Color(1f, 0.71f, 0.28f) : new Color(0.5f, 0.91f, 1f));
        }

        private void DrawPursuit(Rect panel)
        {
            Panel(panel, new Color(0.5f, 0.91f, 1f, 0.55f));
            DrawText(new Rect(panel.x + 14f, panel.y + 10f, panel.width - 24f, 18f),
                "PURSUIT SYSTEMS", _micro, new Color(0.48f, 0.53f, 0.62f), false);
            DrawPursuitRow(panel, 36f, "KOS", _game.TargetEnemy != null ? "LOCKED" : "STANDBY",
                _game.TargetEnemy != null ? new Color(1f, 0.35f, 0.4f) : new Color(0.55f, 0.6f, 0.7f));
            DrawPursuitRow(panel, 62f, "LASER", _game.LaserCooldown <= 0.001f ? "READY" : "CYCLING",
                _game.LaserCooldown <= 0.001f ? new Color(0.5f, 0.91f, 1f) : new Color(1f, 0.71f, 0.28f));
            DrawPursuitRow(panel, 88f, "HEAT", _game.Speed > 110f ? "HOT" : "COLD",
                _game.Speed > 110f ? new Color(1f, 0.42f, 0.36f) : new Color(0.55f, 0.6f, 0.7f));
            DrawText(new Rect(panel.x + 14f, panel.y + 112f, panel.width - 24f, 18f),
                _touch ? "TAP FIRE TO DEPLOY LASER" : "F / CLICK TO FIRE", _micro,
                new Color(0.42f, 0.48f, 0.6f), false);
        }

        private void DrawPursuitRow(Rect panel, float y, string key, string value, Color valueColor)
        {
            RectFill(new Rect(panel.x + 14f, panel.y + y + 21f, panel.width - 28f, 1f),
                new Color(1f, 1f, 1f, 0.06f));
            DrawText(new Rect(panel.x + 14f, panel.y + y, 60f, 20f), key, _micro,
                new Color(0.48f, 0.53f, 0.62f), false);
            GUIStyle right = _micro;
            TextAnchor oldAnchor = right.alignment;
            right.alignment = TextAnchor.UpperRight;
            DrawText(new Rect(panel.x + 74f, panel.y + y, panel.width - 88f, 20f), value, right, valueColor, false);
            right.alignment = oldAnchor;
        }

        private void DrawSpeedGauge(Rect area)
        {
            Vector2 center = new Vector2(area.x + area.width * 0.5f, area.y + area.height * 0.5f);
            float radius = area.width * 0.405f;
            float norm = Mathf.Clamp01(_game.SpeedMph / 320f);

            Matrix4x4 old = GUI.matrix;
            for (int i = 0; i < 27; i++)
            {
                float t = i / 26f;
                float angle = 135f + t * 270f;
                bool lit = t <= norm + 0.001f;
                Color c = lit
                    ? Color.Lerp(new Color(1f, 0.63f, 0.24f), new Color(1f, 0.16f, 0.24f), t)
                    : new Color(1f, 1f, 1f, 0.09f);
                GUI.matrix = old;
                GUIUtility.RotateAroundPivot(angle, center);
                float tall = i % 5 == 0 ? 15f : 9f;
                RectFill(new Rect(center.x - 1.5f, center.y - radius - tall, 3f, tall), c);
            }
            GUI.matrix = old;

            Rect inner = new Rect(center.x - radius * 0.78f, center.y - radius * 0.78f,
                radius * 1.56f, radius * 1.56f);
            Color prev = GUI.color;
            GUI.color = new Color(1f, 1f, 1f, 0.95f);
            GUI.DrawTexture(inner, _circle);
            GUI.color = new Color(0.03f, 0.04f, 0.07f, 0.94f);
            GUI.DrawTexture(inner, _circle);
            GUI.color = new Color(1f, 0.14f, 0.22f, 0.22f);
            GUI.DrawTexture(new Rect(area.x, area.y, area.width, area.height), _ring);
            GUI.color = prev;

            DrawText(new Rect(area.x, area.y + area.height * 0.26f, area.width, 30f), "K.I.T.T.", _micro,
                new Color(1f, 0.4f, 0.44f), false);
            GUIStyle speed = _value;
            speed.alignment = TextAnchor.MiddleCenter;
            speed.fontSize = 44;
            DrawText(new Rect(area.x, area.y + area.height * 0.42f, area.width, 54f),
                Mathf.RoundToInt(_game.SpeedMph).ToString(), speed, Color.white, true);
            speed.fontSize = 20;
            DrawText(new Rect(area.x, area.y + area.height * 0.43f + 54f, area.width, 26f), "MPH", _micro,
                new Color(1f, 0.35f, 0.4f), false);
            speed.alignment = TextAnchor.UpperLeft;
            speed.fontSize = 20;

            DrawText(new Rect(area.x, area.yMax - 26f, area.width, 20f),
                _game.BoostActive ? "TURBO" : _game.Speed > 2f ? "DRIVE" : "STANDBY", _micro,
                _game.BoostActive ? new Color(0.5f, 0.91f, 1f) : new Color(0.45f, 0.5f, 0.62f), false);
        }

        private void DrawTargetLock()
        {
            if (_game.TargetEnemy == null || _game.MainCamera == null) return;
            Vector3 world = _game.TargetEnemy.Go.transform.position + Vector3.up * 1.1f;
            Vector3 sp = _game.MainCamera.WorldToScreenPoint(world);
            if (sp.z <= 0f) return;
            Vector2 p = new Vector2(sp.x / _scale, (Screen.height - sp.y) / _scale);
            float w = _compact ? 110f : 156f;
            float h = _compact ? 72f : 102f;
            Rect box = new Rect(p.x - w * 0.5f, p.y - h * 0.5f, w, h);
            Color c = new Color(1f, 0.22f, 0.28f, 0.95f);
            float len = 18f;
            float th = 2f;
            RectFill(new Rect(box.x, box.y, len, th), c);
            RectFill(new Rect(box.x, box.y, th, len), c);
            RectFill(new Rect(box.xMax - len, box.y, len, th), c);
            RectFill(new Rect(box.xMax - th, box.y, th, len), c);
            RectFill(new Rect(box.x, box.yMax - th, len, th), c);
            RectFill(new Rect(box.x, box.yMax - len, th, len), c);
            RectFill(new Rect(box.xMax - len, box.yMax - th, len, th), c);
            RectFill(new Rect(box.xMax - th, box.yMax - len, th, len), c);
            DrawText(new Rect(box.x - 40f, box.yMax + 4f, box.width + 80f, 22f), "TARGET LOCKED",
                _micro, new Color(1f, 0.42f, 0.4f), true);
        }

        private void DrawToasts()
        {
            for (int i = 0; i < _game.Toasts.Count; i++)
            {
                ToastMsg t = _game.Toasts[i];
                float a = Mathf.Clamp01(t.Life / 0.55f);
                float y = VirtualHeight * 0.55f + i * 32f - (1.45f - t.Life) * 16f;
                Color c = t.Color;
                c.a = a;
                DrawText(new Rect(0f, y, _vw, 30f), t.Text, _toast, c, true);
            }
        }

        // ------------------------------------------------------------------ pause

        private void DrawPause()
        {
            RectFill(new Rect(0f, 0f, _vw, VirtualHeight), new Color(0.005f, 0.007f, 0.015f, 0.68f));
            float w = Mathf.Min(640f, _vw - _pad * 2f);
            float h = 430f;
            Rect panel = new Rect((_vw - w) * 0.5f, (VirtualHeight - h) * 0.5f, w, h);
            Panel(panel, Palette.Red);
            DrawText(new Rect(panel.x, panel.y + 36f, panel.width, 24f), "SYSTEM HOLD", _micro,
                new Color(1f, 0.42f, 0.4f), true);
            _headline.fontSize = 54;
            DrawText(new Rect(panel.x, panel.y + 62f, panel.width, 72f), "PAUSED", _headline,
                Color.white, true);
            DrawScannerStrip(new Rect(panel.x + w * 0.5f - 90f, panel.y + 138f, 180f, 14f), 8, false);
            DrawText(new Rect(panel.x + 40f, panel.y + 168f, panel.width - 80f, 50f),
                "K.I.T.T. is holding position. The convoy won't wait forever.", _center,
                new Color(0.55f, 0.61f, 0.72f), false);

            Rect resume = new Rect(panel.x + 40f, panel.y + 242f, panel.width - 80f, 64f);
            if (TextButton(resume, "RESUME", Palette.Red, true))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.Resume();
            }
            Rect abort = new Rect(panel.x + 40f, panel.y + 318f, panel.width - 80f, 54f);
            if (TextButton(abort, "ABORT MISSION", new Color(0.5f, 0.91f, 1f), false))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.GoMenu();
            }
            DrawText(new Rect(panel.x, panel.yMax - 26f, panel.width, 18f),
                "PRESS P OR ESC TO RESUME", _micro, new Color(0.42f, 0.48f, 0.6f), false);
        }

        // -------------------------------------------------------------- game over

        private void DrawGameOver()
        {
            RectFill(new Rect(0f, 0f, _vw, VirtualHeight), new Color(0.005f, 0.007f, 0.015f, 0.72f));
            float w = Mathf.Min(820f, _vw - _pad * 2f);
            float h = Mathf.Min(640f, VirtualHeight - 80f);
            Rect panel = new Rect((_vw - w) * 0.5f, (VirtualHeight - h) * 0.5f, w, h);
            Panel(panel, Palette.Red);

            bool timedOut = _game.EndReason == "time";
            DrawText(new Rect(panel.x, panel.y + 24f, panel.width, 22f), "MISSION DEBRIEF", _micro,
                new Color(1f, 0.42f, 0.4f), true);
            _headline.fontSize = _compact ? 38 : 50;
            DrawText(new Rect(panel.x + 20f, panel.y + 48f, panel.width - 40f, 62f),
                timedOut ? "TIME EXPIRED" : "K.I.T.T. DISABLED", _headline,
                timedOut ? new Color(1f, 0.71f, 0.28f) : new Color(1f, 0.22f, 0.28f), true);
            DrawScannerStrip(new Rect(panel.x + 20f, panel.y + 114f, Mathf.Min(220f, panel.width * 0.35f), 13f),
                8, timedOut);

            float gridY = panel.y + 150f;
            float cellW = (panel.width - 60f) / 3f;
            float rowH = 86f;
            DrawStat(panel.x + 30f, gridY, cellW, rowH, "SCORE", Mathf.RoundToInt(_game.Score).ToString("000000"), Color.white);
            DrawStat(panel.x + 30f + cellW, gridY, cellW, rowH, "DISTANCE",
                _game.DistanceMiles.ToString("0.00") + " MI", new Color(1f, 0.71f, 0.28f));
            DrawStat(panel.x + 30f + cellW * 2f, gridY, cellW, rowH, "TOP SPEED",
                Mathf.RoundToInt(_game.TopSpeed * 2.23694f) + " MPH", new Color(0.5f, 0.91f, 1f));
            DrawStat(panel.x + 30f, gridY + rowH, cellW, rowH, "INTERCEPTORS",
                _game.Kills.ToString(), new Color(1f, 0.42f, 0.4f));
            DrawStat(panel.x + 30f + cellW, gridY + rowH, cellW, rowH, "DATA CORES",
                _game.Cores.ToString(), new Color(1f, 0.71f, 0.28f));
            DrawStat(panel.x + 30f + cellW * 2f, gridY + rowH, cellW, rowH, "BEST COMBO",
                "×" + _game.BestMultiplier.ToString("0.00"), new Color(0.5f, 0.91f, 1f));

            string rank = Rank(_game.Score);
            float rankY = panel.y + 344f;
            RectFill(new Rect(panel.x + 30f, rankY, panel.width - 60f, 1f), new Color(1f, 1f, 1f, 0.1f));
            DrawText(new Rect(panel.x + 30f, rankY + 16f, 180f, 26f), "RATING", _micro,
                new Color(0.48f, 0.53f, 0.62f), false);
            _centerBig.fontSize = 38;
            DrawText(new Rect(panel.x + 30f, rankY + 32f, 70f, 54f), rank, _centerBig,
                new Color(1f, 0.71f, 0.28f), true);
            DrawText(new Rect(panel.x + 108f, rankY + 36f, panel.width - 150f, 48f),
                Quote(rank), _body, new Color(0.7f, 0.75f, 0.85f), false);

            float buttonY = panel.y + h - 130f;
            Rect again = new Rect(panel.x + 30f, buttonY, (panel.width - 76f) * 0.58f, 60f);
            if (TextButton(again, "DRIVE AGAIN", Palette.Red, true))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.StartRun();
            }
            Rect menu = new Rect(again.xMax + 16f, buttonY, panel.width - 60f - again.width - 16f, 60f);
            if (TextButton(menu, "MAIN MENU", new Color(0.5f, 0.91f, 1f), false))
            {
                if (_game.Audio != null) _game.Audio.Click();
                _game.GoMenu();
            }
            DrawText(new Rect(panel.x, panel.yMax - 30f, panel.width, 20f),
                "PRESS ENTER TO RESTART", _micro, new Color(0.42f, 0.48f, 0.6f), false);
        }

        private void DrawStat(float x, float y, float w, float h, string label, string value, Color color)
        {
            RectFill(new Rect(x, y, w - 18f, h - 12f), new Color(1f, 1f, 1f, 0.025f));
            RectFill(new Rect(x, y, w - 18f, 1f), new Color(1f, 1f, 1f, 0.07f));
            DrawText(new Rect(x, y + 12f, w - 18f, 18f), label, _statLabel,
                new Color(0.48f, 0.53f, 0.62f), false);
            _statValue.fontSize = _compact ? 20 : 26;
            DrawText(new Rect(x, y + 34f, w - 18f, 38f), value, _statValue, color, true);
        }

        private string Rank(float score)
        {
            if (score >= 30000f) return "S";
            if (score >= 18000f) return "A";
            if (score >= 9000f) return "B";
            if (score >= 4000f) return "C";
            return "D";
        }

        private string Quote(string rank)
        {
            if (rank == "S") return "\"A machine can learn the value of a human life.\"";
            if (rank == "A") return "\"Not bad for a machine.\"";
            if (rank == "B") return "\"The Foundation expects results.\"";
            if (rank == "C") return "\"Adequate, Michael. Barely.\"";
            return "\"Recalibrating pursuit parameters.\"";
        }

        // ---------------------------------------------------------- touch controls

        private void DrawTouchControls()
        {
            DrawTouchCircle(_steerLeft, "L", "STEER", new Color(0.7f, 0.78f, 0.9f), _leftHeld);
            DrawTouchCircle(_steerRight, "R", "STEER", new Color(0.7f, 0.78f, 0.9f), _rightHeld);
            DrawTouchCircle(_brakeRect, "V", "BRAKE", new Color(1f, 0.71f, 0.28f), TouchBrake);
            DrawTouchCircle(_boostRect, ">>", "TURBO", new Color(0.5f, 0.91f, 1f), TouchBoost);
            DrawTouchCircle(_fireRect, "F", "FIRE", new Color(1f, 0.32f, 0.36f), TouchFire);
        }

        private void DrawTouchCircle(Rect r, string glyph, string label, Color accent, bool held)
        {
            float d = Mathf.Min(r.width, r.height);
            Rect square = new Rect(r.x + (r.width - d) * 0.5f, r.y + (r.height - d) * 0.5f, d, d);
            Color prev = GUI.color;

            GUI.color = new Color(0.015f, 0.02f, 0.035f, held ? 0.9f : 0.55f);
            GUI.DrawTexture(square, _circle);
            GUI.color = new Color(accent.r, accent.g, accent.b, held ? 0.32f : 0.08f);
            GUI.DrawTexture(square, _circle);
            GUI.color = new Color(accent.r, accent.g, accent.b, held ? 1f : 0.55f);
            GUI.DrawTexture(square, _ring);
            GUI.color = prev;

            GUIStyle glyphStyle = _button;
            glyphStyle.alignment = TextAnchor.MiddleCenter;
            glyphStyle.fontSize = Mathf.RoundToInt(d * 0.28f);
            DrawText(new Rect(square.x, square.y + d * 0.18f, d, d * 0.44f), glyph, glyphStyle,
                held ? Color.white : new Color(0.82f, 0.86f, 0.94f), true);
            DrawText(new Rect(square.x, square.y + d * 0.58f, d, d * 0.24f), label, _micro,
                accent, false);

            glyphStyle.fontSize = 19;
            glyphStyle.alignment = TextAnchor.MiddleCenter;
        }

        // --------------------------------------------------------------- primitives

        private static string FormatTime(float seconds)
        {
            int total = Mathf.Max(0, Mathf.CeilToInt(seconds));
            return (total / 60).ToString("00") + ":" + (total % 60).ToString("00");
        }

        private void Panel(Rect r, Color accent)
        {
            RectFill(r, new Color(0.02f, 0.027f, 0.046f, 0.78f));
            Border(r, new Color(1f, 1f, 1f, 0.13f), 1f);
            RectFill(new Rect(r.x, r.y, 2f, r.height), accent);
            RectFill(new Rect(r.x, r.y, r.width, 1f), new Color(1f, 1f, 1f, 0.06f));
        }

        private void Border(Rect r, Color color, float thickness)
        {
            RectFill(new Rect(r.x, r.y, r.width, thickness), color);
            RectFill(new Rect(r.x, r.yMax - thickness, r.width, thickness), color);
            RectFill(new Rect(r.x, r.y, thickness, r.height), color);
            RectFill(new Rect(r.xMax - thickness, r.y, thickness, r.height), color);
        }

        private void RectFill(Rect r, Color color)
        {
            if (r.width <= 0f || r.height <= 0f) return;
            Color prev = GUI.color;
            GUI.color = color;
            GUI.DrawTexture(r, _white);
            GUI.color = prev;
        }

        private void DrawText(Rect r, string text, GUIStyle style, Color color, bool shadow)
        {
            if (shadow)
            {
                Color prev = GUI.color;
                GUI.color = new Color(0f, 0f, 0f, Mathf.Clamp01(color.a * 0.65f));
                GUI.Label(new Rect(r.x + 1.5f, r.y + 2f, r.width, r.height), text, style);
                GUI.color = prev;
            }
            Color old = GUI.color;
            GUI.color = color;
            GUI.Label(r, text, style);
            GUI.color = old;
        }

        private bool TextButton(Rect r, string label, Color accent, bool primary)
        {
            bool hover = r.Contains(Event.current.mousePosition);
            RectFill(r, primary
                ? new Color(accent.r * 0.38f, accent.g * 0.12f, accent.b * 0.14f, hover ? 0.96f : 0.82f)
                : new Color(0.02f, 0.03f, 0.05f, hover ? 0.94f : 0.72f));
            if (hover) RectFill(r, new Color(accent.r, accent.g, accent.b, 0.17f));
            Border(r, new Color(accent.r, accent.g, accent.b, hover ? 0.95f : 0.5f), 1.5f);
            RectFill(new Rect(r.x, r.y, 4f, r.height), accent);
            bool clicked = GUI.Button(r, GUIContent.none, GUIStyle.none);
            DrawText(r, label, _button, Color.white, true);
            return clicked;
        }

        private void DrawBar(Rect r, float value, Color color)
        {
            value = Mathf.Clamp01(value);
            RectFill(r, new Color(1f, 1f, 1f, 0.08f));
            RectFill(new Rect(r.x, r.y, r.width * value, r.height), color);
            for (float x = r.x + 14f; x < r.xMax; x += 14f)
            {
                RectFill(new Rect(x, r.y, 1f, r.height), new Color(0.02f, 0.027f, 0.046f, 0.8f));
            }
            Border(r, new Color(1f, 1f, 1f, 0.12f), 1f);
        }

        private void DrawScannerStrip(Rect r, int segments, bool animate)
        {
            float gap = 4f;
            float w = (r.width - gap * (segments - 1)) / segments;
            float hot = 0f;
            if (animate)
            {
                float raw = Mathf.Repeat(Time.unscaledTime / 1.15f, 1f);
                float tri = raw < 0.5f ? raw * 2f : (1f - raw) * 2f;
                hot = tri * (segments - 1);
            }
            for (int i = 0; i < segments; i++)
            {
                float d = Mathf.Abs(i - hot);
                float lit = animate ? Mathf.Clamp01(1f - d / 2.1f) : 0.45f;
                Color c = Color.Lerp(new Color(0.24f, 0.04f, 0.07f, 0.6f),
                    new Color(1f, 0.3f, 0.34f, 1f), lit);
                RectFill(new Rect(r.x + i * (w + gap), r.y, w, r.height), c);
                if (lit > 0.55f)
                {
                    RectFill(new Rect(r.x + i * (w + gap), r.y, w, 3f), new Color(1f, 0.8f, 0.8f, 0.55f));
                }
            }
        }

        private void DrawEdgeVignette()
        {
            RectFill(new Rect(0f, 0f, _vw, 70f), new Color(0f, 0f, 0f, 0.4f));
            RectFill(new Rect(0f, VirtualHeight - 110f, _vw, 110f), new Color(0f, 0f, 0f, 0.42f));
            RectFill(new Rect(0f, 0f, 46f, VirtualHeight), new Color(0f, 0f, 0f, 0.25f));
            RectFill(new Rect(_vw - 46f, 0f, 46f, VirtualHeight), new Color(0f, 0f, 0f, 0.25f));
        }

        private void DrawDamageFlash()
        {
            if (_game == null || _game.Flash <= 0.001f) return;
            float a = Mathf.Clamp01(_game.Flash) * 0.32f;
            RectFill(new Rect(0f, 0f, _vw, VirtualHeight), new Color(1f, 0.05f, 0.1f, a * 0.4f));
            float edge = 90f;
            RectFill(new Rect(0f, 0f, _vw, edge), new Color(1f, 0.03f, 0.07f, a));
            RectFill(new Rect(0f, VirtualHeight - edge, _vw, edge), new Color(1f, 0.03f, 0.07f, a));
            RectFill(new Rect(0f, 0f, edge, VirtualHeight), new Color(1f, 0.03f, 0.07f, a));
            RectFill(new Rect(_vw - edge, 0f, edge, VirtualHeight), new Color(1f, 0.03f, 0.07f, a));
        }
    }
}
