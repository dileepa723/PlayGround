using UnityEngine;

namespace KnightRider3D
{
    /// <summary>
    /// The only component placed in the scene. Everything else is created at
    /// runtime, which keeps the project portable and avoids prefab/meta churn.
    /// </summary>
    [DefaultExecutionOrder(-100)]
    public class GameBootstrap : MonoBehaviour
    {
        private void Awake()
        {
            Application.targetFrameRate = 60;
            QualitySettings.vSyncCount = 0;
            Screen.sleepTimeout = SleepTimeout.NeverSleep;

            if (FindObjectOfType<GameManager>() == null)
            {
                gameObject.AddComponent<GameManager>();
            }
        }
    }
}
