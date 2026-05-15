# Hero Video Renovation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's 600vh scroll-driven frame-sequence hero (`HolographicCityScroll`) with a single-screen video hero (`HeroVideo`) that plays a smart-city video once, freezes on the last frame, and produces a subtle "live system" feel via CSS-only micro-animations. Premium / minimalist / cyan-accent aesthetic.

**Architecture:** New self-contained `HeroVideo` React component renders an HTML5 `<video>` (with WebM + MP4 sources and a JPEG poster), a vignette + scanline overlay, and three foreground UI elements (centered wordmark, centered headline with one cyan-accented word, breathing scroll cue). Reduced-motion users get the poster `<img>` instead of the video. After integration, the old hero machinery (`HolographicCityScroll`, `ScrollContentOverlay`, `CornerCards`, two scroll hooks, frame-asset utilities, and the WebP frame directory) is deleted.

**Tech Stack:** React 19 + react-scripts 5, plain CSS (no Tailwind for this component to match existing component patterns), HTML5 `<video>`, `ffmpeg` for asset encoding (run once locally, output committed to `public/videos/`).

**Spec:** [docs/superpowers/specs/2026-05-13-hero-video-renovation-design.md](../specs/2026-05-13-hero-video-renovation-design.md)

---

## File map

**Create:**
- `public/videos/hero-smart-city.mp4` (~3 MB, H.264 + faststart)
- `public/videos/hero-smart-city.webm` (~2 MB, VP9)
- `public/videos/hero-smart-city-poster.jpg` (~150 KB)
- `src/components/HeroVideo.jsx` — the new component (~110 lines)
- `src/components/HeroVideo.css` — the styles
- `src/components/HeroVideo.test.js` — one unit test for the reduced-motion branch

**Modify:**
- `public/index.html` — add a `<link rel="preload" as="video">` hint
- `src/App.js` — swap `<HolographicCityScroll />` for `<HeroVideo />` in `HomePage`

**Delete (after the new hero is verified working):**
- `src/components/HolographicCityScroll.jsx`
- `src/components/HolographicCityScroll.css`
- `src/components/ScrollContentOverlay.jsx`
- `src/components/ScrollContentOverlay.css`
- `src/components/CornerCards.jsx`
- `src/components/CornerCards.css`
- `src/hooks/useScrollFrames.js`
- `src/hooks/useFrameSequencePreloader.js`
- `src/utils/frameLoader.js`
- `src/utils/frameImporter.js`
- `src/utils/imagePreloader.js`
- `src/assets/frame100/` (entire WebP frame directory referenced by `frameImporter.js`)
- `src/assets/Sequence 01_frames/` (legacy)
- `src/assets/Sequence_01_frames/` (legacy)

---

## Task 1: Encode video assets

**Files:**
- Create: `public/videos/hero-smart-city.mp4`
- Create: `public/videos/hero-smart-city.webm`
- Create: `public/videos/hero-smart-city-poster.jpg`

The source video is at `~/Downloads/-OsWhRknAJFT-Fire32o_Dropshot.mp4` (1920×1080, 24 fps, 6.0 s, 144 frames). This task re-encodes it into web-optimized formats and extracts a poster.

- [ ] **Step 1: Make the output directory**

```bash
mkdir -p public/videos
```

- [ ] **Step 2: Encode the MP4 (two-pass H.264 with faststart)**

```bash
ffmpeg -y -i ~/Downloads/-OsWhRknAJFT-Fire32o_Dropshot.mp4 \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -b:v 3500k -maxrate 4500k -bufsize 6000k \
  -preset slow -an \
  -movflags +faststart \
  public/videos/hero-smart-city.mp4
```

Expected: outputs an ~2.6–3.2 MB file. `-an` drops audio (the source is silent and we never play sound).

- [ ] **Step 3: Encode the WebM (VP9)**

```bash
ffmpeg -y -i ~/Downloads/-OsWhRknAJFT-Fire32o_Dropshot.mp4 \
  -c:v libvpx-vp9 -b:v 2500k -minrate 1500k -maxrate 3500k \
  -row-mt 1 -deadline good -an \
  public/videos/hero-smart-city.webm
```

