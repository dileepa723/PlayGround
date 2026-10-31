using UnityEngine;

/// <summary>
/// A race gate. Attach to a GameObject with an isTrigger collider.
/// Gates are passed in ascending <see cref="Order"/>; the gate with
/// <see cref="IsFinish"/> set completes a lap.
/// </summary>
public class Checkpoint : MonoBehaviour
{
    public int Order;
    public bool IsFinish;

    void OnTriggerEnter(Collider other)
    {
        if (other.GetComponentInParent<VehicleController>() == null) return;
        if (RaceManager.Instance != null)
            RaceManager.Instance.OnCheckpoint(this);
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = IsFinish ? Color.yellow : Color.cyan;
        var col = GetComponent<Collider>();
        if (col != null)
            Gizmos.DrawWireCube(col.bounds.center, col.bounds.size);
    }
}
