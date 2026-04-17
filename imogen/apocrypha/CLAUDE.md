# Apocrypha — Claude Context

## What This Is
An atmospheric horror artifact disguised as a fictional found-document archive. The conceit is that the user is presenting recovered classified material "for research purposes only." Every design choice — typography, filters, audio, hidden content, the missing favicon — is in service of the fiction. The craft is deliberately dense.

## Aesthetic Lineage
If you need to make a call, these are the spiritual predecessors:
- **SCP Foundation** — fake classified research, bureaucratic horror, redaction energy
- **Cold War / Eastern Bloc** — Cyrillic first, English as translation; amber terminals; sparse official-document framing
- **Analog horror** — VHS degradation, scanlines, CRT flicker, random glitches
- **ARG / puzzle games** — password gates, numbered files, unlinked hidden entries
- **Creepypasta** — "found under floorboards," memetic contagion warnings, refusal to be cheerful

## Cardinal Rules (don't violate these)
1. **Never break the fourth wall.** No jokes, winks, friendly copy, or modern UI patterns. The page is not aware it's a page.
2. **The aesthetic IS the content.** Every filter, flicker, scanline, and fake typeface name is load-bearing. If you "clean it up," you erase the work.
3. **Russian first, English second.** Cyrillic copy creates distance; English reads as translation. Don't flip the order.
4. **No favicons.** The favicon-strip script is intentional — the page refuses to exist in the browser's identity layer.
5. **Hidden things stay hidden.** Unlinked entries (`entry3.html`) and password-gated files are discoveries, not navigation. Don't add them to the index.
6. **Err toward MORE degraded, LESS welcoming.** When uncertain, make it more broken, not less.

## Technical Patterns to Preserve
| Pattern | Where | Why |
|---------|-------|-----|
| Favicon strip on load | `index.html` inline `<script>` | Page has no browser identity |
| `@font-face` named `Apocryphos` (actually Courier New) | `index.html` `<style>` | Fake typeface name is part of the fiction |
| `filter: blur(0.3px) contrast(1.2)` on headings | `index.html` | Damaged-document look |
| `filter: brightness(0.9)` on paragraphs | `index.html` | Subtle dimming |
| `mix-blend-mode: difference` link overlay | `index.html` hover state | Struck-through effect on interaction |
| Random glitch flash every 2–5s, 20% double-flash | `index.html` `scheduleGlitch()` | Never predictable |
| CRT scanline overlay | `terminal.html` | Analog artifact |
| `screen-flicker` keyframe animation | `terminal.html` body | Constant instability |
| Audio autoplay-muted → unmute-on-click dance | all pages | Bypasses browser autoplay blocks |
| Ambient audio fade-in on first click | `terminal.html` | Audio is never jarring, it creeps in |
| Forced Enter/Return disclaimer popup | `index.html` | Commitment gate — you chose to be here |
| 10-digit numeric codes → `{code}.html` files | `terminal.html` | Puzzle content; filenames ARE the answer |

## Content & Tone
- **Framing copy is sacred.** Phrases like "for research purposes only," "memetic contagions," "found under floorboards" set the archive-horror tone. Match this register exactly when writing new copy.
- **Every page gets its own ambient audio loop.** Audio files live at `/resources/` (root): `apocrypha.mp3`, `terminal.mp3`, `transcript.mp3`. Adding a new surface → add a new track or reuse one with purpose.
- **Footer credits are in-fiction.** "© 2025 John Miles Caldwell — This page was found under floorboards" is not a real copyright notice; it's part of the uncanny.

## File Map
| File | What it is |
|------|-----------|
| `index.html` | Entry gate — disclaimer popup, archive links, glitch overlay, ambient audio |
| `terminal.html` | Amber CRT terminal. 10 valid 10-digit codes, 3 attempts, opens `{code}.html` in new tab |
| `entry1.html` | Linked archive entry |
| `entry2.html` | Linked archive entry |
| `entry3.html` | **Unlinked** — hidden, reachable only by knowing the URL |
| `{10-digit-code}.html` (0+ of these) | Terminal-gated puzzle pages. Filename == unlock code. |

Background image: `/resources/apocrypha.png`
Audio: `/resources/apocrypha.mp3`, `/resources/terminal.mp3`, `/resources/transcript.mp3`

## Working on Apocrypha

### Adding a new entry
1. Match tone of existing entries (read `entry1.html` and `entry2.html` first).
2. Apply degradation filters (blur, contrast, brightness) and scanlines where it fits.
3. Add looped ambient audio (either a new track or an existing one).
4. **Decide:** is it linked on `index.html`, or hidden?
5. Russian copy first, English as translation.

### Adding a password-gated file
- Filename must be one of the 10 valid codes in `terminal.html`:
  `8172402134`, `4729103658`, `1407230501`, `1938042765`, `8273649180`,
  `5647382910`, `1029384756`, `0192837465`, `5556667777`, `3141592653`
- …or add a new valid code to the `validCodes` array in `terminal.html` first.
- The file opens in a new tab via `window.open()`.

### Editing existing pages
- **Don't** remove glitches, flickers, scanlines, or filters "for readability."
- **Don't** add friendly copy, helpful affordances, or modern UI patterns.
- **Don't** restore a favicon.
- **Don't** swap Russian for English.
- If something feels wrong, it's probably right. If something feels comfortable, double-check it.

## The Smell Test
Before committing any change to Apocrypha, ask: *does this make the archive feel more like a real damaged artifact, or more like a website?* If the answer is "more like a website," undo it.
