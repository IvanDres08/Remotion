import json, sys, os
asr = sys.argv[1]; out = sys.argv[2]
T = 9  # crossfade frames
# (name, in s, out s, speech onset s or None, label)
clips = [
 ("Lemon_droplet_falling_on_hand",0.3,3.6,None,"C1A Hook limón"),
 ("Animated_lemon_character_gesturing",0.0,8.0,0.06,"C2A Limón villano"),
 ("Microscopic_skin_animation_camer_",1.0,4.2,None,"C2B Dentro de la piel"),
 ("Cell_reacting_to_sunlight_skin",0.3,7.1,0.42,"C3A Célula y sol"),
 ("Alarm_cell_activating_in_skin",4.9,6.6,None,"C3A Sirena"),
 ("Factory_red_alert_state",0.45,2.85,0.58,"C3B Fábrica en alerta"),
 ("Pigment_factory_operating_with_a_",0.1,6.62,0.20,"C4A Fábrica produce"),
 ("Woman_hand_pigmentation_macro_co_",0.1,5.86,0.22,"C4B Manchas"),
 ("Woman_driving_car",0.15,7.18,0.28,"C5A Conduciendo"),
 ("Pigment_granules_moving_on_conveyor",1.0,7.38,1.18,"C5B Fábrica activa"),
 ("Woman_drops_lemon_into_bin",0.1,7.1,0.20,"C6A Limón a la caneca"),
 ("Skincare_product_reveal_in_bathroom",0.1,7.68,0.24,"C6B LÜME"),
 ("__INGREDIENTS__",0,3.2,None,"C7A Ingredientes (provisional)"),
 ("Woman_touching_hand_smiling",1.05,7.70,1.22,"C8A Formulada para"),
 ("Woman_holding_skincare_product",0.05,7.78,0.18,"Oferta"),
 ("Woman_showcasing_skincare_product",0.5,8.0,0.64,"CTA"),
 ("__END__",0,2.6,None,"Cierre"),
]
fix = {"lume,":"LÜME,","envió":"envío","Edad":"edad","Sol,":"sol,"}
starts=[]; t=0; durs=[]
for i,(n,a,b,on,lab) in enumerate(clips):
    d=round((b-a)*30); durs.append(d); starts.append(t); t+=d-(T if i<len(clips)-1 else 0)
total=t
caps=[]; events={}
for i,(n,a,b,on,lab) in enumerate(clips):
    if on is None or n.startswith("__"): continue
    ch=json.load(open(os.path.join(asr,n+".json")))["chunks"]
    words=[]
    for j,c in enumerate(ch):
        s,e=c["timestamp"]; txt=c["text"].strip()
        if j==0: s=max(s,on)
        if txt.startswith(".") and words:  # "149" + ".900"
            words[-1][0]+=txt; words[-1][2]=e; continue
        words.append([fix.get(txt,txt),s,e])
    for w,s,e in words:
        if w=="149.900": w="$149.900"
        if s<a or s>b: continue
        cs=round((starts[i]+(s-a)*30)/30*1000); ce=round((starts[i]+(min(e,b)-a)*30)/30*1000)
        ce=max(ce,cs+80)
        caps.append((w,cs,ce))
        events.setdefault(n,[]).append((w,round(starts[i]+(s-a)*30)))
lines=[]
for k,(w,s,e) in enumerate(caps):
    tx=w if k==0 else " "+w
    lines.append(f'          {{ text: {json.dumps(tx, ensure_ascii=False)}, startMs: {s}, endMs: {e}, timestampMs: {(s+e)//2}, confidence: null }},')
def ev(n,word,nth=0):
    m=[f for w,f in events[n] if w.lower().strip(",.").startswith(word)]
    return m[nth]
idx={c[0]:i for i,c in enumerate(clips)}
rows=[]
for i,(n,a,b,on,lab) in enumerate(clips):
    if n=="__INGREDIENTS__":
        body='<Ingredients trimBefore={190} />'
    elif n=="__END__":
        body='<EndCard />'
    elif n=="Cell_reacting_to_sunlight_skin":
        body=f'<Clip name="{n}" trimBefore={{{round(a*30)}}} blurBox={{{{ x: 3, y: 36.5, w: 31, h: 5 }}}} />'
    else:
        body=f'<Clip name="{n}" trimBefore={{{round(a*30)}}} />'
    rows.append(f'''        <TransitionSeries.Sequence name="{lab}" durationInFrames={{{durs[i]}}} premountFor={{fps}}>
          {body}
        </TransitionSeries.Sequence>''')
    if i<len(clips)-1:
        rows.append(f'        <TransitionSeries.Transition presentation={{fade()}} timing={{linearTiming({{ durationInFrames: {T} }})}} />')
