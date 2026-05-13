# Hero Video Renovation — Design

**Date**: 2026-05-13
**Status**: Approved (brainstorming)
**Scope**: Replace the homepage hero (`HolographicCityScroll`) with a video-driven hero. Single section. Premium / smart-tech / minimalistic vibe.

---

## 1. Goal

Replace the existing 600vh scroll-driven frame-sequence hero with a clean one-screen video hero that:

- Plays the user-supplied isometric "smart city" video once on load.
- Settles on the final frame with a subtle "live system" feel produced via CSS-only micro-animations (no second video file).
- Reads as premium, minimalist, and tech-forward — Apple-keynote-style restraint, with a single cyan brand accent tying the UI to the video's holographic palette.

---

## 2. Architecture & scope

### 2.1 Removed

The following files are deleted in this change (no consumers outside the homepage):

- `src/components/HolographicCityScroll.jsx`
- `src/components/HolographicCityScroll.css`
- `src/components/ScrollContentOverlay.jsx`
- `src/components/ScrollContentOverlay.css`
- `src/components/CornerCards.jsx`
- `src/components/CornerCards.css`
- `src/hooks/useScrollFrames.js`
- `src/hooks/useFrameSequencePreloader.js`
- The frame-sequence WebP asset directory referenced by `useFrameSequencePreloader` (all frames).

Implementers must grep for any other consumers before deleting and verify nothing else imports these modules.

### 2.2 Added

- `src/components/HeroVideo.jsx` — the new hero component (~100 lines).
- `src/components/HeroVideo.css` — the styles.
- `public/videos/hero-smart-city.mp4` — re-encoded video (see §4.1).
- `public/videos/hero-smart-city.webm` — VP9 fallback (see §4.1).
- `public/videos/hero-smart-city-poster.jpg` — final-frame poster (see §4.1).
- A `<link rel="preload" as="video" ...>` line in `public/index.html`.

### 2.3 Integration point

`src/App.js` — `HomePage` currently renders `<HolographicCityScroll />`. Replace that single line with `<HeroVideo />`. The rest of the homepage is intentionally untouched (currently empty below the hero — out of scope for this spec).

---

## 3. Component structure

### 3.1 Markup

```jsx
<section className="hero-video" role="banner" aria-label="Dochak smart mobility hero">
  <video
    className="hero-video__media"
    poster="/videos/hero-smart-city-poster.jpg"
    autoPlay muted playsInline preload="auto"
    aria-hidden="true"
    onEnded={() => setVideoEnded(true)}
  >
    <source src="/videos/hero-smart-city.webm" type="video/webm" />
    <source src="/videos/hero-smart-city.mp4" type="video/mp4" />
  </video>

  <div className="hero-video__vignette" aria-hidden="true" />
  <div className="hero-video__scanline" aria-hidden="true" />

  <header className="hero-video__brand">
    <span className="hero-video__wordmark">
      DOCHAK<span className="hero-video__dot" />SMART MOBILITY
    </span>
  </header>

  <h1 className="hero-video__headline">
    Smarter cities.<br />
    Seamless <span className="hero-video__accent">mobility</span>.
  </h1>

  <a className={`hero-video__scroll-cue ${videoEnded ? 'is-idle' : ''}`} href="#main">
    <span>SCROLL</span>
    <span className="hero-video__scroll-line" />
  </a>
</section>
```

Reduced-motion branch (returned instead of the above when `prefersReducedMotion === true`):

```jsx
<section className="hero-video hero-video--static" role="banner" aria-label="Dochak smart mobility hero">
  <img
    className="hero-video__media"
    src="/videos/hero-smart-city-poster.jpg"
    alt="Holographic smart city — Dochak"
  />
  {/* same vignette, brand, headline, scroll-cue markup */}
</section>
```

### 3.2 State

The component owns exactly two pieces of state:

1. `prefersReducedMotion: boolean` — read once via `matchMedia('(prefers-reduced-motion: reduce)')` in a `useEffect`. Listens for changes.
2. `videoEnded: boolean` — set via the `<video onEnded>` handler. Adds an `is-idle` class to the scroll cue so its breathing animation can start.

No router-aware logic, no scroll hooks, no external state. Self-contained.

---

## 4. Video integration & playback

### 4.1 File preparation (one-time, before build)

Source: `~/Downloads/-OsWhRknAJFT-Fire32o_Dropshot.mp4` — 1920×1080, 24 fps, 6.0s, 144 frames, H.264 @ ~16 Mbps (~12 MB).

