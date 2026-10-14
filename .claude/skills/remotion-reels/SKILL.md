---
name: remotion-reels
description: Editar videos cortos verticales (Reels, TikTok, YouTube Shorts) con Remotion — formato 9:16, hook en los primeros segundos, cortes de silencios, subtítulos palabra por palabra, zooms, música y export listo para subir. Úsala cuando el usuario pida editar, cortar, subtitular o crear un reel / short / TikTok / video vertical.
---

# Remotion Reels — edición de videos cortos verticales

Esta skill añade reglas específicas de short-form encima de las skills oficiales de Remotion
(instaladas junto a esta en `.claude/skills/`). Para cualquier API o detalle técnico, carga la skill oficial
correspondiente en lugar de inventar:

| Tarea | Skill oficial |
| --- | --- |
| Crear el proyecto / composición | `remotion-create` |
| Timeline de clips, `<Video>`, `<TransitionSeries>`, trims | `remotion-markup` → `video-editing.md`, `transitions.md` |
| Detectar silencios | `remotion-markup` → `silence-detection.md`, `ffmpeg.md` |
| Música, SFX, volumen | `remotion-markup` → `audio.md`, `sfx.md` |
| Transcribir y mostrar subtítulos | `remotion-captions` |
| Duración / dimensiones del material | `remotion-multimedia` |
| Preview | `remotion-studio` |
| Exportar MP4 | `remotion-render` |

Si dudas, carga `remotion-best-practices` (el router de todas).

## 1. Formato

- Composición vertical **1080×1920**, **30 fps** (usa 60 solo si el material fuente es 60 fps y hay mucho movimiento).
- Duración objetivo: **15–60 s** (máx. 90 s). Calcula `durationInFrames` con `calculateMetadata` a partir del material real, no lo adivines.
- Si el material es horizontal (16:9), recórtalo a 9:16 con `objectFit="cover"` y ajusta `objectPosition` para mantener la cara/el producto centrado; o usa fondo desenfocado (el mismo video escalado con `filter: blur(40px)`) + video original centrado.
- Pon los archivos del usuario en `public/` y referéncialos con `staticFile()`.

## 2. Zonas seguras (UI de Instagram/TikTok)

En 1080×1920 la interfaz de la app tapa partes del video. Nada importante (texto, subtítulos, producto, caras) debe ir en:

- **Arriba:** 0–220 px (nombre de usuario, "Reels").
- **Abajo:** últimos ~420 px (caption, música, botones).
- **Derecha:** últimos ~140 px (like, comentar, compartir).
- **Izquierda:** primeros ~60 px.

Subtítulos: centrados horizontalmente, con su borde inferior alrededor de `bottom: 480`–`620`, o en el tercio central si el plano lo permite.

## 3. Estructura de un reel

1. **Hook (0–2 s / frames 0–60):** la frase o imagen más fuerte va primero. Texto grande en pantalla (≥ 84 px, ver `remotion-create/video-layout.md`), movimiento desde el frame 0 — nada de intros, logos ni fundidos desde negro.
2. **Cuerpo:** un plano/idea cada 1,5–3 s. Cambia algo visual (corte, zoom, B-roll, texto) al menos cada ~2 s.
3. **CTA final (2–3 s):** "Sígueme", "Link en bio", "Comenta X". Texto claro dentro de la zona segura.
4. Si el usuario quiere loop, haz que el último frame enlace visualmente con el primero.

## 4. Flujo de edición

