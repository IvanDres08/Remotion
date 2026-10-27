"""Calm ambient piano bed (no drums) for the mascota reel.

Usage: python3 -I scripts/synth-calm-music.py <out.wav> <seconds>
"""
import sys, wave, numpy as np

SR = 44100
out, dur = sys.argv[1], float(sys.argv[2])
tt = np.arange(int(SR * dur)) / SR
mix = np.zeros(len(tt))
rng = np.random.default_rng(3)

def piano(freq, start, length, vel):
    m = (tt >= start) & (tt < start + length)
    u = tt[m] - start
    tone = sum(a * np.sin(2 * np.pi * freq * k * u) * np.exp(-u * (1.6 + k * 0.9)) for k, a in [(1, 1), (2, 0.35), (3, 0.12), (4, 0.05)])
    mix[m] += vel * tone * np.minimum(1, u * 300)

# Dmaj7 - Bm7 - Gmaj7 - A(sus), 64 bpm, one chord per bar
beat = 60 / 64
bar = 4 * beat
chords = [
    [146.83, 220.0, 277.18, 369.99],
    [123.47, 185.0, 220.0, 293.66],
    [98.0, 196.0, 246.94, 369.99],
    [110.0, 220.0, 293.66, 329.63],
]
melody = [587.33, 554.37, 493.88, 440.0, 493.88, 440.0, 369.99, 440.0]
for ci in range(int(dur / bar) + 1):
    ch = chords[ci % 4]
    st = ci * bar
    piano(ch[0] / 2, st, bar + 1, 0.22)
    for k, f in enumerate(ch[1:]):
        piano(f, st + k * 0.05, bar + 1, 0.10)
    for k in range(2):
        piano(melody[(ci * 2 + k) % len(melody)], st + beat * (1.5 + 2 * k), 2.5, 0.08)
    # warm pad
    m = (tt >= st) & (tt < st + bar + 1)
    u = tt[m] - st
    env = np.minimum(1, u / 1.2) * np.exp(-np.maximum(0, u - bar) * 2)
    mix[m] += 0.025 * env * sum(np.sin(2 * np.pi * f * u) for f in ch)

# soft room: simple feedback delays
for d, g in [(0.083, 0.3), (0.137, 0.22), (0.211, 0.15)]:
    n = int(SR * d)
    mix[n:] += g * mix[:-n]
acc = 0.0
y = np.zeros_like(mix)
for i, v in enumerate(mix):
    acc += 0.25 * (v - acc)
    y[i] = acc
y *= np.minimum(1, tt / 1.5) * np.minimum(1, (dur - tt) / 2.5)
y = y / np.max(np.abs(y)) * 0.6
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((y * 32767).astype(np.int16).tobytes())
print("ok")