Expected: outputs an ~1.8–2.4 MB file.

- [ ] **Step 4: Extract the final-frame poster**

```bash
ffmpeg -y -i ~/Downloads/-OsWhRknAJFT-Fire32o_Dropshot.mp4 \
  -vf "select=eq(n\,143)" -frames:v 1 -q:v 5 \
  public/videos/hero-smart-city-poster.jpg
```

Expected: outputs an ~120–180 KB JPEG of the final frame.

- [ ] **Step 5: Verify the three files exist and are reasonably sized**

```bash
ls -lh public/videos/
```

Expected: three files, MP4 ~3 MB, WebM ~2 MB, JPG ~150 KB. If any file is > 8 MB or < 50 KB the encode parameters need adjustment — re-run with different `-b:v`.

- [ ] **Step 6: Commit the assets**

```bash
git add public/videos/
git commit -m "feat(hero): add web-encoded smart-city video assets and poster"
```

---

## Task 2: Add the resource hint

**Files:**
- Modify: `public/index.html`

- [ ] **Step 1: Open `public/index.html` and locate the `<head>` block**

Find a line near other `<link>` tags (e.g., the favicon link or manifest link).

- [ ] **Step 2: Add the preload hint right after the existing `<link>` lines**

```html
<link rel="preload" as="video" type="video/mp4" href="%PUBLIC_URL%/videos/hero-smart-city.mp4" />
```

(`%PUBLIC_URL%` is the standard CRA placeholder used elsewhere in this file.)

- [ ] **Step 3: Commit**

```bash
git add public/index.html
git commit -m "feat(hero): preload hero video on initial roundtrip"
```

---

## Task 3: Scaffold the HeroVideo CSS

**Files:**
- Create: `src/components/HeroVideo.css`

We start with the base layout — section, video layer, vignette, scanline — and the foreground elements positioned but unstyled for type. Animations come in Tasks 6 and 7.

- [ ] **Step 1: Create the CSS file with the base layout**

Write the complete file contents:

```css
/* ===== Hero Video — base layout ===== */

.hero-video {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #070707;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
}

/* Layer 1 — video / poster */
.hero-video__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

/* Layer 2 — vignette */
.hero-video__vignette {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(7, 7, 7, 0.25) 60%,
    rgba(7, 7, 7, 0.55) 100%
  );
}

/* Layer 3 — scanline overlay (ported from HolographicCityScroll.css) */
.hero-video__scanline {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 100%
  );
  animation: heroScanline 8s linear infinite;
  will-change: transform;
}

@keyframes heroScanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Layer 4+ — foreground UI containers (positioning only; typography in Task 5) */
.hero-video__brand {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}

.hero-video__headline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  text-align: center;
  margin: 0;
  max-width: 90vw;
}

.hero-video__scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
}

.hero-video__scroll-cue:focus-visible {
  outline: 2px solid #57bceb;
  outline-offset: 4px;
  border-radius: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.css
git commit -m "feat(hero): add HeroVideo base layout and overlay layers"
```

---

## Task 4: Scaffold the HeroVideo component

**Files:**
- Create: `src/components/HeroVideo.jsx`

A first pass with the markup, state hooks, and reduced-motion branch. No typography styling yet — that comes in Task 5.

- [ ] **Step 1: Create the component file**

Write the complete file contents:

