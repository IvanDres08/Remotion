# Skills de terceros instaladas

| Skill(s) | Origen | Commit | Licencia |
| --- | --- | --- | --- |
| broll-index, hook-lint, media-search, notes-digest, pause-cut, reel-render, video-analysis, videogen (enlazadas desde `vendor/reel-skills/skills/`) | https://github.com/danilbogdan/reel-skills | 3f43e8c | MIT (ver `vendor/reel-skills/LICENSE`) |
| video-edit (`skills/video-edit/`) | https://github.com/tenfoldmarc/video-edit-skill | 3f01f2e | ver su README |
| ig-audit, ig-caption, ig-carousel, ig-comment, ig-dm, ig-human, ig-plan, ig-profile, ig-reel, ig-reply, ig-repurpose, ig-story, ig-viral | https://github.com/Jakeschincariol/instagram-agent-skill | d03c56b | MIT |

Revisadas antes de instalar: sin instrucciones ocultas ni envío de datos; las llamadas de red son a las APIs
de medios (Pixabay, Freesound, Jamendo, BFL) solo con claves del usuario, y `video-edit` descarga sus SFX y
crea su propio venv (faster-whisper, Pillow) en su primera ejecución.
| agents, dubbing, music, onboarding, realtime, setup-api-key, sound-effects, speech-engine, speech-to-text, text-to-speech, voice-changer, voice-isolator | https://github.com/elevenlabs/skills (oficial) | 503d4e9 | MIT |

ElevenLabs: usar requiere `ELEVENLABS_API_KEY` en un `.env` (nunca en el chat ni en el código) y acceso de red a
`api.elevenlabs.io` / `elevenlabs.io`.
