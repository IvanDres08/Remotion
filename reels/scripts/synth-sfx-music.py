import sys, wave, numpy as np
SR = 44100
out = sys.argv[1]
rng = np.random.default_rng(7)

def save(name, x, peak=0.8):
    x = np.asarray(x, dtype=np.float64)
    m = np.max(np.abs(x)) or 1
    x = x / m * peak
    d = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(f"{out}/{name}", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(d.tobytes())

def t(dur): return np.arange(int(SR * dur)) / SR

def lp(x, a):  # one-pole lowpass, a in (0,1)
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += a * (v - acc); y[i] = acc
    return y

def bandsweep(noise, f0, f1):
    # crude time-varying bandpass: lowpass minus heavier lowpass with moving cutoff
    n = len(noise); y = np.zeros(n); a1 = b1 = 0.0
    for i in range(n):
        f = f0 + (f1 - f0) * i / n
        a = 1 - np.exp(-2 * np.pi * f / SR); b = 1 - np.exp(-2 * np.pi * f * 0.35 / SR)
        a1 += a * (noise[i] - a1); b1 += b * (noise[i] - b1)
        y[i] = a1 - b1
    return y

# Soft, "polished" versions of the usual viral SFX: band-limited, no
# distortion, gentle attacks.
# whoosh: airy swish
tt = t(0.6); n = rng.standard_normal(len(tt))
env = np.sin(np.pi * np.clip(tt / 0.6, 0, 1)) ** 3
save("whoosh.wav", lp(bandsweep(n, 250, 1600) * env, 0.35), 0.45)

# pop: rounded bubble pop
tt = t(0.14)
f = 520 * np.exp(-tt * 30) + 180
save("pop.wav", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 32) * np.minimum(1, tt * 600), 0.5)

# ding: soft chime (marimba-like)
tt = t(1.4)
bell = sum(a * np.sin(2 * np.pi * fr * tt) * np.exp(-tt * d) for fr, a, d in [(880, 1, 3.5), (1320, 0.35, 5), (1760, 0.12, 7)])
save("ding.wav", lp(bell * np.minimum(1, tt * 120), 0.5), 0.4)

# boom: soft deep "thud" (cinematic hit without the crunch)
tt = t(1.2)
f = 48 + 30 * np.exp(-tt * 10)
body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3.5) * np.minimum(1, tt * 150)
air = lp(rng.standard_normal(len(tt)), 0.05) * np.exp(-tt * 6) * 0.6
save("boom.wav", lp(body + air, 0.2), 0.6)

# riser: gentle shimmer swell
tt = t(1.0); n = rng.standard_normal(len(tt))
env = (tt / 1.0) ** 2 * np.minimum(1, (1.0 - tt) * 20)
tone = sum(np.sin(2 * np.pi * np.cumsum(fr * (1 + 0.5 * tt)) / SR) for fr in (440, 660)) * 0.25
save("riser.wav", lp(bandsweep(n, 300, 2500) * 0.6 + tone, 0.4) * env, 0.35)

# heartbeat: muffled
tt = t(0.9); x = np.zeros(len(tt))
for st, a in [(0.0, 1), (0.22, 0.7)]:
    m = tt >= st; u = tt[m] - st
    x[m] += a * np.sin(2 * np.pi * (50 + 25 * np.exp(-u * 30)) * u) * np.exp(-u * 16)
save("heartbeat.wav", lp(x, 0.15), 0.6)

# tick: soft clock tick
tt = t(0.05)
save("tick.wav", lp(np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 140), 0.4), 0.3)

# scribble: pencil on paper, softened
tt = t(0.9); n = rng.standard_normal(len(tt))
strokes = 0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 7 * tt + 2 * np.sin(2 * np.pi * 1.3 * tt)))
hp = lp(n - lp(n, 0.25), 0.5)
save("scribble.wav", hp * strokes * np.minimum(1, tt * 20) * np.minimum(1, (0.9 - tt) * 10), 0.25)

# music: soft pastel lo-fi loop (Fmaj7 - Em7 - Dm7 - Cmaj7), 75 bpm
bpm = 75; beat = 60 / bpm; bar = 4 * beat; dur = 44
tt = t(dur); mix = np.zeros(len(tt))
def note(freq): return freq
chords = [[174.61, 220.0, 261.63, 329.63], [164.81, 196.0, 246.94, 293.66],
          [146.83, 174.61, 220.0, 261.63], [130.81, 164.81, 196.0, 246.94]]
for ci in range(int(dur / bar) + 1):
    ch = chords[ci % 4]; st = ci * bar
    m = (tt >= st) & (tt < st + bar + 1.5); u = tt[m] - st
    env = np.minimum(1, u / 0.6) * np.exp(-np.maximum(0, u - bar) * 3)
    pad = sum(np.sin(2 * np.pi * fr * u) + 0.3 * np.sin(2 * np.pi * fr * 2.003 * u) for fr in ch)
    mix[m] += 0.10 * pad * env * (0.85 + 0.15 * np.sin(2 * np.pi * 0.5 * u))
    # keys: arpeggio eighth notes
    for k in range(8):
        s2 = st + k * beat / 2; fr = ch[[0, 2, 1, 3, 2, 3, 1, 2][k]] * 2
        mm = (tt >= s2) & (tt < s2 + 1.2); v = tt[mm] - s2
        mix[mm] += 0.07 * (np.sin(2 * np.pi * fr * v) + 0.2 * np.sin(2 * np.pi * fr * 3 * v)) * np.exp(-v * 4) * np.minimum(1, v * 200)
    # bass root
    mm = (tt >= st) & (tt < st + bar); v = tt[mm] - st
    mix[mm] += 0.18 * np.sin(2 * np.pi * ch[0] / 2 * v) * np.minimum(1, v * 20) * np.exp(-v * 0.4)
# drums
for b in range(int(dur / beat)):
    st = b * beat
    if b % 2 == 0:
        mm = (tt >= st) & (tt < st + 0.3); v = tt[mm] - st
        mix[mm] += 0.2 * np.sin(2 * np.pi * (50 + 80 * np.exp(-v * 35)) * v) * np.exp(-v * 14)
    else:
        mm = (tt >= st) & (tt < st + 0.2); v = tt[mm] - st
        nz = rng.standard_normal(mm.sum())
        mix[mm] += 0.05 * (nz - lp(nz, 0.3)) * np.exp(-v * 25)
    s2 = st + beat / 2
    mm = (tt >= s2) & (tt < s2 + 0.05); v = tt[mm] - s2
    nz = rng.standard_normal(mm.sum()); mix[mm] += 0.025 * (nz - lp(nz, 0.5)) * np.exp(-v * 80)
mix += 0.004 * (rng.random(len(tt)) < 0.0008) * rng.standard_normal(len(tt)) * 8  # vinyl crackle
mix = lp(mix, 0.3)
fade = np.minimum(1, tt / 1.0) * np.minimum(1, (dur - tt) / 2.0)
save("../musica.wav", mix * fade, 0.7)
print("ok")
