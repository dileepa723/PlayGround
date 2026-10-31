using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Race HUD: speed, boost bar, timer, best time, lap and coin counters,
/// and center messages (countdown / lap / result).
/// All fields are optional; whatever is assigned gets updated.
/// </summary>
public class GameHUD : MonoBehaviour
{
    public Text speedText;
    public Text timeText;
    public Text bestText;
    public Text lapText;
    public Text coinText;
    public Text messageText;
    public Image boostFill;

    VehicleController vehicle;
    RaceManager race;
    static readonly Color BoostFull = new Color(0.4f, 0.9f, 1f);
    static readonly Color BoostLow = new Color(1f, 0.55f, 0.2f);

    void Start()
    {
        vehicle = FindObjectOfType<VehicleController>();
        race = FindObjectOfType<RaceManager>();
    }

    void LateUpdate()
    {
        if (vehicle == null) vehicle = FindObjectOfType<VehicleController>();
        if (race == null) race = FindObjectOfType<RaceManager>();

        if (vehicle != null)
        {
            if (speedText) speedText.text = Mathf.RoundToInt(vehicle.SpeedKmh) + " km/h";
            if (boostFill)
            {
                float f = Mathf.Clamp01(vehicle.Boost01);
                boostFill.rectTransform.localScale = new Vector3(f, 1f, 1f);
                boostFill.color = f < 0.25f ? BoostLow : BoostFull;
            }
        }
        else if (speedText) speedText.text = "0 km/h";

        if (race == null) return;

        if (timeText) timeText.text = RaceManager.TimeText(race.RaceTime);
        if (bestText) bestText.text = "BEST " + RaceManager.TimeText(race.BestTime);
        if (lapText) lapText.text = "LAP " + race.Lap + "/" + race.TotalLaps;
        if (coinText) coinText.text = "COINS " + race.Coins;
        if (messageText) messageText.text = race.Message;
    }
}