Output target:

- `hero-smart-city.mp4` — H.264, `-profile:v high -level 4.0 -pix_fmt yuv420p`, target bitrate ~3.5 Mbps with two-pass, `-movflags +faststart` so the moov atom lives at the front of the file. Expected size ~3 MB.
- `hero-smart-city.webm` — VP9, target bitrate ~2.5 Mbps. Expected size ~2 MB.
- `hero-smart-city-poster.jpg` — frame 143 (final frame), JPEG quality 85, ~150 KB.

The implementing engineer chooses the exact `ffmpeg` invocation; the constraints above are the contract.

### 4.2 Playback behavior

- Attributes: `autoplay muted playsinline preload="auto"`. All four are required for reliable mobile autoplay (iOS Safari).
- Plays through once. No `loop` attribute.
- On `ended`, the `<video>` element stays paused on its last rendered frame. Visually identical to the poster JPEG, so there is no perceptible flash if the browser swaps to the poster.
- No JS-driven loop window, no seeking, no second file. The "live" motion is produced entirely in CSS (§5.3).

### 4.3 Resource hint

In `public/index.html`, inside `<head>`:

```html
<link rel="preload" as="video" href="/videos/hero-smart-city.mp4" type="video/mp4" />
```

This kicks the video download off in parallel with the rest of the critical path. Only preload the MP4 (not WebM) — the browser will request the right format based on `<source>` selection; preloading both would waste bandwidth.

---

## 5. Layout & motion

### 5.1 Canvas

- `.hero-video` is `position: relative; width: 100vw; height: 100vh; overflow: hidden; background: #070707`.
- No sticky positioning. No scroll-jacking. Scrolling the page moves the hero away normally.

### 5.2 Layer stacking (z-index 1 → 5)

1. **Video / poster** — `position: absolute; inset: 0; object-fit: cover; object-position: center; width: 100%; height: 100%`.
2. **Vignette** — radial gradient, transparent at center, `rgba(7,7,7,0.55)` at corners.
3. **Scanline** — full-bleed band, ~2% white opacity, 8s linear translateY animation. Reuse the `holographic-scanline` keyframes from the old CSS before deleting the file (port the keyframe into `HeroVideo.css`).
4. **Brand header** — absolute, top: 32px, centered.
5. **Headline** + **scroll cue** — foreground UI.

### 5.3 Typography

System font stack — no new web font.

- **Wordmark**: 12px, `letter-spacing: 0.35em`, `font-weight: 500`, color `#fff`. Inline separator dot: 4px × 4px circle, `background: #57bceb`, `box-shadow: 0 0 8px #57bceb`, 8px horizontal margin.
- **Headline**: `font-size: clamp(36px, 6vw, 72px)`, `font-weight: 200`, `letter-spacing: -0.025em`, `line-height: 1.05`, color `#fff`. Two lines. The accent span on "mobility": `color: #57bceb; font-weight: 300`.
- **Scroll cue**: 10px, `letter-spacing: 0.35em`, opacity 0.7. The vertical line is 1px × 16px, `background: linear-gradient(to bottom, #57bceb, transparent)`, `box-shadow: 0 0 4px #57bceb`.

Positioning:

