using System.Collections.Generic;
using UnityEngine;

namespace KnightRider3D
{
    /// <summary>
    /// Original synth score and SFX generated from raw samples at runtime.
    /// No copyrighted Knight Rider material is used.
    /// </summary>
    public class SynthAudio : MonoBehaviour
    {
        private const int Rate = 44100;
        private AudioSource _engine;
        private AudioSource _music;
        private AudioSource _sfx;
        private readonly Dictionary<string, AudioClip> _clips = new Dictionary<string, AudioClip>();
        private string _mode = "menu";
        private bool _muted;

        public bool Muted => _muted;

        public void Init()
        {
            _engine = MakeSource("Engine", true);
            _music = MakeSource("Music", true);
            _sfx = MakeSource("Sfx", false);
            _sfx.ignoreListenerPause = true;

            _engine.clip = BuildEngine();
            _engine.volume = 0f;
            _engine.Play();

            _music.clip = BuildMusic();
            _music.volume = 0.12f;
            _music.Play();

            _clips["laser"] = BuildLaser();
            _clips["crash"] = BuildCrash();
            _clips["pickup"] = BuildPickup();
            _clips["boost"] = BuildBoost();
            _clips["jump"] = BuildJump();
            _clips["near"] = BuildNear();
            _clips["over"] = BuildGameOver();
            _clips["click"] = BuildClick();
        }

        private AudioSource MakeSource(string name, bool loop)
        {
            GameObject go = new GameObject(name);
            go.transform.SetParent(transform, false);
            AudioSource src = go.AddComponent<AudioSource>();
            src.playOnAwake = false;
            src.loop = loop;
            src.spatialBlend = 0f;
            return src;
        }

        public void SetMode(string mode)
        {
            _mode = mode;
            if (_music == null) return;
            float target = 0.12f;
            if (mode == "playing") target = 0.17f;
            else if (mode == "paused") target = 0.045f;
            else if (mode == "over") target = 0.08f;
            _music.volume = _muted ? 0f : target;
        }

        public void ToggleMute()
        {
            _muted = !_muted;
            _music.volume = _muted ? 0f : _mode == "playing" ? 0.17f : 0.12f;
            if (_muted) _engine.volume = 0f;
        }

        public void UpdateAudio(float dt, float speedNorm, bool boost, bool playing)
        {
            if (_engine == null) return;
            float engineTarget = playing ? (_muted ? 0f : 0.085f + speedNorm * 0.06f) : 0f;
            _engine.volume = Mathf.Lerp(_engine.volume, engineTarget, 1f - Mathf.Exp(-5f * dt));
            _engine.pitch = 0.58f + speedNorm * 0.95f + (boost ? 0.16f : 0f);
        }

        public void Laser() { Play("laser", 0.55f); }
        public void Crash() { Play("crash", 0.8f); }
        public void Pickup() { Play("pickup", 0.5f); }
        public void Boost() { Play("boost", 0.65f); }
        public void Jump() { Play("jump", 0.6f); }
        public void NearMiss() { Play("near", 0.4f); }
        public void GameOver() { Play("over", 0.7f); }
        public void Click() { Play("click", 0.4f); }

        private void Play(string key, float volume)
        {
            if (_muted || _sfx == null) return;
            AudioClip clip;
            if (_clips.TryGetValue(key, out clip)) _sfx.PlayOneShot(clip, volume);
        }

        private static AudioClip Clip(string name, float[] data)
        {
            AudioClip clip = AudioClip.Create(name, data.Length, 1, Rate, false);
            clip.SetData(data, 0);
            return clip;
        }

        private static void Normalize(float[] data, float peak)
        {
            float max = 0.0001f;
            for (int i = 0; i < data.Length; i++) max = Mathf.Max(max, Mathf.Abs(data[i]));
            float scale = peak / max;
            for (int i = 0; i < data.Length; i++) data[i] *= scale;
        }

        private static uint _noiseSeed = 0x9e3779b9u;
        private static float Noise()
        {
            _noiseSeed ^= _noiseSeed << 13;
            _noiseSeed ^= _noiseSeed >> 17;
            _noiseSeed ^= _noiseSeed << 5;
            return (_noiseSeed / (float)uint.MaxValue) * 2f - 1f;
        }