1. **Inspeccionar el material:** duración, resolución, fps (`remotion-multimedia`). Abre Remotion Studio pronto para que el usuario vea el progreso (`remotion-best-practices` → "Open the preview").
2. **Cortar silencios / jump cuts:** detecta silencios con `silence-detection.md` y quita pausas > ~0,3 s. Deja ~0,08 s de margen antes y después de cada frase para que no suene cortado. Cada segmento hablado es su propio clip con `trimBefore` / `durationInFrames` (ver `video-editing.md`: un nodo JSX por clip, usar `fps` de `useVideoConfig()`, `premountFor={fps}`). Usa `<TransitionSeries>` para que los clips queden pegados.
3. **Subtítulos:** transcribe con `remotion-captions/transcribe-captions.md` (o importa un `.srt`). Estilo reel:
   - 1–3 palabras por "página", palabra activa resaltada (color de acento o escala 1.1).
   - Fuente gruesa (p. ej. Montserrat/Poppins 800–900 vía `@remotion/google-fonts`), 70–90 px, blanco con contorno/sombra negra (`WebkitTextStroke` o `textShadow`) para que se lea sobre cualquier fondo.
   - Mantén los subtítulos dentro del mismo `<TransitionSeries.Sequence>` que su clip, como indica `display-captions.md`.
4. **Ritmo visual:**
   - Punch-in: alterna escala 1.0 ↔ 1.12–1.2 entre jump cuts consecutivos para disimular el corte.
   - Zoom suave en frases clave con `interpolate` / `spring` sobre `transform: scale()`.
   - Transiciones cortas (≤ 8 frames) o cortes secos; evita transiciones largas.
   - Textos emergentes / emojis / flechas para enfatizar, con entrada animada de 6–10 frames.
5. **Audio:**
   - Voz como pista principal. Música de fondo a volumen ~0.08–0.15 bajo la voz; puede subir a ~0.4 donde no hay voz.
   - Fade-in/out de música de 0,5 s con `interpolate` en `volume`.
   - SFX (whoosh, pop) en cortes y textos emergentes, si el usuario lo quiere (`sfx.md`).
6. **Revisión:** recorre el reel en Studio y verifica: hook en los primeros 2 s, nada fuera de zonas seguras, subtítulos sincronizados, sin silencios muertos, CTA visible.

## 5. Exportar

Solo renderiza cuando el usuario lo pida explícitamente (ver `remotion-best-practices`). Para subir a Reels/TikTok/Shorts:

```bash
npx remotion render <CompositionId> out/reel.mp4 --codec=h264 --crf=18
```

- H.264 + AAC, 1080×1920, 30 fps. Mantén el archivo por debajo de ~250 MB.
- Si el usuario pide portada, exporta un still del frame más llamativo con `npx remotion still <CompositionId> out/cover.png --frame=<n>`.

## 6. Qué preguntar si falta información

Antes de editar, si no está claro, pregunta solo lo imprescindible:
- ¿Qué archivo(s) de video usar y dónde están?
- ¿Plataforma (Reels / TikTok / Shorts) y duración objetivo?
- ¿Subtítulos sí/no, idioma, colores o fuente de marca?
- ¿Música o SFX propios?
- ¿Texto del hook y del CTA, o los propongo yo?

## 7. Notas de este entorno y patrones probados

- **Red restringida:** Google Fonts, remotion.media y HuggingFace pueden estar bloqueados. Carga fuentes locales desde `@fontsource/*` con `@remotion/fonts` (ver `reels/src/ColagenoReel/font.ts`) y renderiza con el Chromium preinstalado: `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.
- **Transcripción sin GPU:** Whisper small en ONNX (`sts-whisper-small` de npm) + `@huggingface/transformers` en Node con `return_timestamps: "word"`. Corrige el texto contra el guion del usuario.
- **No dejar solo la cara:** alterna cara ↔ escenas a pantalla completa que ilustren lo que se dice (producto flotando sobre pedestal, tarjetas, contadores, barras, iconos, sellos), sincronizadas con los timestamps de las palabras. Cuando dos escenas van seguidas, no hagas transición de salida/entrada entre ellas. Ejemplo completo: `reels/src/ColagenoReel/`.
- **Subtítulos encima de las escenas:** si hay cutaways, los subtítulos van en una capa superior con tiempos de composición y cambian de posición (sobre la cabeza en la cara, debajo de los gráficos en las escenas).
- **Producto:** recorta el producto de la foto con una máscara (PIL) a PNG con alfa y anímalo (caída con spring, flotación, brillo que lo recorre, sombra de contacto).
- **Paleta:** toma los colores del producto/marca para subtítulos, etiquetas y fondos.