# overlay timings
reveal=idx["Skincare_product_reveal_in_bathroom"]; lume_f=ev("Skincare_product_reveal_in_bathroom","lüme")
touch="Woman_touching_hand_smiling"; c0=ev(touch,"sin",0); c1=ev(touch,"sin",1); c2=ev(touch,"sin",2)
hold="Woman_holding_skincare_product"; o0=ev(hold,"60"); o1=ev(hold,"envío"); o2=ev(hold,"dos")
show="Woman_showcasing_skincare_product"; cta=ev(show,"dale")
claims_from=c0-6; offer_from=o0-4
ov=f'''      <Sequence name="Hook" from={{0}} durationInFrames={{{durs[0]-2}}} premountFor={{fps}}>
        <Hook />
      </Sequence>
      <Sequence name="Marca LÜME" from={{{lume_f-4}}} durationInFrames={{{75}}} premountFor={{fps}}>
        <BrandTitle />
      </Sequence>
      <Sequence name="Sin arder / pelar / irritar" from={{{claims_from}}} durationInFrames={{{starts[idx[touch]]+durs[idx[touch]]-claims_from}}} premountFor={{fps}}>
        <Claims at={{[{c0-claims_from}, {c1-claims_from}, {c2-claims_from}]}} />
      </Sequence>
      <Sequence name="Oferta" from={{{offer_from}}} durationInFrames={{{starts[idx[hold]]+durs[idx[hold]]-offer_from}}} premountFor={{fps}}>
        <Offer at={{[{o0-offer_from}, {o1-offer_from}, {o2-offer_from}]}} />
      </Sequence>
      <Sequence name="CTA" from={{{cta-6}}} durationInFrames={{{starts[idx[show]]+durs[idx[show]]-(cta-6)}}} premountFor={{fps}}>
        <CTA />
      </Sequence>'''
src=f'''import {{ Audio }} from "@remotion/media";
import {{ linearTiming, TransitionSeries }} from "@remotion/transitions";
import {{ fade }} from "@remotion/transitions/fade";
import {{ AbsoluteFill, interpolate, Sequence, staticFile, useVideoConfig }} from "remotion";
import {{ Captions }} from "./Captions";
import {{ Clip }} from "./Clip";
import "./fonts";
import {{ Ingredients }} from "./Ingredients";
import {{ BrandTitle, Claims, CTA, EndCard, Hook, Offer }} from "./Overlays";

// LÜME ad: the 15 clips in the brief's order (C1A ... CTA), each trimmed to
// its line with a short head/tail, joined with {T}-frame crossfades. C7A was
// not received, so a placeholder ingredients scene stands in for it.
export const LumeReel: React.FC = () => {{
  const {{ fps, durationInFrames }} = useVideoConfig();
  // Music sits under the voice and lifts where nobody speaks.
  const music = (f: number) =>
    interpolate(
      f,
      [0, 12, {durs[0]-10}, {durs[0]+6}, {starts[2]}, {starts[2]+10}, {starts[2]+durs[2]-12}, {starts[2]+durs[2]}, {starts[idx["__INGREDIENTS__"]]}, {starts[idx["__INGREDIENTS__"]]+10}, {starts[idx["__INGREDIENTS__"]]+durs[idx["__INGREDIENTS__"]]-8}, {starts[idx["__INGREDIENTS__"]]+durs[idx["__INGREDIENTS__"]]}, {starts[-1]}, {starts[-1]+10}, durationInFrames - 20, durationInFrames],
      [0, 0.3, 0.3, 0.1, 0.1, 0.28, 0.28, 0.1, 0.1, 0.3, 0.3, 0.1, 0.1, 0.32, 0.32, 0],
      {{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }},
    );
  return (
    <AbsoluteFill style={{{{ backgroundColor: "#000" }}}}>
      <TransitionSeries name="Clips">
{chr(10).join(rows)}
      </TransitionSeries>

{ov}

      <Captions
        hide={{[[{starts[idx["__INGREDIENTS__"]]+4}, {starts[idx["__INGREDIENTS__"]]+durs[idx["__INGREDIENTS__"]]}], [{offer_from}, {starts[idx[hold]]+durs[idx[hold]]}]]}}
        captions={{[
{chr(10).join(lines)}
        ]}}
      />
      <Audio src={{staticFile("lume/musica.wav")}} volume={{music}} />
    </AbsoluteFill>
  );
}};
'''
open(out,"w").write(src)
print("total", total, "frames", round(total/30,2), "s; starts", starts)
