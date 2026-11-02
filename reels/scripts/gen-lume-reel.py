"""Generates src/LumeReel/LumeReel.tsx: clip order, trims, pause cuts, captions,
overlay timings, music ducking and SFX.

Usage: python3 -I scripts/gen-lume-reel.py <asr-json-dir> <out.tsx>
"""
import json, os, sys

asr, out = sys.argv[1], sys.argv[2]
T = 9      # crossfade between clips (frames)
TS = 4     # micro-dissolve where a pause inside a clip was cut
F = 30
# name, in, out, speech onset (None = no dialogue), label, world, pauses to shorten (start, end)
clips = [
    ("Lemon_droplet_falling_on_hand", 0.3, 3.4, None, "C1A Hook limón", "real", []),
    ("Animated_lemon_character_gesturing", 0.0, 8.0, 0.06, "C2A Limón villano", "micro", []),
    ("Microscopic_skin_animation_camer_", 1.2, 3.9, None, "C2B Dentro de la piel", "micro", []),
    ("Cell_reacting_to_sunlight_skin", 0.3, 7.1, 0.42, "C3A Célula y sol", "micro", [(2.7, 3.3)]),
    ("Alarm_cell_activating_in_skin", 5.0, 6.5, None, "C3A Sirena", "micro", []),
    ("Factory_red_alert_state", 0.45, 2.85, 0.58, "C3B Fábrica en alerta", "micro", []),
    ("Pigment_factory_operating_with_a_", 0.1, 6.62, 0.20, "C4A Fábrica produce", "micro", []),
    ("Woman_hand_pigmentation_macro_co_", 0.1, 5.86, 0.22, "C4B Manchas", "real", [(3.4, 4.28)]),
    ("Woman_driving_car", 0.15, 7.18, 0.28, "C5A Conduciendo", "real", []),
    ("Pigment_granules_moving_on_conveyor", 1.0, 7.38, 1.18, "C5B Fábrica activa", "micro", [(2.56, 3.22)]),
    ("Woman_drops_lemon_into_bin", 0.1, 7.1, 0.20, "C6A Limón a la caneca", "real", [(4.28, 5.52)]),
    ("Skincare_product_reveal_in_bathroom", 0.1, 7.68, 0.24, "C6B LÜME", "real", [(3.56, 4.24)]),
    ("Ingredient_spheres_interacting_w_", 0.1, 7.85, 0.20, "C7A Ingredientes", "micro", [(4.06, 4.8)]),
    ("Woman_applying_cream_to_hand", 0.1, 6.95, 0.20, "C7B Crema en la mano", "real", [(0.94, 1.62), (2.92, 4.62)]),
    ("Woman_touching_hand_smiling", 1.05, 7.70, 1.22, "C8A Formulada para", "real", [(4.04, 4.68)]),
    ("Woman_holding_skincare_product", 0.05, 7.78, 0.18, "Oferta", "real", []),
    ("Woman_showcasing_skincare_product", 0.5, 8.0, 0.64, "CTA", "real", [(4.02, 5.22)]),
    ("__END__", 0, 2.6, None, "Cierre", "real", []),
]
fix = {"lume,": "LÜME,", "envió": "envío", "Edad": "edad", "Sol,": "sol,", "tranhexámico": "tranexámico"}
KEEP = 0.15  # silence kept on each side of a shortened pause

# Build sequences: (clip index, seg in, seg out, frames, transition after)
seqs = []
for ci, (n, a, b, on, lab, world, cuts) in enumerate(clips):
    bounds = [a]
    for gs, ge in cuts:
        bounds += [gs + KEEP, ge - KEEP]
    bounds.append(b)
    segs = [(bounds[i], bounds[i + 1]) for i in range(0, len(bounds), 2)]
    for si, (sa, sb) in enumerate(segs):
        last_seg = si == len(segs) - 1
        trans = (T if ci < len(clips) - 1 else 0) if last_seg else TS
        seqs.append([ci, sa, sb, round((sb - sa) * F), trans, si])
t = 0
for s in seqs:
    s.append(t)
    t += s[3] - s[4]
total = t
clip_start = {}
clip_end = {}
for ci, sa, sb, d, tr, si, st in seqs:
    clip_start.setdefault(ci, st)
    clip_end[ci] = st + d

