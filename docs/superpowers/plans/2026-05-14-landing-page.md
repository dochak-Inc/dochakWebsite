# Landing Page Renovation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build six new sections below the existing `<HeroVideo />` on the homepage: Intro → Solutions → Projects → Training → About+Stats → CTA. All-dark theme, cyan-only accent, editorial copy, premium minimalist. Each section is a self-contained component that uses shared atoms for shell/eyebrow/heading and reuses the existing `useScrollAnimation` hook for entrance motion.

**Architecture:** Four small atom components (`SectionShell`, `SectionEyebrow`, `SectionHeading`, `AnimatedElement`) define the layout shell, typography, and scroll-fade behavior. Six section components (`LandingIntro`, `LandingSolutions`, `LandingProjects`, `LandingTraining`, `LandingAbout`, `LandingCTA`) compose those atoms with section-specific content. All copy lives in `src/locales/en.json` and `src/locales/ko.json` under a `landing.*` namespace, pulled through the existing `LanguageContext`. One change to `src/App.js` to render the six sections after the hero.

**Tech Stack:** React 19 + react-scripts 5, plain CSS (matches existing component pattern), system fonts, existing `useScrollAnimation` hook, existing `dotted-map` dependency (already in `package.json` from About.js).

**Spec:** [docs/superpowers/specs/2026-05-14-landing-page-design.md](../specs/2026-05-14-landing-page-design.md)

---

## File map

**Create:**
- `src/components/landing/landing.css` — shared CSS custom properties + shared keyframes
- `src/components/landing/atoms/SectionShell.jsx` + `.css`
- `src/components/landing/atoms/SectionShell.test.js`
- `src/components/landing/atoms/SectionEyebrow.jsx` + `.css`
- `src/components/landing/atoms/SectionHeading.jsx` + `.css`
- `src/components/landing/atoms/AnimatedElement.jsx` + `.css`
- `src/components/landing/LandingIntro.jsx` + `.css`
- `src/components/landing/LandingSolutions.jsx` + `.css`
- `src/components/landing/LandingProjects.jsx` + `.css`
- `src/components/landing/LandingTraining.jsx` + `.css`
- `src/components/landing/LandingAbout.jsx` + `.css`
- `src/components/landing/LandingCTA.jsx` + `.css`

**Modify:**
- `src/locales/en.json` — add `landing.*` namespace (10+ keys across 6 sections)
- `src/locales/ko.json` — mirror EN strings as placeholders (Korean translation is a follow-up)
- `src/App.js` — import 6 new components, render after `<HeroVideo />`

**Asset reuse** (no new images created):
- `src/assets/nepo.webp` → Naepo project thumbnail
- `src/assets/teledriving.webp` → Daejeon–Jeju project thumbnail
- `src/assets/automob.webp` → Incheon Airport Parking project thumbnail
- All existing — no new images committed.

---

## Task 1: Foundations — shared CSS variables

**Files:**
- Create: `src/components/landing/landing.css`

- [ ] **Step 1:** Create the directory and file. Run:

```bash
mkdir -p src/components/landing/atoms
```

- [ ] **Step 2:** Create `src/components/landing/landing.css` with these exact contents:

```css
/* ===== Landing page — shared design tokens ===== */
/* Scoped to .landing-section so they don't leak into other routes. */

.landing-section {
  --bg-deep: #050505;
  --bg-base: #070707;
  --bg-lift: #121212;

  --accent-cyan: #57bceb;

  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-muted: rgba(255, 255, 255, 0.4);

  --font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
}

/* ===== Shared keyframes ===== */

@keyframes landingBreathe {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}
```

- [ ] **Step 3:** Commit:

```bash
git add src/components/landing/landing.css
git commit -m "feat(landing): add shared design tokens and keyframes"
```

---

## Task 2: SectionShell atom

**Files:**
- Create: `src/components/landing/atoms/SectionShell.jsx`
- Create: `src/components/landing/atoms/SectionShell.css`
- Create: `src/components/landing/atoms/SectionShell.test.js`

The outer `<section>` wrapper used by every landing section. Accepts a `tone` prop (`"deep" | "base" | "lift"`) and applies the matching background.

- [ ] **Step 1:** Create `src/components/landing/atoms/SectionShell.jsx` with these exact contents:

```jsx
import React from 'react';
import '../landing.css';
import './SectionShell.css';

/**
 * Outer <section> wrapper for landing-page sections.
 * @param {'deep'|'base'|'lift'} tone — which background tone to apply.
 * @param {string} ariaLabel — accessible label.
 */
const SectionShell = ({ tone = 'base', ariaLabel, children }) => {
  return (
    <section
      className={`landing-section landing-section--${tone}`}
      aria-label={ariaLabel}
    >
      <div className="landing-section__container">
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
```

- [ ] **Step 2:** Create `src/components/landing/atoms/SectionShell.css` with these exact contents:

```css
.landing-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: clamp(80px, 12vh, 160px) 0;
  color: var(--text-primary);
  font-family: var(--font-stack);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.landing-section--deep { background: var(--bg-deep); }
.landing-section--base { background: var(--bg-base); }
.landing-section--lift { background: var(--bg-lift); }

.landing-section__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

@media (max-width: 768px) {
  .landing-section {
    min-height: auto;
    padding: clamp(64px, 10vh, 96px) 0;
  }
}
```

