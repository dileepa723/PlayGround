using System.Collections.Generic;
using UnityEngine;

namespace KnightRider3D
{
    public struct LoftSection
    {
        public float z;
        public float w;
        public float bottom;
        public float top;

        public LoftSection(float z, float w, float bottom, float top)
        {
            this.z = z;
            this.w = w;
            this.bottom = bottom;
            this.top = top;
        }
    }

    /// <summary>
    /// Small procedural mesh library. Everything in the game is built from these
    /// helpers so the project has no external model dependencies.
    /// </summary>
    public static class MeshUtils
    {
        private static Mesh _cube;

        private static Mesh CubeTemplate()
        {
            if (_cube != null) return _cube;
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Collider col = go.GetComponent<Collider>();
            if (col != null) Object.Destroy(col);
            _cube = Object.Instantiate(go.GetComponent<MeshFilter>().sharedMesh);
            _cube.name = "UnitCubeTemplate";
            Object.Destroy(go);
            return _cube;
        }

        public static Mesh Wedge(float w, float h, float l, float frontDrop = 0.2f,
            float topFrontScale = 0.9f, float bottomFrontScale = 0.88f)
        {
            Mesh mesh = Object.Instantiate(CubeTemplate());
            mesh.name = "Wedge";
            Vector3[] verts = mesh.vertices;
            for (int i = 0; i < verts.Length; i++)
            {
                Vector3 v = verts[i];
                float x = v.x * w;
                float y = v.y * h;
                float z = v.z * l;
                float t = Mathf.Clamp01((z + l * 0.5f) / l); // 0 at nose, 1 at tail
                if (y > 0f)
                {
                    y -= frontDrop * Mathf.Pow(1f - t, 1.35f);
                    x *= topFrontScale + (1f - topFrontScale) * t;
                }
                else
                {
                    x *= bottomFrontScale + (1f - bottomFrontScale) * t;
                }
                verts[i] = new Vector3(x, y, z);
            }
            mesh.vertices = verts;
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh Cabin(float w, float h, float l)
        {
            Mesh mesh = Object.Instantiate(CubeTemplate());
            mesh.name = "Cabin";
            Vector3[] verts = mesh.vertices;
            for (int i = 0; i < verts.Length; i++)
            {
                Vector3 v = verts[i];
                float x = v.x * w;
                float y = v.y * h;
                float z = v.z * l;
                if (v.y > 0f)
                {
                    x *= 0.8f;
                    z += l * 0.18f;
                }
                else
                {
                    z -= l * 0.03f;
                }
                verts[i] = new Vector3(x, y, z);
            }
            mesh.vertices = verts;
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh Loft(LoftSection[] sections, bool six = true)
        {
            int P = six ? 6 : 4;
            int n = sections.Length;
            List<Vector3> verts = new List<Vector3>(n * P);

            for (int i = 0; i < n; i++)
            {
                LoftSection s = sections[i];
                if (six)
                {
                    float midY = s.bottom + (s.top - s.bottom) * 0.52f;
                    verts.Add(new Vector3(-s.w / 2f, s.bottom, s.z));
                    verts.Add(new Vector3(-s.w * 0.492f, midY, s.z));
                    verts.Add(new Vector3(-s.w * 0.425f, s.top, s.z));
                    verts.Add(new Vector3(s.w * 0.425f, s.top, s.z));
                    verts.Add(new Vector3(s.w * 0.492f, midY, s.z));
                    verts.Add(new Vector3(s.w / 2f, s.bottom, s.z));
                }
                else
                {
                    verts.Add(new Vector3(-s.w / 2f, s.bottom, s.z));
                    verts.Add(new Vector3(-s.w * 0.44f, s.top, s.z));
                    verts.Add(new Vector3(s.w * 0.44f, s.top, s.z));
                    verts.Add(new Vector3(s.w / 2f, s.bottom, s.z));
                }
            }

            List<int> tris = new List<int>((n - 1) * P * 6 + P * 6);
            for (int i = 0; i < n - 1; i++)
            {
                for (int a = 0; a < P; a++)
                {
                    int b = (a + 1) % P;
                    int a0 = i * P + a;
                    int a1 = i * P + b;
                    int b0 = (i + 1) * P + a;
                    int b1 = (i + 1) * P + b;
                    tris.Add(a0); tris.Add(b0); tris.Add(b1);
                    tris.Add(a0); tris.Add(b1); tris.Add(a1);
                }
            }

            int last = (n - 1) * P;
            for (int a = 1; a < P - 1; a++)
            {
                // Profile is wound clockwise, so reverse the front cap and keep
                // the rear cap wound the other way to face outward.
                tris.Add(0); tris.Add(a + 1); tris.Add(a);
                tris.Add(last); tris.Add(last + a); tris.Add(last + a + 1);
            }

            Mesh mesh = new Mesh();
            mesh.name = "Loft";
            mesh.SetVertices(verts);
            mesh.SetTriangles(tris, 0);
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh Quad(float w, float h)
        {
            Mesh mesh = new Mesh();
            mesh.name = "Quad";
            float x = w * 0.5f;
            float y = h * 0.5f;
            mesh.vertices = new[]
            {
                new Vector3(-x, -y, 0f),
                new Vector3(x, -y, 0f),
                new Vector3(x, y, 0f),
                new Vector3(-x, y, 0f)
            };
            // Double sided so the same quad works from either direction.
            mesh.triangles = new[]
            {
                0, 1, 2, 0, 2, 3,
                0, 2, 1, 0, 3, 2
            };
            mesh.uv = new[]
            {
                new Vector2(0f, 0f),
                new Vector2(1f, 0f),
                new Vector2(1f, 1f),
                new Vector2(0f, 1f)
            };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh MountainRange(float width, float height, int segments, int seed)
        {
            Random.State oldState = Random.state;
            Random.InitState(seed);
            List<Vector3> verts = new List<Vector3>();
            List<int> tris = new List<int>();
            float[] peaks = new float[segments + 1];
            for (int i = 0; i <= segments; i++)
            {
                float t = (float)i / segments;
                float ridge = 0.25f + Random.value * 0.75f;
                peaks[i] = height * ridge * (0.5f + 0.5f * Mathf.Sin(t * Mathf.PI));
            }
            for (int i = 0; i <= segments; i++)
            {
                float x = -width * 0.5f + (float)i / segments * width;
                verts.Add(new Vector3(x, -6f, 0f));
                verts.Add(new Vector3(x, peaks[i], 0f));
            }
            for (int i = 0; i < segments; i++)
            {
                int b0 = i * 2;
                int t0 = i * 2 + 1;
                int b1 = (i + 1) * 2;
                int t1 = (i + 1) * 2 + 1;
                tris.Add(b0); tris.Add(t0); tris.Add(t1);
                tris.Add(b0); tris.Add(t1); tris.Add(b1);
                tris.Add(b0); tris.Add(t1); tris.Add(t0);
                tris.Add(b0); tris.Add(b1); tris.Add(t1);
            }
            Mesh mesh = new Mesh();
            mesh.name = "MountainRange";
            mesh.SetVertices(verts);
            mesh.SetTriangles(tris, 0);
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            Random.state = oldState;
            return mesh;
        }

        public static Mesh Octahedron(float radius)
        {
            Mesh mesh = new Mesh();
            mesh.name = "Octahedron";
            mesh.vertices = new[]
            {
                new Vector3(0f, radius, 0f),
                new Vector3(-radius, 0f, 0f),
                new Vector3(0f, 0f, radius),
                new Vector3(radius, 0f, 0f),
                new Vector3(0f, 0f, -radius),
                new Vector3(0f, -radius, 0f)
            };
            mesh.triangles = new[]
            {
                0, 2, 3, 0, 3, 4, 0, 4, 1, 0, 1, 2,
                5, 3, 2, 5, 4, 3, 5, 1, 4, 5, 2, 1
            };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh Ring(float inner, float outer, int segments)
        {
            List<Vector3> verts = new List<Vector3>();
            List<int> tris = new List<int>();
            for (int i = 0; i <= segments; i++)
            {
                float a = (float)i / segments * Mathf.PI * 2f;
                float c = Mathf.Cos(a);
                float s = Mathf.Sin(a);
                verts.Add(new Vector3(c * inner, s * inner, 0f));
                verts.Add(new Vector3(c * outer, s * outer, 0f));
            }
            for (int i = 0; i < segments; i++)
            {
                int a0 = i * 2;
                int b0 = i * 2 + 1;
                int a1 = (i + 1) * 2;
                int b1 = (i + 1) * 2 + 1;
                tris.Add(a0); tris.Add(b0); tris.Add(b1);
                tris.Add(a0); tris.Add(b1); tris.Add(a1);
                tris.Add(a0); tris.Add(b1); tris.Add(b0);
                tris.Add(a0); tris.Add(a1); tris.Add(b1);
            }
            Mesh mesh = new Mesh();
            mesh.name = "Ring";
            mesh.SetVertices(verts);
            mesh.SetTriangles(tris, 0);
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static Mesh Ramp(float w, float l, float h)
        {
            Mesh mesh = new Mesh();
            mesh.name = "Ramp";
            float hw = w * 0.5f;
            float hl = l * 0.5f;
            mesh.vertices = new[]
            {
                new Vector3(-hw, 0f, hl), new Vector3(hw, 0f, hl),
                new Vector3(hw, h, -hl), new Vector3(-hw, h, -hl),
                new Vector3(-hw, 0f, -hl), new Vector3(hw, 0f, -hl)
            };
            mesh.triangles = new[]
            {
                0, 1, 2, 0, 2, 3,      // slope
                4, 2, 1, 4, 3, 2,      // back
                0, 3, 4,               // left
                1, 2, 5,               // right
                0, 4, 5, 0, 5, 1       // bottom
            };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }

        public static GameObject MakeMeshObject(string name, Mesh mesh, Material material, Transform parent)
        {
            GameObject go = new GameObject(name);
            if (parent != null) go.transform.SetParent(parent, false);
            MeshFilter filter = go.AddComponent<MeshFilter>();
            filter.sharedMesh = mesh;
            MeshRenderer renderer = go.AddComponent<MeshRenderer>();
            renderer.sharedMaterial = material;
            renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            renderer.receiveShadows = false;
            return go;
        }

        public static GameObject Box(Transform parent, string name, Vector3 pos, Vector3 size,
            Material material, Quaternion? rotation = null)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            Collider col = go.GetComponent<Collider>();
            if (col != null) Object.Destroy(col);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localScale = size;
            if (rotation.HasValue) go.transform.localRotation = rotation.Value;
            MeshRenderer r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        public static GameObject Cylinder(Transform parent, string name, Vector3 pos, Vector3 scale,
            Material material, Quaternion? rotation = null)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            go.name = name;
            Collider col = go.GetComponent<Collider>();
            if (col != null) Object.Destroy(col);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localScale = scale;
            if (rotation.HasValue) go.transform.localRotation = rotation.Value;
            MeshRenderer r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        public static GameObject Sphere(Transform parent, string name, Vector3 pos, Vector3 scale,
            Material material)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            go.name = name;
            Collider col = go.GetComponent<Collider>();
            if (col != null) Object.Destroy(col);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            go.transform.localScale = scale;
            MeshRenderer r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = material;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        public static Material UnlitSprite(Texture2D texture, Color color)
        {
            Material mat = new Material(GameMaterials.SpriteBase);
            mat.mainTexture = texture;
            mat.color = color;
            return mat;
        }
    }
}