def comp_frame(ci, tt):
    for c, sa, sb, d, tr, si, st in seqs:
        if c == ci and sa - 1e-6 <= tt <= sb + 1e-6:
            return st + (tt - sa) * F
    return None

caps, events, speech = [], {}, []
for ci, (n, a, b, on, lab, world, cuts) in enumerate(clips):
    if on is None or n.startswith("__"):
        continue
    ch = json.load(open(os.path.join(asr, n + ".json")))["chunks"]
    words = []
    for j, c in enumerate(ch):
        s, e = c["timestamp"]
        txt = c["text"].strip()
        if j == 0:
            s = max(s, on)
        if txt.startswith(".") and words:  # "149" + ".900"
            words[-1][0] += txt
            words[-1][2] = e
            continue
        words.append([fix.get(txt, txt), s, e])
    for w, s, e in words:
        if w == "149.900":
            w = "$149.900"
        # Whisper stretches a word across a pause; pull it to the kept side.
        for gs, ge in cuts:
            if gs - 0.05 <= s < ge:
                s = ge - KEEP + 0.02
            if gs < e <= ge + 0.05:
                e = gs + KEEP
        cs = comp_frame(ci, s)
        ce = comp_frame(ci, min(e, b))
        if cs is None:
            continue
        if ce is None or ce <= cs:
            ce = cs + 3
        caps.append((w, round(cs / F * 1000), round(ce / F * 1000)))
        events.setdefault(n, []).append((w, round(cs)))
        speech.append((cs, ce))

# Merge speech into ranges for the music ducking.
speech.sort()
ranges = []
for s, e in speech:
    if ranges and s - ranges[-1][1] < 15:
        ranges[-1][1] = max(ranges[-1][1], e)
    else:
        ranges.append([s, e])
ranges = [[round(s), round(e)] for s, e in ranges]

def ev(n, word, nth=0):
    return [f for w, f in events[n] if w.lower().strip(",.").startswith(word)][nth]

idx = {c[0]: i for i, c in enumerate(clips)}
rows = []
for k, (ci, sa, sb, d, tr, si, st) in enumerate(seqs):
    n, lab = clips[ci][0], clips[ci][4]
    name = lab if si == 0 else f"{lab} ({si + 1})"
    if n == "__END__":
        body = "<EndCard />"
    elif n == "Cell_reacting_to_sunlight_skin":
        body = f'<Clip name="{n}" trimBefore={{{round(sa * F)}}} blurBox={{{{ x: 3, y: 36.5, w: 31, h: 5 }}}} />'
    else:
        body = f'<Clip name="{n}" trimBefore={{{round(sa * F)}}} />'
    rows.append(f'''        <TransitionSeries.Sequence name="{name}" durationInFrames={{{d}}} premountFor={{fps}}>
          {body}
        </TransitionSeries.Sequence>''')
    if tr:
        rows.append(f"        <TransitionSeries.Transition presentation={{fade()}} timing={{linearTiming({{ durationInFrames: {tr} }})}} />")

lume_f = ev("Skincare_product_reveal_in_bathroom", "lüme")
touch, hold, show = "Woman_touching_hand_smiling", "Woman_holding_skincare_product", "Woman_showcasing_skincare_product"
c0, c1, c2 = ev(touch, "sin", 0), ev(touch, "sin", 1), ev(touch, "sin", 2)
o0, o1, o2 = ev(hold, "60"), ev(hold, "envío"), ev(hold, "dos")
cta = ev(show, "dale")
claims_from, offer_from = c0 - 6, o0 - 4
end_touch, end_hold, end_show = clip_end[idx[touch]], clip_end[idx[hold]], clip_end[idx[show]]

# Sound design: soft whoosh where the story moves between the real world and
# inside the skin, plus a few accents.
sfx = [("ding", 10, 0.18), ("riser", clip_start[2] - 20, 0.2), ("whoosh", clip_start[2] - 6, 0.25),
       ("heartbeat", clip_start[4], 0.3), ("ding", lume_f, 0.2), ("riser", clip_start[idx["Ingredient_spheres_interacting_w_"]] - 18, 0.18),
       ("pop", o0, 0.22), ("pop", o1, 0.22), ("pop", o2, 0.22), ("ding", cta, 0.2),
       ("whoosh", clip_start[idx["__END__"]] - 6, 0.25), ("ding", clip_start[idx["__END__"]] + 18, 0.2)]
