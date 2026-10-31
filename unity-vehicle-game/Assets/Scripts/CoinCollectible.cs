using UnityEngine;

/// <summary>
/// Spinning collectible. Attach to a small mesh with an isTrigger collider.
/// Picked up automatically by the vehicle; counted by the <see cref="RaceManager"/>.
/// </summary>
public class CoinCollectible : MonoBehaviour
{
    public float spinSpeed = 180f;

    void Update()
    {
        transform.Rotate(0f, spinSpeed * Time.deltaTime, 0f, Space.Self);
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.GetComponentInParent<VehicleController>() == null) return;
        if (RaceManager.Instance != null)
            RaceManager.Instance.AddCoin();
        gameObject.SetActive(false);
    }
}