- [ ] **Step 3:** Create `src/components/landing/atoms/SectionShell.test.js` with these exact contents:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import SectionShell from './SectionShell';

describe('SectionShell', () => {
  test('applies the deep tone class', () => {
    const { container } = render(
      <SectionShell tone="deep" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--deep')).toBeInTheDocument();
  });

  test('applies the base tone class', () => {
    const { container } = render(
      <SectionShell tone="base" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--base')).toBeInTheDocument();
  });

  test('applies the lift tone class', () => {
    const { container } = render(
      <SectionShell tone="lift" ariaLabel="test">x</SectionShell>
    );
    expect(container.querySelector('.landing-section--lift')).toBeInTheDocument();
  });

  test('defaults to base tone when prop omitted', () => {
    const { container } = render(<SectionShell ariaLabel="test">x</SectionShell>);
    expect(container.querySelector('.landing-section--base')).toBeInTheDocument();
  });

  test('renders children inside the container', () => {
    const { getByText } = render(
      <SectionShell tone="base" ariaLabel="test">hello world</SectionShell>
    );
    expect(getByText('hello world')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4:** Run the tests and confirm all five pass:

```bash
CI=true npm test -- --testPathPattern=SectionShell --watchAll=false
```

Expected: `Tests: 5 passed, 5 total`.

- [ ] **Step 5:** Commit:

```bash
git add src/components/landing/atoms/SectionShell.jsx src/components/landing/atoms/SectionShell.css src/components/landing/atoms/SectionShell.test.js
git commit -m "feat(landing): add SectionShell atom with tone variants"
```

---

## Task 3: SectionEyebrow atom

**Files:**
- Create: `src/components/landing/atoms/SectionEyebrow.jsx`
- Create: `src/components/landing/atoms/SectionEyebrow.css`

The small mono-styled "NN · TITLE" label that appears at the top of every section.

- [ ] **Step 1:** Create `src/components/landing/atoms/SectionEyebrow.jsx` with these exact contents:

```jsx
import React from 'react';
import './SectionEyebrow.css';

/** Small "01 · MISSION"-style label. Pass the full string in via the `text` prop. */
const SectionEyebrow = ({ text }) => {
  return <span className="landing-eyebrow">{text}</span>;
};

export default SectionEyebrow;
```

- [ ] **Step 2:** Create `src/components/landing/atoms/SectionEyebrow.css` with these exact contents:

```css
.landing-eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 24px;
}
```

- [ ] **Step 3:** Commit:

```bash
git add src/components/landing/atoms/SectionEyebrow.jsx src/components/landing/atoms/SectionEyebrow.css
git commit -m "feat(landing): add SectionEyebrow atom"
```

---

## Task 4: SectionHeading atom

**Files:**
- Create: `src/components/landing/atoms/SectionHeading.jsx`
- Create: `src/components/landing/atoms/SectionHeading.css`

H2 wrapper with consistent type styles. Renders an `<h2>` by default but accepts an `as` prop for cases where an `<h1>` is needed.

- [ ] **Step 1:** Create `src/components/landing/atoms/SectionHeading.jsx` with these exact contents:

```jsx
import React from 'react';
import './SectionHeading.css';

/** Section-level heading. Defaults to <h2>. */
const SectionHeading = ({ children, as: Tag = 'h2', className = '' }) => {
  return (
    <Tag className={`landing-heading ${className}`}>
      {children}
    </Tag>
  );
};

export default SectionHeading;
```

- [ ] **Step 2:** Create `src/components/landing/atoms/SectionHeading.css` with these exact contents:

```css
.landing-heading {
  margin: 0 0 24px 0;
  font-family: var(--font-stack);
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-primary);
  max-width: 18ch;
}

.landing-heading .landing-heading__accent {
  color: var(--accent-cyan);
  font-weight: 300;
}
```

- [ ] **Step 3:** Commit:

```bash
git add src/components/landing/atoms/SectionHeading.jsx src/components/landing/atoms/SectionHeading.css
git commit -m "feat(landing): add SectionHeading atom"
```

---

## Task 5: AnimatedElement atom

**Files:**
- Create: `src/components/landing/atoms/AnimatedElement.jsx`
- Create: `src/components/landing/atoms/AnimatedElement.css`

Wraps a child in an `IntersectionObserver`-driven fade-up animation, reusing the existing `useScrollAnimation` hook. Same pattern as `About.js` but isolated to landing-page use.

- [ ] **Step 1:** Create `src/components/landing/atoms/AnimatedElement.jsx` with these exact contents:

```jsx
import React from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import './AnimatedElement.css';

/**
 * Wraps children in a scroll-triggered fade-up animation.
 * @param {number} delay — animation delay in ms.
 * @param {string} className — additional class names for the wrapper.
 */
const AnimatedElement = ({ children, delay = 0, className = '' }) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef}
      className={`landing-animated ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
```

- [ ] **Step 2:** Create `src/components/landing/atoms/AnimatedElement.css` with these exact contents:

```css
.landing-animated {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.landing-animated.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .landing-animated {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 3:** Commit:

```bash
git add src/components/landing/atoms/AnimatedElement.jsx src/components/landing/atoms/AnimatedElement.css
git commit -m "feat(landing): add AnimatedElement scroll-fade wrapper"
```

---

## Task 6: Section 1 — LandingIntro

**Files:**
- Create: `src/components/landing/LandingIntro.jsx`
- Create: `src/components/landing/LandingIntro.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

- [ ] **Step 1:** Add the `landing.intro` namespace to `src/locales/en.json`. Locate the closing `}` of the file. Just before the final `}`, insert (preceded by a comma after the previous top-level key):

```json
  "landing": {
    "intro": {
      "eyebrow": "01 · MISSION",
      "headline": "We engineer the operating systems of urban mobility.",
      "body": "Dochak builds the platforms that move cities — autonomous fleets, digital twins, traffic intelligence, and the people trained to run them. Our work spans Korea, the Middle East, Australia, and Southeast Asia. We believe smarter cities are built one system at a time, and that every line of code should serve the streets it runs on."
    }
  }
```

If the file already has top-level keys, ensure the comma after the previous closing `}` is in place. The JSON must remain valid (run a syntax check after editing).

- [ ] **Step 2:** Add the identical `landing.intro` block to `src/locales/ko.json` (same English strings — Korean translation is a follow-up). Insert in the same structural position.

- [ ] **Step 3:** Create `src/components/landing/LandingIntro.jsx` with these exact contents:

```jsx
import React, { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingIntro.css';

const LandingIntro = () => {
  const { t } = useContext(LanguageContext);

  return (
    <SectionShell tone="base" ariaLabel={t('landing.intro.eyebrow')}>
      <div className="landing-intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.intro.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.intro.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-intro__body">{t('landing.intro.body')}</p>
        </AnimatedElement>
      </div>
    </SectionShell>
  );
};

export default LandingIntro;
```

- [ ] **Step 4:** Create `src/components/landing/LandingIntro.css` with these exact contents:

```css
.landing-intro {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.landing-intro .landing-heading {
  margin-left: auto;
  margin-right: auto;
  max-width: 18ch;
}

.landing-intro__body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 60ch;
}
```

- [ ] **Step 5:** Verify the JSON files are still valid:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

Expected: `JSON valid`. If it errors, fix the comma/brace issue before continuing.

- [ ] **Step 6:** Commit:

```bash
git add src/components/landing/LandingIntro.jsx src/components/landing/LandingIntro.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add intro section with mission copy"
```

---

## Task 7: Section 6 — LandingCTA

**Files:**
- Create: `src/components/landing/LandingCTA.jsx`
- Create: `src/components/landing/LandingCTA.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

Built before sections 2-5 because it shares the centered-text primitive with Intro and closes the loop visually — a useful structural checkpoint.

- [ ] **Step 1:** Add the `landing.cta` namespace to the existing `"landing": {...}` block in `src/locales/en.json`. Inside the existing `"landing"` object, after `"intro": { ... }`, add a comma then:

```json
    "cta": {
      "eyebrow": "06 · GET IN TOUCH",
      "headline": "Let's build smarter cities together.",
      "body": "Whether you're scoping a digital twin, a tele-driving pilot, or training your engineering team — we'd like to hear about it.",
      "button": "Get in Touch →",
      "emailLine": "Or email us at",
      "email": "info@dochak.com"
    }
```

- [ ] **Step 2:** Mirror the same block into `src/locales/ko.json` (same English strings).

- [ ] **Step 3:** Create `src/components/landing/LandingCTA.jsx` with these exact contents:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingCTA.css';

const LandingCTA = () => {
  const { t } = useContext(LanguageContext);
  const email = t('landing.cta.email');

  return (
    <SectionShell tone="base" ariaLabel={t('landing.cta.eyebrow')}>
      <div className="landing-cta">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.cta.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.cta.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-cta__body">{t('landing.cta.body')}</p>
        </AnimatedElement>
        <AnimatedElement delay={600}>
          <Link to="/get-in-touch" className="landing-cta__button">
            {t('landing.cta.button')}
          </Link>
        </AnimatedElement>
        <AnimatedElement delay={800}>
          <p className="landing-cta__email-line">
            {t('landing.cta.emailLine')}{' '}
            <a href={`mailto:${email}`} className="landing-cta__email">{email}</a>.
          </p>
        </AnimatedElement>
      </div>
    </SectionShell>
  );
};

export default LandingCTA;
```

- [ ] **Step 4:** Create `src/components/landing/LandingCTA.css` with these exact contents:

```css
.landing-cta {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.landing-cta .landing-heading {
  margin-left: auto;
  margin-right: auto;
}

.landing-cta__body {
  margin: 0 0 32px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 60ch;
}

.landing-cta__button {
  display: inline-block;
  padding: 14px 32px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border: 1px solid var(--accent-cyan);
  border-radius: 4px;
  transition: background-color 200ms ease, transform 200ms ease;
  animation: landingBreathe 2400ms ease-in-out infinite;
}

.landing-cta__button:hover {
  background-color: rgba(87, 188, 235, 0.08);
  transform: translateY(-2px);
}

.landing-cta__button:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}

.landing-cta__email-line {
  margin: 24px 0 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.landing-cta__email {
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--text-muted);
  transition: color 200ms ease, border-color 200ms ease;
}

.landing-cta__email:hover {
  color: var(--accent-cyan);
  border-color: var(--accent-cyan);
}

@media (prefers-reduced-motion: reduce) {
  .landing-cta__button {
    animation: none;
  }
}
```

- [ ] **Step 5:** Verify JSON validity:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

Expected: `JSON valid`.

- [ ] **Step 6:** Commit:

```bash
git add src/components/landing/LandingCTA.jsx src/components/landing/LandingCTA.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add CTA section with email and route link"
```

---

## Task 8: Section 2 — LandingSolutions

**Files:**
- Create: `src/components/landing/LandingSolutions.jsx`
- Create: `src/components/landing/LandingSolutions.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

- [ ] **Step 1:** Add the `landing.solutions` namespace inside the existing `"landing"` block in `src/locales/en.json`:

```json
    "solutions": {
      "eyebrow": "02 · SOLUTIONS",
      "headline": "Six platforms. One vision.",
      "body": "Our suite covers the full mobility stack — from the cars in motion to the cities they navigate to the engineers who keep the systems running.",
      "viewAll": "View all solutions →",
      "cards": {
        "remoteDriving":         { "title": "Remote Driving",         "body": "Tele-driving for fleets and fail-safe vehicle handoff." },
        "digitalTwin":           { "title": "Digital Twin",           "body": "Real-time 3D mirrors of city traffic and infrastructure." },
        "multimodalSimulator":   { "title": "Multimodal Simulator",   "body": "Test autonomous behavior across cars, buses, drones, and pedestrians." },
        "trafficAnalysisTools":  { "title": "Traffic Analysis Tools", "body": "Volume, flow, and signal-timing analytics for transport authorities." },
        "visualization":         { "title": "Visualization",          "body": "Geospatial dashboards and decision-support displays." },
        "vrRoadDesign":          { "title": "VR Road Design",         "body": "Immersive design reviews for new roads before they're built." }
      }
    }
```

- [ ] **Step 2:** Mirror the same block to `src/locales/ko.json`.

- [ ] **Step 3:** Create `src/components/landing/LandingSolutions.jsx` with these exact contents:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingSolutions.css';

const SOLUTIONS = [
  { key: 'remoteDriving',        slug: 'remote-driving' },
  { key: 'digitalTwin',          slug: 'digital-twin' },
  { key: 'multimodalSimulator',  slug: 'multimodal-simulator' },
  { key: 'trafficAnalysisTools', slug: 'traffic-analysis-tools' },
  { key: 'visualization',        slug: 'visualization' },
  { key: 'vrRoadDesign',         slug: 'vr-road-design' },
];

const LandingSolutions = () => {
  const { t } = useContext(LanguageContext);

  return (
    <SectionShell tone="lift" ariaLabel={t('landing.solutions.eyebrow')}>
      <div className="landing-solutions__intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.solutions.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.solutions.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-solutions__body">{t('landing.solutions.body')}</p>
        </AnimatedElement>
      </div>

      <div className="landing-solutions__grid">
        {SOLUTIONS.map((sol, i) => (
          <AnimatedElement key={sol.key} delay={600 + i * 100} className="landing-solutions__card-wrap">
            <Link
              to={`/solutions/${sol.slug}`}
              className="landing-solutions__card"
              aria-label={t(`landing.solutions.cards.${sol.key}.title`)}
            >
              <h3 className="landing-solutions__card-title">
                {t(`landing.solutions.cards.${sol.key}.title`)}
              </h3>
              <p className="landing-solutions__card-body">
                {t(`landing.solutions.cards.${sol.key}.body`)}
              </p>
              <span className="landing-solutions__card-arrow" aria-hidden="true">→</span>
            </Link>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement delay={1300} className="landing-solutions__viewall-wrap">
        <Link to="/solutions" className="landing-solutions__viewall">
          {t('landing.solutions.viewAll')}
        </Link>
      </AnimatedElement>
    </SectionShell>
  );
};

export default LandingSolutions;
```

- [ ] **Step 4:** Create `src/components/landing/LandingSolutions.css` with these exact contents:

```css
.landing-solutions__intro {
  max-width: 720px;
  margin-bottom: 64px;
}

.landing-solutions__body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 60ch;
}

.landing-solutions__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 1023px) {
  .landing-solutions__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .landing-solutions__grid {
    grid-template-columns: 1fr;
  }
}

.landing-solutions__card-wrap {
  display: block;
}

.landing-solutions__card {
  position: relative;
  display: block;
  padding: 32px 24px 64px 24px;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease, background-color 200ms ease;
}

.landing-solutions__card:hover {
  border-color: rgba(87, 188, 235, 0.4);
  box-shadow: 0 0 24px rgba(87, 188, 235, 0.15);
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.03);
}

.landing-solutions__card:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}

.landing-solutions__card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.landing-solutions__card-body {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary);
}

.landing-solutions__card-arrow {
  position: absolute;
  right: 24px;
  bottom: 24px;
  color: var(--accent-cyan);
  font-size: 18px;
  transition: transform 200ms ease;
}

.landing-solutions__card:hover .landing-solutions__card-arrow {
  transform: translateX(4px);
}

.landing-solutions__viewall-wrap {
  margin-top: 48px;
  text-align: right;
}

.landing-solutions__viewall {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(87, 188, 235, 0.3);
  padding-bottom: 4px;
  transition: border-color 200ms ease;
}

.landing-solutions__viewall:hover {
  border-bottom-color: var(--accent-cyan);
}
```

- [ ] **Step 5:** Verify JSON validity:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

- [ ] **Step 6:** Commit:

```bash
git add src/components/landing/LandingSolutions.jsx src/components/landing/LandingSolutions.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add solutions section with 6-card grid"
```

---

## Task 9: Section 4 — LandingTraining

**Files:**
- Create: `src/components/landing/LandingTraining.jsx`
- Create: `src/components/landing/LandingTraining.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

- [ ] **Step 1:** Add the `landing.training` namespace inside the existing `"landing"` block in `src/locales/en.json`:

```json
    "training": {
      "eyebrow": "04 · TRAINING",
      "headline": "Build the team that builds the city.",
      "body": "We don't just deploy systems — we teach engineers and transport planners how to design, run, and maintain them. Our PTV-certified courses run year-round in Korea and on-site internationally.",
      "viewAll": "View all courses →",
      "badge": {
        "label": "Certified Training Partner",
        "title": "PTV"
      },
      "courses": [
        { "code": "PTV-V01",  "title": "VISSIM Microscopic Simulation" },
        { "code": "PTV-V02",  "title": "Visum Network Modelling" },
        { "code": "DOC-001",  "title": "Digital Twin Foundations" }
      ]
    }
```

- [ ] **Step 2:** Mirror to `src/locales/ko.json`.

- [ ] **Step 3:** Create `src/components/landing/LandingTraining.jsx` with these exact contents:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingTraining.css';

const LandingTraining = () => {
  const { t } = useContext(LanguageContext);
  const courses = t('landing.training.courses');
  const courseList = Array.isArray(courses) ? courses : [];

  return (
    <SectionShell tone="lift" ariaLabel={t('landing.training.eyebrow')}>
      <div className="landing-training">

        <div className="landing-training__text">
          <AnimatedElement delay={0}>
            <SectionEyebrow text={t('landing.training.eyebrow')} />
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <SectionHeading>{t('landing.training.headline')}</SectionHeading>
          </AnimatedElement>
          <AnimatedElement delay={400}>
            <p className="landing-training__body">{t('landing.training.body')}</p>
          </AnimatedElement>

          <AnimatedElement delay={600}>
            <div className="landing-training__badge">
              <span className="landing-training__badge-label">
                {t('landing.training.badge.label')}
              </span>
              <span className="landing-training__badge-title">
                {t('landing.training.badge.title')}
              </span>
            </div>
          </AnimatedElement>
        </div>

        <div className="landing-training__courses">
          {courseList.map((course, i) => (
            <AnimatedElement key={course.code} delay={400 + i * 100}>
              <div className="landing-training__course">
                <span className="landing-training__course-code">{course.code}</span>
                <span className="landing-training__course-title">{course.title}</span>
              </div>
            </AnimatedElement>
          ))}
          <AnimatedElement delay={400 + courseList.length * 100}>
            <Link to="/training" className="landing-training__viewall">
              {t('landing.training.viewAll')}
            </Link>
          </AnimatedElement>
        </div>

      </div>
    </SectionShell>
  );
};

export default LandingTraining;
```

The `t()` function in `LanguageContext` returns whatever value it finds in the JSON — for `landing.training.courses` that's an array. The `Array.isArray` guard handles the edge case where the key isn't found (fallback returns the key string).

- [ ] **Step 4:** Create `src/components/landing/LandingTraining.css` with these exact contents:

```css
.landing-training {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

@media (max-width: 900px) {
  .landing-training {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.landing-training__text {
  max-width: 480px;
}

.landing-training__body {
  margin: 0 0 32px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.landing-training__badge {
  display: inline-flex;
  flex-direction: column;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(87, 188, 235, 0.15);
}

.landing-training__badge-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.landing-training__badge-title {
  font-size: 36px;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--accent-cyan);
}

.landing-training__courses {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.landing-training__course {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: border-color 200ms ease, background-color 200ms ease;
}

.landing-training__course:hover {
  border-color: rgba(87, 188, 235, 0.3);
  background: rgba(255, 255, 255, 0.03);
}

.landing-training__course-code {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
}

.landing-training__course-title {
  font-size: 15px;
  font-weight: 400;
  color: var(--text-primary);
}

.landing-training__viewall {
  margin-top: 16px;
  align-self: flex-end;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(87, 188, 235, 0.3);
  padding-bottom: 4px;
  transition: border-color 200ms ease;
}

.landing-training__viewall:hover {
  border-bottom-color: var(--accent-cyan);
}
```

- [ ] **Step 5:** Verify JSON validity:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

- [ ] **Step 6:** Commit:

```bash
git add src/components/landing/LandingTraining.jsx src/components/landing/LandingTraining.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add training section with course list and PTV badge"
```

---

## Task 10: Section 3 — LandingProjects

**Files:**
- Create: `src/components/landing/LandingProjects.jsx`
- Create: `src/components/landing/LandingProjects.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

- [ ] **Step 1:** Add the `landing.projects` namespace inside the existing `"landing"` block in `src/locales/en.json`:

```json
    "projects": {
      "eyebrow": "03 · PROJECTS",
      "headline": "Real cities running on Dochak.",
      "body": "We don't write white papers — we ship infrastructure. These are live deployments operating today.",
      "viewAll": "View all projects →",
      "viewCase": "View case study →",
      "items": [
        {
          "title": "Naepo Digital Twin",
          "body": "Korea's first full-scale municipal digital twin. Real-time traffic, environmental, and infrastructure data for a 15 km² administrative city.",
          "anchor": "#naepo-digital-twin"
        },
        {
          "title": "Daejeon–Jeju Tele-driving",
          "body": "Commercial-grade remote driving across 460 km of intercity routes. Demonstrated fail-safe handoff at highway speeds.",
          "anchor": "#daejeon-jeju-tele-driving"
        },
        {
          "title": "Incheon Airport Parking",
          "body": "Autonomous valet system handling 23,000 vehicles per day in Korea's busiest air gateway.",
          "anchor": "#incheon-airport-parking"
        }
      ]
    }
```

- [ ] **Step 2:** Mirror to `src/locales/ko.json`.

- [ ] **Step 3:** Create `src/components/landing/LandingProjects.jsx` with these exact contents:

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import naepoImg from '../../assets/nepo.webp';
import teleImg from '../../assets/teledriving.webp';
import airportImg from '../../assets/automob.webp';
import './LandingProjects.css';

const IMAGES = [naepoImg, teleImg, airportImg];

const LandingProjects = () => {
  const { t } = useContext(LanguageContext);
  const items = t('landing.projects.items');
  const projectList = Array.isArray(items) ? items : [];

  return (
    <SectionShell tone="deep" ariaLabel={t('landing.projects.eyebrow')}>
      <div className="landing-projects__intro">
        <AnimatedElement delay={0}>
          <SectionEyebrow text={t('landing.projects.eyebrow')} />
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <SectionHeading>{t('landing.projects.headline')}</SectionHeading>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className="landing-projects__body">{t('landing.projects.body')}</p>
        </AnimatedElement>
      </div>

      <div className="landing-projects__list">
        {projectList.map((project, i) => (
          <AnimatedElement key={project.anchor || i} delay={200 + i * 150}>
            <article
              className={`landing-projects__item ${i % 2 === 1 ? 'is-reversed' : ''}`}
            >
              <div className="landing-projects__item-image">
                <img
                  src={IMAGES[i]}
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              <div className="landing-projects__item-text">
                <h3 className="landing-projects__item-title">{project.title}</h3>
                <p className="landing-projects__item-body">{project.body}</p>
                <Link
                  to={`/projects${project.anchor || ''}`}
                  className="landing-projects__item-link"
                >
                  {t('landing.projects.viewCase')}
                </Link>
              </div>
            </article>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement delay={800} className="landing-projects__viewall-wrap">
        <Link to="/projects" className="landing-projects__viewall">
          {t('landing.projects.viewAll')}
        </Link>
      </AnimatedElement>
    </SectionShell>
  );
};

export default LandingProjects;
```

- [ ] **Step 4:** Create `src/components/landing/LandingProjects.css` with these exact contents:

```css
.landing-projects__intro {
  max-width: 720px;
  margin-bottom: 64px;
}

.landing-projects__body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 60ch;
}

.landing-projects__list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.landing-projects__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.landing-projects__item.is-reversed {
  direction: rtl;
}

.landing-projects__item.is-reversed > * {
  direction: ltr;
}

@media (max-width: 900px) {
  .landing-projects__item,
  .landing-projects__item.is-reversed {
    grid-template-columns: 1fr;
    gap: 24px;
    direction: ltr;
  }
}

.landing-projects__item-image {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid rgba(87, 188, 235, 0.3);
  border-radius: 8px;
  transition: border-color 200ms ease;
}

.landing-projects__item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7) brightness(0.85);
  transition: filter 400ms ease, transform 400ms ease;
}

.landing-projects__item:hover .landing-projects__item-image {
  border-color: var(--accent-cyan);
}

.landing-projects__item:hover .landing-projects__item-image img {
  filter: saturate(1) brightness(1);
  transform: scale(1.02);
}

.landing-projects__item-title {
  margin: 0 0 16px 0;
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.landing-projects__item-body {
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.landing-projects__item-link {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(87, 188, 235, 0.3);
  padding-bottom: 4px;
  transition: border-color 200ms ease;
}

.landing-projects__item-link:hover {
  border-bottom-color: var(--accent-cyan);
}

.landing-projects__viewall-wrap {
  margin-top: 64px;
  text-align: right;
}

.landing-projects__viewall {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(87, 188, 235, 0.3);
  padding-bottom: 4px;
}

.landing-projects__viewall:hover {
  border-bottom-color: var(--accent-cyan);
}
```

- [ ] **Step 5:** Verify JSON validity:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

- [ ] **Step 6:** Commit:

```bash
git add src/components/landing/LandingProjects.jsx src/components/landing/LandingProjects.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add projects section with 3 case studies"
```

---

## Task 11: Section 5 — LandingAbout

**Files:**
- Create: `src/components/landing/LandingAbout.jsx`
- Create: `src/components/landing/LandingAbout.css`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ko.json`

The most complex section. Includes a 4-card stat row with count-up animation triggered by `useScrollAnimation`, and a dotted-map region indicator.

- [ ] **Step 1:** Add the `landing.about` namespace inside the existing `"landing"` block in `src/locales/en.json`:

```json
    "about": {
      "eyebrow": "05 · ABOUT",
      "headline": "A KAIST spin-off, building real cities.",
      "body": "Dochak was spun out of KAIST in 2024 by transport engineers and AI researchers with deep roots in Korea's smart-mobility ecosystem. We work directly with municipal authorities, airport operators, and OEMs across Korea, the Middle East, Australia, and Southeast Asia.",
      "stats": [
        { "value": "15",   "label": "Team" },
        { "value": "4",    "label": "Projects" },
        { "value": "4",    "label": "Regions" },
        { "value": "2024", "label": "Founded" }
      ],
      "meetTeam": "Meet the team →",
      "regionLabel": "Active deployments"
    }
```

- [ ] **Step 2:** Mirror to `src/locales/ko.json`.

- [ ] **Step 3:** Create `src/components/landing/LandingAbout.jsx` with these exact contents:

```jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import DottedMap from 'dotted-map';
import SectionShell from './atoms/SectionShell';
import SectionEyebrow from './atoms/SectionEyebrow';
import SectionHeading from './atoms/SectionHeading';
import AnimatedElement from './atoms/AnimatedElement';
import './LandingAbout.css';

const REGION_DOTS = [
  { lat: 36.5, lng: 127.5, label: 'Korea' },
  { lat: 24.5, lng: 54.4,  label: 'Middle East (UAE)' },
  { lat: -33.9, lng: 151.2, label: 'Australia' },
  { lat: 1.35, lng: 103.8, label: 'Southeast Asia' },
];

const StatCounter = ({ value, label, delay = 0 }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isVisible) return;
    const numericMatch = String(value).match(/^(\d+)(.*)$/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    const target = parseInt(numericMatch[1], 10);
    const suffix = numericMatch[2] || '';
    const duration = 1200;
    const startTime = performance.now() + delay;
    let rafId;

    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - startTime) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(`${Math.floor(target * eased)}${suffix}`);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setDisplayValue(value);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, value, delay]);

  return (
    <div ref={elementRef} className="landing-about__stat">
      <span className="landing-about__stat-value">{displayValue}</span>
      <span className="landing-about__stat-label">{label}</span>
    </div>
  );
};

const LandingAbout = () => {
  const { t } = useContext(LanguageContext);
  const stats = t('landing.about.stats');
  const statList = Array.isArray(stats) ? stats : [];

  // Render the dotted world map as an SVG once on mount.
  const mapSvg = React.useMemo(() => {
    const map = new DottedMap({ height: 60, grid: 'diagonal' });
    REGION_DOTS.forEach((d) => {
      map.addPin({ lat: d.lat, lng: d.lng, svgOptions: { color: '#57bceb', radius: 0.6 } });
    });
    return map.getSVG({
      radius: 0.22,
      color: 'rgba(255,255,255,0.18)',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  return (
    <SectionShell tone="base" ariaLabel={t('landing.about.eyebrow')}>
      <div className="landing-about">

        <div className="landing-about__text">
          <AnimatedElement delay={0}>
            <SectionEyebrow text={t('landing.about.eyebrow')} />
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <SectionHeading>{t('landing.about.headline')}</SectionHeading>
          </AnimatedElement>
          <AnimatedElement delay={400}>
            <p className="landing-about__body">{t('landing.about.body')}</p>
          </AnimatedElement>

          <div className="landing-about__stats">
            {statList.map((stat, i) => (
              <AnimatedElement key={stat.label} delay={600 + i * 100}>
                <StatCounter value={stat.value} label={stat.label} delay={i * 100} />
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement delay={1100}>
            <Link to="/team" className="landing-about__meetteam">
              {t('landing.about.meetTeam')}
            </Link>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={400} className="landing-about__map-wrap">
          <div className="landing-about__map-label">
            {t('landing.about.regionLabel')}
          </div>
          <div
            className="landing-about__map"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: mapSvg }}
          />
        </AnimatedElement>

      </div>
    </SectionShell>
  );
};

export default LandingAbout;
```

The `StatCounter` is internal to this file because no other section uses it. It reads its starting trigger via `useScrollAnimation` (same hook used elsewhere) and runs a `requestAnimationFrame` count-up with ease-out cubic. Strings like `"15"`, `"4"`, `"2024"` count up numerically; non-numeric prefixes/suffixes are preserved.

- [ ] **Step 4:** Create `src/components/landing/LandingAbout.css` with these exact contents:

```css
.landing-about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 900px) {
  .landing-about {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.landing-about__text {
  max-width: 560px;
}

.landing-about__body {
  margin: 0 0 48px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.landing-about__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

@media (max-width: 640px) {
  .landing-about__stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.landing-about__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.landing-about__stat-value {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: var(--accent-cyan);
  line-height: 1;
}

.landing-about__stat-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.landing-about__meetteam {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(87, 188, 235, 0.3);
  padding-bottom: 4px;
  transition: border-color 200ms ease;
}

.landing-about__meetteam:hover {
  border-bottom-color: var(--accent-cyan);
}

.landing-about__map-wrap {
  width: 100%;
}

.landing-about__map-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.landing-about__map {
  width: 100%;
  max-width: 480px;
}

.landing-about__map svg {
  width: 100%;
  height: auto;
}
```

- [ ] **Step 5:** Verify JSON validity:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/ko.json', 'utf8')); console.log('JSON valid');"
```

- [ ] **Step 6:** Run all tests to make sure nothing else broke:

```bash
CI=true npm test -- --watchAll=false
```

Expected: all previously-passing tests still pass. (App.test.js may still fail with its pre-existing `react-router-dom` resolution issue — that's not new and is documented in the hero plan's Task 12.)

- [ ] **Step 7:** Commit:

```bash
git add src/components/landing/LandingAbout.jsx src/components/landing/LandingAbout.css src/locales/en.json src/locales/ko.json
git commit -m "feat(landing): add about section with stat counters and region map"
```

---

## Task 12: Wire into App.js + browser verification

**Files:**
- Modify: `src/App.js`

- [ ] **Step 1:** Open `src/App.js`. Locate the line:

```jsx
import HeroVideo from './components/HeroVideo';
```

Replace it with six new imports plus the existing one:

```jsx
import HeroVideo from './components/HeroVideo';
import LandingIntro from './components/landing/LandingIntro';
import LandingSolutions from './components/landing/LandingSolutions';
import LandingProjects from './components/landing/LandingProjects';
import LandingTraining from './components/landing/LandingTraining';
import LandingAbout from './components/landing/LandingAbout';
import LandingCTA from './components/landing/LandingCTA';
```

- [ ] **Step 2:** Find the `HomePage` component's return block:

```jsx
return (
  <main id="main">
    {/* Section 1: Video Hero */}
    <HeroVideo />
  </main>
);
```

Replace it with:

```jsx
return (
  <main id="main">
    <HeroVideo />
    <LandingIntro />
    <LandingSolutions />
    <LandingProjects />
    <LandingTraining />
    <LandingAbout />
    <LandingCTA />
  </main>
);
```

- [ ] **Step 3:** Run a production build to confirm everything compiles:

```bash
npm run build 2>&1 | tail -5
```

Expected: `Compiled successfully` or `Compiled with warnings` (pre-existing warnings in unrelated files are fine — see hero plan Task 12). The build must complete with exit code 0.

- [ ] **Step 4:** Start the dev server (if it isn't already running on port 3030 via launch.json):

```bash
BROWSER=none PORT=3030 npm start &
```

Wait ~15 seconds for compile, then verify it responds:

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3030
```

Expected: `HTTP 200`.

- [ ] **Step 5:** Open `http://localhost:3030` in a browser. Scroll through the full homepage and verify in order:

| Section | What to check |
|---|---|
| Hero | Plays as before, no regression |
| 1 Intro | Centered text, fades in on scroll |
| 2 Solutions | 3-column grid (1-col on mobile), 6 cards, hover lifts each card |
| 3 Projects | 3 case studies, alternating left/right, images appear with cyan border |
| 4 Training | PTV badge on left, 3 course cards on right |
| 5 About | 4-stat row counts up from 0, dotted map on right |
| 6 CTA | Cyan-bordered button breathes; clicking it routes to `/get-in-touch` |

Resize to mobile (375px width) and confirm each section stacks to a single column.

- [ ] **Step 6:** If everything looks correct, commit:

```bash
git add src/App.js
git commit -m "feat(landing): wire six landing sections into homepage"
```

If something looks wrong, stop and report it before committing — fix in a separate commit.

---

## Task 13: Final sanity check

**Files:** none (verification only).

- [ ] **Step 1:** Confirm the working tree is clean:

```bash
git status
```

Expected: only `.claude/settings.local.json` and `.claude/launch.json` may show as modified/untracked (those are harness internal).

- [ ] **Step 2:** Confirm the commit history is coherent:

```bash
git log --oneline -15
```

Expected: a series of `feat(landing): ...` commits since the spec commit, in roughly the order of the tasks above.

- [ ] **Step 3:** Run all unit tests:

```bash
CI=true npm test -- --watchAll=false
```

Expected: all HeroVideo, SectionShell, and LanguageContext tests pass. App.test.js may still fail with its pre-existing `react-router-dom` resolution issue — acceptable per hero plan Task 12.

- [ ] **Step 4:** Run a production build one more time:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 5:** Done. The landing page is complete.

---

## Spec coverage check

Mapping spec sections → tasks:

- §2.1 Tonal palette → Task 1 (CSS custom properties)
- §2.2 Typography → Tasks 1, 4 (SectionHeading), 5 (AnimatedElement defaults)
- §2.3 Section shell → Task 2 (SectionShell atom)
- §2.4 Motion language → Task 5 (AnimatedElement reusing `useScrollAnimation`)
- §2.5 Layout primitives → Centered text (Tasks 6, 7), grid (Task 8), asymmetric split (Tasks 9, 10, 11)
- §2.6 Atoms → Tasks 2, 3, 4, 5
- §3.1 Intro → Task 6
- §3.2 Solutions → Task 8
- §3.3 Projects → Task 10
- §3.4 Training → Task 9
- §3.5 About + Stats → Task 11
- §3.6 CTA → Task 7
- §4 Component structure → Tasks 1–11 file paths match
- §4.2 Integration → Task 12
- §5 i18n → embedded in Tasks 6–11
- §6 Performance → Image lazy-loading via `loading="lazy"` in Task 10; no new web fonts in Task 1
- §7 Implementation order → Tasks 1–12 follow the prescribed sequence
- §8 Out of scope → not implemented (correctly omitted)
- §9 Open questions → all resolved before plan; baked into spec/Task content

All spec sections are covered.