for ci in range(1, len(clips)):
    if clips[ci][5] != clips[ci - 1][5] and ci not in (2,):
        sfx.append(("whoosh", clip_start[ci] - 6, 0.2))
sfx.sort(key=lambda x: x[1])
sfx_rows = "\n".join(f'''      <Sequence name="SFX {n} {f}" from={{{f}}} durationInFrames={{45}}>
        <Audio src={{staticFile("psicologia/sfx/{n}.wav")}} volume={{{v}}} />
      </Sequence>''' for n, f, v in sfx)

lines = []
for k, (w, s, e) in enumerate(caps):
    tx = w if k == 0 else " " + w
    lines.append(f"          {{ text: {json.dumps(tx, ensure_ascii=False)}, startMs: {s}, endMs: {e}, timestampMs: {(s + e) // 2}, confidence: null }},")

src = f'''import {{ Audio }} from "@remotion/media";
import {{ linearTiming, TransitionSeries }} from "@remotion/transitions";
import {{ fade }} from "@remotion/transitions/fade";
import {{ AbsoluteFill, interpolate, Sequence, staticFile, useVideoConfig }} from "remotion";
import {{ Captions }} from "./Captions";
import {{ Clip }} from "./Clip";
import "./fonts";
import {{ BrandTitle, Claims, CTA, EndCard, Hook, Offer }} from "./Overlays";

// Generated by scripts/gen-lume-reel.py.
// LÜME ad: the clips in the brief's order, each trimmed to its line, long
// pauses inside a line shortened (micro-dissolve), {T}-frame crossfades
// between clips. Music fills every gap without dialogue and ducks under it.
const SPEECH = {json.dumps(ranges)} as const;

const musicVolume = (f: number, total: number) => {{
  let duck = 0;
  for (const [a, b] of SPEECH) {{
    duck = Math.max(
      duck,
      interpolate(f, [a - 10, a, b, b + 12], [0, 1, 1, 0], {{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }}),
    );
  }}
  const fadeInOut = interpolate(f, [0, 10, total - 24, total], [0, 1, 1, 0], {{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }});
  return (0.36 - duck * 0.27) * fadeInOut;
}};

export const LumeReel: React.FC = () => {{
  const {{ fps, durationInFrames }} = useVideoConfig();
  return (
    <AbsoluteFill style={{{{ backgroundColor: "#000" }}}}>
      <TransitionSeries name="Clips">
{chr(10).join(rows)}
      </TransitionSeries>

      <Sequence name="Hook" durationInFrames={{{clip_end[0] - 2}}} premountFor={{fps}}>
        <Hook />
      </Sequence>
      <Sequence name="Marca LÜME" from={{{lume_f - 4}}} durationInFrames={{75}} premountFor={{fps}}>
        <BrandTitle />
      </Sequence>
      <Sequence name="Sin arder / pelar / irritar" from={{{claims_from}}} durationInFrames={{{end_touch - claims_from}}} premountFor={{fps}}>
        <Claims at={{[{c0 - claims_from}, {c1 - claims_from}, {c2 - claims_from}]}} />
      </Sequence>
      <Sequence name="Oferta" from={{{offer_from}}} durationInFrames={{{end_hold - offer_from}}} premountFor={{fps}}>
        <Offer at={{[{o0 - offer_from}, {o1 - offer_from}, {o2 - offer_from}]}} />
      </Sequence>
      <Sequence name="CTA" from={{{cta - 6}}} durationInFrames={{{end_show - (cta - 6)}}} premountFor={{fps}}>
        <CTA />
      </Sequence>

      <Captions
        hide={{[[{offer_from}, {end_hold}]]}}
        captions={{[
{chr(10).join(lines)}
        ]}}
      />
      <Audio src={{staticFile("lume/musica.wav")}} volume={{(f) => musicVolume(f, durationInFrames)}} />
{sfx_rows}
    </AbsoluteFill>
  );
}};
'''
open(out, "w").write(src)
print("total", total, "frames =", round(total / F, 2), "s")
