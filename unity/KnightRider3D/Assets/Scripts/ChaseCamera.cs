using UnityEngine;

namespace KnightRider3D
{
    public class ChaseCamera : MonoBehaviour
    {
        private Camera _camera;

        public void Init(Camera cam)
        {
            _camera = cam;
            _camera.fieldOfView = 52f;
            _camera.nearClipPlane = 0.1f;
            _camera.farClipPlane = 2200f;
            _camera.clearFlags = CameraClearFlags.SolidColor;
            _camera.backgroundColor = new Color(0.018f, 0.012f, 0.035f);
            _camera.allowHDR = true;
        }

        public void Tick(float dt, bool menu, float carX, float speed, float jumpY,
            bool boost, float time, float shake)
        {
            if (menu)
            {
                float a = 0.78f + Mathf.Sin(time * 0.1f) * 0.1f;
                Vector3 desired = new Vector3(
                    carX - 8.4f * Mathf.Cos(a),
                    2.3f + Mathf.Sin(time * 0.27f) * 0.1f,
                    -1.8f - 9.2f * Mathf.Sin(a));
                transform.position = Vector3.Lerp(transform.position, desired, 1f - Mathf.Exp(-4f * dt));
                transform.LookAt(new Vector3(carX + 1.9f, 0.74f, 0.35f));
                _camera.fieldOfView = Mathf.Lerp(_camera.fieldOfView, 40f, 1f - Mathf.Exp(-4f * dt));
                ApplyShake(shake);
                return;
            }

            float speedNorm = Mathf.Clamp01(speed / 134f);
            Vector3 target = new Vector3(
                carX * 0.8f,
                3.55f + jumpY * 0.55f + speedNorm * 0.55f,
                8.4f + speedNorm * 2.4f);
            transform.position = Vector3.Lerp(transform.position, target, 1f - Mathf.Exp(-5.2f * dt));
            transform.LookAt(new Vector3(carX * 0.62f, 1f + jumpY * 0.8f, -7f - speedNorm * 5f));
            float targetFov = 61f + speedNorm * 11f + (boost ? 5f : 0f);
            _camera.fieldOfView = Mathf.Lerp(_camera.fieldOfView, targetFov, 1f - Mathf.Exp(-3.6f * dt));
            ApplyShake(shake);
        }

        private void ApplyShake(float shake)
        {
            if (shake <= 0.001f) return;
            transform.position += new Vector3(
                (Random.value - 0.5f) * 0.42f * shake,
                (Random.value - 0.5f) * 0.30f * shake,
                0f);
            transform.Rotate(0f, 0f, (Random.value - 0.5f) * 1.2f * shake, Space.Self);
        }
    }
}
