using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

/// <summary>
/// Lap-race manager. Discovers all <see cref="Checkpoint"/> components, builds a
/// route, runs a countdown, tracks lap/finish/best times and coins.
/// </summary>
public class RaceManager : MonoBehaviour
{
    public enum RaceState { Countdown, Racing, Finished }

    public static RaceManager Instance { get; private set; }

    [Header("Rules")]
    [Tooltip("How many times the route must be completed.")]
    public int totalLaps = 3;
    public float countdownSeconds = 3.5f;

    public RaceState State { get; private set; } = RaceState.Countdown;
    public float RaceTime { get; private set; }
    public float FinalTime { get; private set; }
    public float BestTime { get; private set; }
    public int Lap { get; private set; } = 1;
    public int Coins { get; private set; }
    public string Message { get; private set; } = "";
    public IReadOnlyList<Checkpoint> Route { get { return route; } }

    const string BestKey = "vehicle-game-best-time";

    readonly List<Checkpoint> route = new List<Checkpoint>();
    int routePos;
    int lapsDone;

    void Awake()
    {
        Instance = this;
        float saved = PlayerPrefs.GetFloat(BestKey, -1f);
        if (saved > 0f) BestTime = saved;
    }

    void Start()
    {
        var all = FindObjectsOfType<Checkpoint>();
        if (all.Length == 0)
        {
            Debug.LogWarning("RaceManager: no Checkpoint components found in the scene.");
            State = RaceState.Racing;
            return;
        }

        var finish = all.FirstOrDefault(c => c.IsFinish);
        if (finish == null)
        {
            finish = all.OrderBy(c => c.Order).First();
            finish.IsFinish = true;
        }
        route.AddRange(all.Where(c => c != finish).OrderBy(c => c.Order));
        route.Add(finish);

        StartCoroutine(CountdownRoutine());
    }

    void Update()
    {
        if (State == RaceState.Racing)
            RaceTime += Time.deltaTime;
    }

    IEnumerator CountdownRoutine()
    {
        State = RaceState.Countdown;
        int seconds = Mathf.Max(1, Mathf.CeilToInt(countdownSeconds));
        for (int i = seconds; i >= 1; i--)
        {
            Message = i.ToString();
            yield return new WaitForSeconds(1f);
        }
        Message = "GO!";
        State = RaceState.Racing;
        yield return new WaitForSeconds(1f);
        if (State == RaceState.Racing)
            Message = "";
    }

    /// <summary>Called by <see cref="Checkpoint"/> triggers when the car passes a gate.</summary>
    public void OnCheckpoint(Checkpoint cp)
    {
        if (State != RaceState.Racing) return;
        if (route.Count == 0 || routePos >= route.Count) return;
        if (cp != route[routePos]) return;   // skipped / wrong gate: ignore

        routePos++;
        if (!cp.IsFinish) return;

        lapsDone++;
        routePos = 0;
        if (lapsDone >= totalLaps)
            FinishRace();
        else
        {
            Lap = lapsDone + 1;
            Message = string.Format("Lap {0}/{1}", Lap, totalLaps);
        }
    }

    void FinishRace()
    {
        State = RaceState.Finished;
        FinalTime = RaceTime;
        bool newBest = BestTime <= 0f || FinalTime < BestTime;
        if (newBest)
        {
            BestTime = FinalTime;
            PlayerPrefs.SetFloat(BestKey, FinalTime);
            PlayerPrefs.Save();
        }
        Message = newBest
            ? string.Format("FINISHED  {0}  (NEW BEST!)", TimeText(FinalTime))
            : string.Format("FINISHED  {0}   best {1}", TimeText(FinalTime), TimeText(BestTime));
    }

    public void AddCoin() { Coins++; }

    /// <summary>Reset the timer/lap state and rerun the countdown.</summary>
    public void RestartRace()
    {
        StopAllCoroutines();
        RaceTime = 0f;
        FinalTime = 0f;
        routePos = 0;
        lapsDone = 0;
        Lap = 1;
        Coins = 0;
        StartCoroutine(CountdownRoutine());
    }

    public static string TimeText(float t)
    {
        if (t <= 0f) return "--:--.--";
        var ts = TimeSpan.FromSeconds(t);
        return string.Format("{0:0}:{1:00}.{2:00}", ts.Minutes, ts.Seconds, ts.Milliseconds / 10);
    }
}