```jsx
import React, { useEffect, useState } from 'react';
import './HeroVideo.css';

const HeroVideo = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const Wordmark = () => (
    <span className="hero-video__wordmark">
      DOCHAK<span className="hero-video__dot" aria-hidden="true" />SMART MOBILITY
    </span>
  );

  const Headline = () => (
    <h1 className="hero-video__headline">
      Smarter cities.<br />
      Seamless <span className="hero-video__accent">mobility</span>.
    </h1>
  );

  const ScrollCue = () => (
    <a
      href="#main"
      className={`hero-video__scroll-cue${videoEnded ? ' is-idle' : ''}`}
      aria-label="Scroll to next section"
    >
      <span className="hero-video__scroll-label">SCROLL</span>
      <span className="hero-video__scroll-line" aria-hidden="true" />
    </a>
  );

  if (prefersReducedMotion) {
    return (
      <section
        className="hero-video hero-video--static"
        role="banner"
        aria-label="Dochak smart mobility hero"
      >
        <img
          className="hero-video__media"
          src="/videos/hero-smart-city-poster.jpg"
          alt="Holographic smart city — Dochak"
        />
        <div className="hero-video__vignette" aria-hidden="true" />
        <header className="hero-video__brand"><Wordmark /></header>
        <Headline />
        <ScrollCue />
      </section>
    );
  }

  return (
    <section
      className="hero-video"
      role="banner"
      aria-label="Dochak smart mobility hero"
    >
      <video
        className="hero-video__media"
        poster="/videos/hero-smart-city-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={() => setVideoEnded(true)}
      >
        <source src="/videos/hero-smart-city.webm" type="video/webm" />
        <source src="/videos/hero-smart-city.mp4" type="video/mp4" />
      </video>
      <div className="hero-video__vignette" aria-hidden="true" />
      <div className="hero-video__scanline" aria-hidden="true" />
      <header className="hero-video__brand"><Wordmark /></header>
      <Headline />
      <ScrollCue />
    </section>
  );
};

export default HeroVideo;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.jsx
git commit -m "feat(hero): add HeroVideo component with reduced-motion branch"
```

---

## Task 5: Style the wordmark, headline, and scroll cue

**Files:**
- Modify: `src/components/HeroVideo.css`

Append the typography rules and the cyan-dot separator. Open the file and add the following section at the bottom — keep all existing rules intact.

- [ ] **Step 1: Append the typography block to `HeroVideo.css`**

Append exactly this to the end of the file:

```css
/* ===== Hero Video — typography ===== */

.hero-video__wordmark {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: #fff;
  white-space: nowrap;
}

.hero-video__dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 12px;
  border-radius: 50%;
  background: #57bceb;
  box-shadow: 0 0 8px #57bceb;
}

.hero-video__headline {
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 200;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: #fff;
}

.hero-video__accent {
  color: #57bceb;
  font-weight: 300;
}

.hero-video__scroll-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.35em;
  opacity: 0.7;
  color: #fff;
}

.hero-video__scroll-line {
  display: block;
  width: 1px;
  height: 16px;
  background: linear-gradient(to bottom, #57bceb, transparent);
  box-shadow: 0 0 4px rgba(87, 188, 235, 0.6);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.css
git commit -m "feat(hero): style wordmark, headline, and scroll cue"
```

---

## Task 6: Add entrance animations

**Files:**
- Modify: `src/components/HeroVideo.css`

Append entrance keyframes that fade in the wordmark (0.2 s delay, 600 ms), headline (2.0 s delay, 800 ms ease-out, 8 px translate up), and scroll cue (4.5 s delay, 500 ms). All gated behind `prefers-reduced-motion: no-preference`.

- [ ] **Step 1: Append the entrance animation block to `HeroVideo.css`**

Append exactly this to the end of the file:

```css
/* ===== Hero Video — entrance motion ===== */

@media (prefers-reduced-motion: no-preference) {
  .hero-video__brand {
    opacity: 0;
    animation: heroFadeIn 600ms ease-out 200ms forwards;
  }

  .hero-video__headline {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 8px));
    animation: heroHeadlineIn 800ms ease-out 2000ms forwards;
  }

  .hero-video__scroll-cue {
    opacity: 0;
    animation: heroFadeIn 500ms ease-out 4500ms forwards;
  }
}

@keyframes heroFadeIn {
  to { opacity: 1; }
}

@keyframes heroHeadlineIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.css
git commit -m "feat(hero): add staged entrance animations"
```

---

## Task 7: Add idle (post-video) animations

**Files:**
- Modify: `src/components/HeroVideo.css`

When the video ends, the component sets `.is-idle` on the scroll-cue link. Add a 2.4 s breathing animation on the cyan line, plus the wordmark hairline cue described in the spec §5.5.

- [ ] **Step 1: Append the idle animation block to `HeroVideo.css`**

Append exactly this to the end of the file:

```css
/* ===== Hero Video — idle motion (after video ends) ===== */

@media (prefers-reduced-motion: no-preference) {
  .hero-video__scroll-cue.is-idle .hero-video__scroll-line {
    animation: heroBreathe 2400ms ease-in-out infinite;
  }

  /* Optional cyan hairline under the wordmark for an extra "live" beat */
  .hero-video__brand::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 24px;
    height: 1px;
    background: #57bceb;
    opacity: 0.4;
    animation: heroHairline 4000ms ease-in-out infinite;
  }
}

@keyframes heroBreathe {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}

@keyframes heroHairline {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}
```

The `.hero-video__brand` already has `position: absolute`, so the `::after` positioning works as written.

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.css
git commit -m "feat(hero): add idle live-system micro-animations"
```

---

## Task 8: Responsive media queries

**Files:**
- Modify: `src/components/HeroVideo.css`

- [ ] **Step 1: Append the responsive block to `HeroVideo.css`**

Append exactly this to the end of the file:

```css
/* ===== Hero Video — responsive ===== */

@media (max-width: 1023px) {
  .hero-video__headline {
    font-size: clamp(32px, 5vw, 52px);
  }
}

@media (max-width: 767px) {
  .hero-video__brand {
    top: 24px;
  }

  .hero-video__wordmark {
    flex-wrap: wrap;
    justify-content: center;
    font-size: 11px;
    letter-spacing: 0.3em;
    max-width: 80vw;
  }

  .hero-video__dot {
    margin: 0 8px;
  }

  .hero-video__headline {
    font-size: clamp(28px, 8vw, 40px);
    max-width: 90vw;
  }

  .hero-video__scroll-cue {
    bottom: 20px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroVideo.css
git commit -m "feat(hero): responsive headline and brand on tablet/mobile"
```

---

## Task 9: Unit test for the reduced-motion branch

**Files:**
- Create: `src/components/HeroVideo.test.js`

The rest of the component is visual and is verified manually in Task 11. The one piece worth unit-testing is the reduced-motion branch — it has a real if/else that decides between `<video>` and `<img>`, and that's easy to assert with React Testing Library (already a project dependency).

- [ ] **Step 1: Write the failing test**

Create the file with these contents:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroVideo from './HeroVideo';

const mockMatchMedia = (matches) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
};

describe('HeroVideo', () => {
  test('renders a <video> when reduced motion is not preferred', () => {
    mockMatchMedia(false);
    const { container } = render(<HeroVideo />);
    const video = container.querySelector('video.hero-video__media');
    const img = container.querySelector('img.hero-video__media');
    expect(video).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });

  test('renders a poster <img> when reduced motion is preferred', () => {
    mockMatchMedia(true);
    const { container } = render(<HeroVideo />);
    const video = container.querySelector('video.hero-video__media');
    const img = container.querySelector('img.hero-video__media');
    expect(video).not.toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/videos/hero-smart-city-poster.jpg');
  });

  test('always renders the headline as an <h1>', () => {
    mockMatchMedia(false);
    render(<HeroVideo />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Smarter cities/);
    expect(h1).toHaveTextContent(/Seamless mobility/);
  });
});
```

- [ ] **Step 2: Run the test, confirm it passes**

```bash
CI=true npm test -- --testPathPattern=HeroVideo
```

Expected: 3 tests pass. (`CI=true` makes Jest exit instead of staying in watch mode.)

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroVideo.test.js
git commit -m "test(hero): cover reduced-motion branch and h1 contract"
```

---

## Task 10: Wire HeroVideo into the homepage

**Files:**
- Modify: `src/App.js`

Replace the `<HolographicCityScroll />` render in `HomePage` with `<HeroVideo />`. Keep the import path consistent with the existing components folder convention.

- [ ] **Step 1: Replace the import line in `src/App.js`**

Find this line near the top of the file:

```jsx
import HolographicCityScroll from './components/HolographicCityScroll';
```

Replace it with:

```jsx
import HeroVideo from './components/HeroVideo';
```

- [ ] **Step 2: Replace the JSX render inside the `HomePage` component**

Find this block inside `HomePage`:

```jsx
return (
  <main>
    {/* Section 1: Holographic City Hero */}
    <HolographicCityScroll />
  </main>
);
```

Replace it with:

```jsx
return (
  <main id="main">
    {/* Section 1: Video Hero */}
    <HeroVideo />
  </main>
);
```

(The `id="main"` on `<main>` is the anchor target for the scroll cue's `href="#main"` link. It does nothing user-visible until there's content below the hero, but it makes the keyboard-focusable scroll-cue link a no-op rather than a broken anchor.)

- [ ] **Step 3: Commit**

```bash
git add src/App.js
git commit -m "feat(hero): swap HolographicCityScroll for HeroVideo on homepage"
```

---

## Task 11: Manual browser verification

**Files:** none (verification only).

Run the dev server and verify the hero behaves correctly across the conditions called out in the spec §7.3. **Do not proceed to Task 12 (deletion) until everything in this task passes.**

- [ ] **Step 1: Start the dev server**

```bash
npm start
```

Expected: server starts at `http://localhost:3000`.

- [ ] **Step 2: Verify the hero renders correctly on first load**

In a desktop Chrome window:
1. Open `http://localhost:3000`.
2. The poster JPEG must be visible immediately (no black flash).
3. The video must autoplay within a second or two.
4. Wordmark fades in around 0.2 s, headline around 2 s, scroll cue around 4.5 s.
5. After ~6 s the video freezes on the final frame; the scroll cue line starts breathing.

If autoplay does not start, check the browser console for an autoplay-policy warning. With `muted playsinline`, this is rare on desktop Chrome.

- [ ] **Step 3: Verify the responsive layouts**

Open Chrome DevTools → Device Toolbar:
1. iPhone 14 Pro (390 × 844): wordmark fits, headline ≤ 90 vw, scroll cue still bottom-center.
2. iPad (1024 × 1366): tablet headline size kicks in.
3. Desktop 1920 × 1080: full layout.

- [ ] **Step 4: Verify reduced-motion**

In DevTools → Rendering panel, toggle "Emulate CSS media feature prefers-reduced-motion: reduce", then refresh. Expected:
1. No `<video>` element in the DOM — only `<img class="hero-video__media">`.
2. No entrance animations run (wordmark, headline, scroll cue are visible at t=0).
3. The scroll-cue line is static — no breathing.
4. The scanline overlay is not rendered (the reduced-motion branch omits it).

- [ ] **Step 5: Verify slow-network behavior**

In DevTools → Network panel, throttle to "Slow 3G", hard-refresh. Expected: the poster JPEG appears within the first second; the video begins playing whenever it finishes buffering, without any black-screen gap.

- [ ] **Step 6: Verify keyboard accessibility**

With the page loaded normally, press Tab repeatedly. The scroll cue link must receive focus with a visible cyan outline at some point in the tab order.

- [ ] **Step 7: Verify iOS Safari autoplay (if a device is available)**

Open the dev URL on a real iPhone via your machine's IP address. The video should autoplay without a tap. If it does not, the most common cause is missing `playsInline` or `muted` — check both are present on the `<video>` element.

- [ ] **Step 8: Stop the dev server**

`Ctrl+C` in the terminal. No commit on this task — it's verification only.

---

## Task 12: Remove the old hero machinery

**Files:**
- Delete: `src/components/HolographicCityScroll.jsx`
- Delete: `src/components/HolographicCityScroll.css`
- Delete: `src/components/ScrollContentOverlay.jsx`
- Delete: `src/components/ScrollContentOverlay.css`
- Delete: `src/components/CornerCards.jsx`
- Delete: `src/components/CornerCards.css`
- Delete: `src/hooks/useScrollFrames.js`
- Delete: `src/hooks/useFrameSequencePreloader.js`
- Delete: `src/utils/frameLoader.js`
- Delete: `src/utils/frameImporter.js`
- Delete: `src/utils/imagePreloader.js`
- Delete: `src/assets/frame100/`
- Delete: `src/assets/Sequence 01_frames/`
- Delete: `src/assets/Sequence_01_frames/`

- [ ] **Step 1: Sanity-check that no other code imports any of these modules**

Run these greps and confirm each returns **only** the file being deleted itself (and any other file in the deletion list):

```bash
grep -rn "HolographicCityScroll" src/
grep -rn "ScrollContentOverlay" src/
grep -rn "CornerCards" src/
grep -rn "useScrollFrames" src/
grep -rn "useFrameSequencePreloader\|useFrameImage" src/
grep -rn "frameLoader\|frameImporter\|imagePreloader" src/
```

Expected: every result either points to a file being deleted, or doesn't exist. If anything else turns up (e.g., a route or page that imports one of these), stop and reconcile before deleting.

- [ ] **Step 2: Delete the component files**

```bash
rm src/components/HolographicCityScroll.jsx
rm src/components/HolographicCityScroll.css
rm src/components/ScrollContentOverlay.jsx
rm src/components/ScrollContentOverlay.css
rm src/components/CornerCards.jsx
rm src/components/CornerCards.css
```

- [ ] **Step 3: Delete the hooks**

```bash
rm src/hooks/useScrollFrames.js
rm src/hooks/useFrameSequencePreloader.js
```

- [ ] **Step 4: Delete the frame utilities**

```bash
rm src/utils/frameLoader.js
rm src/utils/frameImporter.js
rm src/utils/imagePreloader.js
```

- [ ] **Step 5: Delete the WebP frame asset directories**

```bash
rm -rf src/assets/frame100
rm -rf "src/assets/Sequence 01_frames"
rm -rf src/assets/Sequence_01_frames
```

- [ ] **Step 6: Run the unit tests to confirm nothing is broken**

```bash
CI=true npm test
```

Expected: all tests pass. If a test fails due to a missing import, restore the failing file and reconcile.

- [ ] **Step 7: Run a production build to confirm nothing is broken**

```bash
npm run build
```

Expected: build completes with no errors. There may be size warnings — those are fine. The build must complete with exit code 0.

- [ ] **Step 8: Restart the dev server and re-verify the hero still works**

```bash
npm start
```

Hit `http://localhost:3000`, confirm the hero still plays. Stop the server with `Ctrl+C`.

- [ ] **Step 9: Commit the deletion as one atomic change**

```bash
git add -A src/components/ src/hooks/ src/utils/ src/assets/
git commit -m "chore(hero): remove legacy scroll-frame hero and frame assets

Deletes HolographicCityScroll, ScrollContentOverlay, CornerCards, two
scroll hooks, three frame utilities, and the WebP frame asset directories
that were only consumed by the old hero. Replaced in this branch by the
HeroVideo component."
```

---

## Task 13: Final sanity check

**Files:** none (verification only).

- [ ] **Step 1: Confirm the working tree is clean**

```bash
git status
```

Expected: "nothing to commit, working tree clean".

- [ ] **Step 2: Confirm the commit history reads cleanly**

```bash
git log --oneline -15
```

Expected: a coherent series of feat/test/chore commits since the design-spec commit, no fixup commits left behind.

- [ ] **Step 3: Run a full build one more time**

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 4: Done.**

The hero is now `HeroVideo`. The old machinery is gone. Ready for review / merge.

---

## Spec coverage check

Mapping spec sections → tasks that implement them:

- §2.1 Removed files → Task 12
- §2.2 Added files → Tasks 1, 2, 3, 4, 9
- §2.3 Integration point → Task 10
- §3.1 Markup → Task 4
- §3.2 State → Task 4
- §4.1 File preparation → Task 1
- §4.2 Playback behavior → Task 4 (attributes + onEnded)
- §4.3 Resource hint → Task 2
- §5.1 Canvas → Task 3
- §5.2 Layer stacking → Tasks 3, 4
- §5.3 Typography → Task 5
- §5.4 Entrance motion → Task 6
- §5.5 Idle motion → Task 7
- §5.6 Responsive → Task 8
- §6 Accessibility → Tasks 3 (focus ring), 4 (roles, aria, reduced-motion branch), 9 (h1 test), 10 (`id="main"` anchor target), 11 (manual keyboard verification)
- §7.1 Net change → Tasks 1, 12 (the actual diff)
- §7.2 Fallback behavior → Task 4 (autoplay attrs, source order) + Task 11 (verification)
- §7.3 Testing checkpoints → Task 11
- §8 Out of scope → not implemented (correctly omitted)
- §9 Open questions → none

All spec sections are covered.
