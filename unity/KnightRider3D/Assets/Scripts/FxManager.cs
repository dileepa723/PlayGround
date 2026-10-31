using UnityEngine;

namespace KnightRider3D
{
    public class FxManager : MonoBehaviour
    {
        public void Beam(Vector3 from, Vector3 to, Color color)
        {
            GameObject go = new GameObject("LaserBeam");
            go.transform.SetParent(transform, false);
            LineRenderer line = go.AddComponent<LineRenderer>();
            line.useWorldSpace = true;
            line.positionCount = 2;
            line.SetPosition(0, from);
            line.SetPosition(1, to);
            line.startWidth = 0.10f;
            line.endWidth = 0.025f;
            line.numCapVertices = 4;
            Material mat = new Material(GameMaterials.SpriteBase);
            mat.mainTexture = TextureFactory.White;
            mat.color = color;
            line.material = mat;
            line.startColor = color;
            line.endColor = new Color(color.r, color.g, color.b, 0.6f);
            line.sortingOrder = 8;
            BeamFx fx = go.AddComponent<BeamFx>();
            fx.Init(line, 0.18f);
        }

        public void Explosion(Vector3 position, Color color)
        {
            Visuals.GlowSprite(transform, "Flash", position, color, 4.5f, 0.9f)
                .gameObject.AddComponent<FxParticle>().Init(Vector3.zero, 0f, 0.28f, 4.5f, 2.2f, color, 0.9f);

            for (int i = 0; i < 16; i++)
            {
                Vector3 dir = Random.onUnitSphere;
                dir.y = Mathf.Abs(dir.y) * 0.9f;
                float speed = Random.Range(4f, 13f);
                GameObject go = new GameObject("ExplosionSpark");
                go.transform.SetParent(transform, false);
                go.transform.position = position + Random.insideUnitSphere * 0.25f;
                SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
                sr.sprite = Visuals.Glow;
                sr.sortingOrder = 7;
                Color c = Color.Lerp(color, new Color(1f, 0.92f, 0.6f), Random.value * 0.5f);
                sr.color = c;
                float size = Random.Range(0.45f, 1.5f);
                go.transform.localScale = Visuals.GlowScale(size);
                FxParticle p = go.AddComponent<FxParticle>();
                p.Init(dir * speed, 16f, Random.Range(0.45f, 0.95f), size, 1.15f, c, 1f);
            }
        }

        public void Sparks(Vector3 position, Color color, int count = 10)
        {
            for (int i = 0; i < count; i++)
            {
                Vector3 dir = Random.onUnitSphere;
                dir.y = Mathf.Abs(dir.y);
                GameObject go = new GameObject("Spark");
                go.transform.SetParent(transform, false);
                go.transform.position = position;
                SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
                sr.sprite = Visuals.Glow;
                sr.sortingOrder = 7;
                sr.color = color;
                float size = Random.Range(0.10f, 0.28f);
                go.transform.localScale = Visuals.GlowScale(size);
                FxParticle p = go.AddComponent<FxParticle>();
                p.Init(dir * Random.Range(2f, 7f), 12f, Random.Range(0.18f, 0.4f), size, 0.6f, color, 1f);
            }
        }

        public void Shockwave(Vector3 position, Color color, float maxScale)
        {
            GameObject go = new GameObject("Shockwave");
            go.transform.SetParent(transform, false);
            go.transform.position = position;
            SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = Visuals.Ring;
            sr.sortingOrder = 6;
            sr.color = color;
            go.transform.localScale = Visuals.GlowScale(1f);
            FxParticle p = go.AddComponent<FxParticle>();
            p.Init(Vector3.zero, 0f, 0.5f, 1f, maxScale, color, 0.75f);
        }

        /// <summary>Short-lived exhaust flare used while the turbo is lit.</summary>
        public void Trail(Vector3 position, Color color)
        {
            GameObject go = new GameObject("TurboTrail");
            go.transform.SetParent(transform, false);
            go.transform.position = position;
            SpriteRenderer sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = Visuals.Glow;
            sr.sortingOrder = 5;
            sr.color = color;
            float size = Random.Range(0.34f, 0.58f);
            go.transform.localScale = Visuals.GlowScale(size);
            FxParticle p = go.AddComponent<FxParticle>();
            p.Init(new Vector3(Random.Range(-0.5f, 0.5f), Random.Range(0.1f, 0.7f), Random.Range(2.5f, 5.5f)),
                1.5f, Random.Range(0.24f, 0.42f), size, size * 0.35f, color, 0.75f);
        }
    }

    public class FxParticle : MonoBehaviour
    {
        private Vector3 _velocity;
        private float _gravity;
        private float _life;
        private float _age;
        private float _startScale;
        private float _endScale;
        private Color _color;
        private float _alpha;
        private SpriteRenderer _renderer;

        public void Init(Vector3 velocity, float gravity, float life, float startScale,
            float endScale, Color color, float alpha)
        {
            _velocity = velocity;
            _gravity = gravity;
            _life = Mathf.Max(0.02f, life);
            _startScale = startScale;
            _endScale = endScale;
            _color = color;
            _alpha = alpha;
            _renderer = GetComponent<SpriteRenderer>();
        }

        private void Update()
        {
            float dt = Time.deltaTime;
            _age += dt;
            if (_age >= _life)
            {
                Destroy(gameObject);
                return;
            }
            float k = _age / _life;
            _velocity.y -= _gravity * dt;
            transform.position += _velocity * dt;
            float scale = Mathf.Lerp(_startScale, _endScale, k);
            transform.localScale = Visuals.GlowScale(scale);
            if (_renderer != null)
            {
                Color c = _color;
                c.a = _alpha * (1f - k);
                _renderer.color = c;
            }
        }
    }

    public class BeamFx : MonoBehaviour
    {
        private LineRenderer _line;
        private float _life;
        private float _age;

        public void Init(LineRenderer line, float life)
        {
            _line = line;
            _life = life;
        }

        private void Update()
        {
            _age += Time.deltaTime;
            float k = Mathf.Clamp01(_age / _life);
            if (_line != null)
            {
                float width = Mathf.Lerp(0.10f, 0f, k);
                _line.startWidth = width;
                _line.endWidth = width * 0.25f;
                Color c = Color.Lerp(new Color(0.75f, 0.96f, 1f), new Color(0.4f, 0.9f, 1f), k);
                c.a = 1f - k;
                _line.startColor = c;
                c.a *= 0.4f;
                _line.endColor = c;
            }
            if (_age >= _life)
            {
                if (_line != null) Destroy(_line.material);
                Destroy(gameObject);
            }
        }
    }
}