        private static AudioClip BuildEngine()
        {
            int n = Rate * 2;
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float rumble = Mathf.Sin(2f * Mathf.PI * 55f * t) * 0.34f;
                rumble += Mathf.Sin(2f * Mathf.PI * 110f * t) * 0.18f;
                rumble += Mathf.Sin(2f * Mathf.PI * 165f * t) * 0.09f;
                rumble += Mathf.Sin(2f * Mathf.PI * 27.5f * t) * 0.12f;
                float pulse = 0.72f + 0.28f * Mathf.Sin(2f * Mathf.PI * 2f * t);
                data[i] = rumble * pulse + Noise() * 0.025f;
            }
            Normalize(data, 0.7f);
            // Smooth the loop seam
            int fade = Rate / 50;
            for (int i = 0; i < fade; i++)
            {
                float k = (float)i / fade;
                data[i] *= k;
                data[n - 1 - i] *= k;
            }
            return Clip("EngineLoop", data);
        }

        private static readonly float[] BassNotes = { 55f, 43.65f, 65.41f, 49f };
        private static readonly float[] ArpNotes = { 440f, 523.25f, 659.25f, 783.99f, 659.25f, 523.25f, 493.88f, 392f };

        private static AudioClip BuildMusic()
        {
            int n = Rate * 8;
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                int beat = (int)(t / 0.5f);
                int bar = (beat / 4) % 4;
                float beatPhase = t % 0.5f;
                float barPhase = t % 2f;

                // Bass sequencer
                float bassFreq = BassNotes[bar];
                float bassEnv = Mathf.Exp(-beatPhase * 3.2f);
                float bass = Mathf.Sin(2f * Mathf.PI * bassFreq * t) * 0.22f * bassEnv;
                bass += Mathf.Sin(2f * Mathf.PI * bassFreq * 2f * t) * 0.06f * bassEnv;

                // Sixteenth arpeggio
                int step = (int)(t / 0.25f);
                float arpFreq = ArpNotes[step % ArpNotes.Length];
                float arpPhase = t % 0.25f;
                float arpEnv = Mathf.Exp(-arpPhase * 11f);
                float arp = Mathf.Sin(2f * Mathf.PI * arpFreq * t) * 0.055f * arpEnv;
                arp += Mathf.Sin(2f * Mathf.PI * arpFreq * 2.01f * t) * 0.018f * arpEnv;

                // Pad
                float pad = Mathf.Sin(2f * Mathf.PI * (bassFreq * 4f) * t) * 0.022f;
                pad += Mathf.Sin(2f * Mathf.PI * (bassFreq * 5f) * t) * 0.018f;
                pad += Mathf.Sin(2f * Mathf.PI * (bassFreq * 6f) * t) * 0.012f;
                pad *= 0.65f + 0.35f * Mathf.Sin(2f * Mathf.PI * 0.25f * t);

                // Kick
                float kickEnv = Mathf.Exp(-beatPhase * 15f);
                float kickFreq = 42f + 90f * Mathf.Exp(-beatPhase * 26f);
                float kick = Mathf.Sin(2f * Mathf.PI * kickFreq * beatPhase) * 0.38f * kickEnv;

                // Snare on beats 2 and 4
                int beatInBar = beat % 4;
                float snare = 0f;
                if (beatInBar == 1 || beatInBar == 3)
                {
                    snare = Noise() * 0.12f * Mathf.Exp(-beatPhase * 18f);
                    snare += Mathf.Sin(2f * Mathf.PI * 180f * t) * 0.05f * Mathf.Exp(-beatPhase * 22f);
                }

                // Hats on eighths
                float hatPhase = t % 0.25f;
                float hat = Noise() * 0.028f * Mathf.Exp(-hatPhase * 55f);

                // Slow filter-ish tremolo on the pad for movement
                float side = Mathf.Sin(2f * Mathf.PI * 0.125f * t) * 0.02f;

                data[i] = bass + arp + pad + kick + snare + hat + side;
            }
            Normalize(data, 0.82f);
            int seam = Rate / 40;
            for (int i = 0; i < seam; i++)
            {
                float k = (float)i / seam;
                data[i] *= k;
                data[n - 1 - i] *= k;
            }
            return Clip("NeonPursuitLoop", data);
        }

        private static AudioClip BuildLaser()
        {
            int n = (int)(Rate * 0.34f);
            float[] data = new float[n];
            float phase = 0f;
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float f = Mathf.Lerp(1900f, 240f, Mathf.Clamp01(t / 0.30f));
                phase += 2f * Mathf.PI * f / Rate;
                float env = Mathf.Exp(-t * 9f);
                float sq = Mathf.Sign(Mathf.Sin(phase)) * 0.22f;
                data[i] = (sq + Mathf.Sin(phase) * 0.18f) * env + Noise() * 0.05f * env;
            }
            Normalize(data, 0.75f);
            return Clip("Laser", data);
        }

        private static AudioClip BuildCrash()
        {
            int n = (int)(Rate * 0.6f);
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float env = Mathf.Exp(-t * 7f);
                float body = Mathf.Sin(2f * Mathf.PI * (70f - 30f * t) * t) * 0.5f;
                data[i] = (Noise() * 0.6f + body) * env;
            }
            Normalize(data, 0.9f);
            return Clip("Crash", data);
        }

        private static AudioClip BuildPickup()
        {
            int n = (int)(Rate * 0.55f);
            float[] data = new float[n];
            float[] notes = { 659.25f, 880f, 1318.5f };
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                int step = Mathf.Min(2, (int)(t / 0.15f));
                float local = t - step * 0.15f;
                float env = Mathf.Exp(-local * 9f);
                data[i] = Mathf.Sin(2f * Mathf.PI * notes[step] * t) * 0.35f * env;
                data[i] += Mathf.Sin(2f * Mathf.PI * notes[step] * 2f * t) * 0.08f * env;
            }
            Normalize(data, 0.7f);
            return Clip("Pickup", data);
        }

        private static AudioClip BuildBoost()
        {
            int n = (int)(Rate * 0.8f);
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float f = Mathf.Lerp(90f, 420f, t / 0.8f);
                float env = Mathf.Exp(-t * 3.4f);
                data[i] = (Mathf.Sin(2f * Mathf.PI * f * t) * 0.25f + Noise() * 0.3f) * env;
            }
            Normalize(data, 0.8f);
            return Clip("Boost", data);
        }

        private static AudioClip BuildJump()
        {
            int n = (int)(Rate * 0.45f);
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float f = Mathf.Lerp(180f, 760f, Mathf.Clamp01(t / 0.4f));
                float env = Mathf.Sin(Mathf.Clamp01(t / 0.45f) * Mathf.PI);
                data[i] = Mathf.Sin(2f * Mathf.PI * f * t) * 0.35f * env;
            }
            Normalize(data, 0.7f);
            return Clip("Jump", data);
        }

        private static AudioClip BuildNear()
        {
            int n = (int)(Rate * 0.18f);
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float env = Mathf.Exp(-t * 22f);
                data[i] = Mathf.Sin(2f * Mathf.PI * 1450f * t) * 0.3f * env;
            }
            Normalize(data, 0.65f);
            return Clip("NearMiss", data);
        }

        private static AudioClip BuildGameOver()
        {
            int n = (int)(Rate * 1.5f);
            float[] data = new float[n];
            float[] notes = { 220f, 185f, 146.83f, 110f };
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                int step = Mathf.Min(3, (int)(t / 0.34f));
                float local = t - step * 0.34f;
                float env = Mathf.Exp(-local * 3.2f);
                data[i] = Mathf.Sin(2f * Mathf.PI * notes[step] * t) * 0.28f * env;
                data[i] += Mathf.Sin(2f * Mathf.PI * notes[step] * 0.5f * t) * 0.2f * env;
            }
            Normalize(data, 0.75f);
            return Clip("GameOver", data);
        }

        private static AudioClip BuildClick()
        {
            int n = (int)(Rate * 0.07f);
            float[] data = new float[n];
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / Rate;
                float env = Mathf.Exp(-t * 70f);
                data[i] = Mathf.Sin(2f * Mathf.PI * 900f * t) * 0.35f * env;
            }
            Normalize(data, 0.6f);
            return Clip("Click", data);
        }
    }
}