- Wordmark: `position: absolute; top: 32px; left: 50%; transform: translateX(-50%)`.
- Headline: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center`.
- Scroll cue: `position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px`.

### 5.4 Entrance motion (one-shot, cinematic)

CSS keyframes, all gated behind `@media (prefers-reduced-motion: no-preference)`:

- `t = 0s` — video starts playing; everything else is opacity 0.
- `t = 0.2s` — wordmark fades 0→1 over 600ms.
- `t = 2.0s` — headline fades 0→1 + translates 8px → 0 over 800ms `ease-out`.
- `t = 4.5s` — scroll cue fades 0→1 over 500ms.

All entrance animations have `animation-fill-mode: forwards` so end states stick.

### 5.5 Idle motion (after `videoEnded`, CSS-only "live system" feel)

Three details:

1. **Scroll-cue line** — when `.is-idle` is present, the line element animates its opacity 1 → 0.3 → 1 on a 2.4s `ease-in-out infinite` cycle. The `SCROLL` label stays fixed.
2. **Wordmark hairline** (optional, included in v1) — a 1px cyan hairline below the wordmark, animating opacity 0.4 → 1 → 0.4 on a 4s cycle.
3. **Scanline** — already running continuously from `t=0`; not gated on `videoEnded`. Faint enough to be perceptible only on still moments.

No other elements move once the page is settled.

### 5.6 Responsive

- **≥1024px**: as described above.
- **768–1023px**: headline `clamp(32px, 5vw, 52px)`. Wordmark unchanged. Vignette unchanged.
- **<768px**: headline `clamp(28px, 8vw, 40px)`, `max-width: 90vw`. Wordmark allowed to break to two lines (the `·` separator becomes a line break via flex `flex-wrap`). Video object-fit still `cover` — the building is centered in the frame, survives portrait crop.
- All responsive rules live in media queries inside `HeroVideo.css`. No JS-driven viewport logic.

---

## 6. Accessibility

- `<section role="banner" aria-label="Dochak smart mobility hero">`.
- `<video aria-hidden="true">` — purely decorative.
- Single `<h1>` on the page, containing the headline text. Screen readers announce "Smarter cities. Seamless mobility."
- Scroll cue is an `<a href="#main">` (or whatever id the next section uses, once one exists; until then, `#main` pointing to the `<main>` element is acceptable). Receives keyboard focus with a visible `outline: 2px solid #57bceb; outline-offset: 4px` on `:focus-visible`.
- `prefers-reduced-motion: reduce`: component renders the poster `<img>` instead of `<video>`. All CSS animations gated behind `@media (prefers-reduced-motion: no-preference)`. Wordmark, headline, and scroll-cue all visible without animation.

---

## 7. Performance & fallbacks

### 7.1 Net change

- **Removed**: ~50 preloaded WebP frames + Motion-driven scroll hooks + `HolographicCityScroll` machinery — multi-megabyte asset load, continuous canvas work.
- **Added**: one MP4 (~3 MB) + one WebM (~2 MB, chromium-only) + one JPEG poster (~150 KB).

Net win on every dimension: smaller payload, faster first paint, lower runtime CPU/GPU usage.

### 7.2 Fallback behavior

| Condition | Result |
|-----------|--------|
| Browser doesn't support `<video>` | Poster JPEG renders via `poster` attribute. Headline + wordmark unaffected. |
| Autoplay blocked despite `muted playsinline` | Poster shows. Optional `onClick` on the section calls `video.play()`. If still blocked, poster remains — looks intentional. |
| Slow network | Poster renders instantly. Video buffers in background, plays when ready. |
| `prefers-reduced-motion: reduce` | Component renders the poster `<img>` instead of `<video>`. No CSS animations run. |
| Chromium browser | Picks `.webm` source (smaller). |
| Safari | Picks `.mp4` source (no VP9 support). |

### 7.3 Testing checkpoints

Before merging:

- iOS Safari on a real iPhone — verify autoplay works (most fragile platform).
- macOS / Windows Chrome — verify WebM is selected (DevTools Network panel).
- macOS Safari — verify MP4 is selected.
- Reduced-motion: flip the OS toggle, refresh, confirm `<img>` renders and no animation plays.
- Slow 3G via Chrome DevTools — confirm poster shows before video buffers in.
- Keyboard nav — Tab through the page, confirm the scroll-cue link receives a visible focus ring.
- Lighthouse — confirm no regression in performance score vs. the previous hero (expected: significant improvement).

---

## 8. Out of scope

- Anything below the hero on the homepage. The page below the new hero is currently empty; that stays empty in this change. A follow-up spec will design the post-hero sections.
- Navbar, footer, other routes (about, solutions, etc.) — untouched.
- Korean-language version of the headline. (The wider site has language switching via `LanguageContext`. The implementer should wire the headline strings through the i18n system using the existing pattern, but the Korean copy itself is out of scope here — placeholder it as the English text until copy is approved.)
- Whether to also remove the `Hyperspeed` and other unused 3D dependencies — separate cleanup task.

---

## 9. Open questions

None remaining at design time. All choices made during brainstorming:

- Replace existing hero entirely → confirmed.
- Video plays once → confirmed.
- Subtle live-system feel after end → CSS-only (scroll-cue breathing + scanline + optional wordmark hairline) → confirmed.
- Layout A (centered, Apple-style) → confirmed.
- Copy "Smarter cities. Seamless mobility." → confirmed.
- Cyan accent (V2) → confirmed.
- LIVE pill removed → confirmed.
