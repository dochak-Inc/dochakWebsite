# Dochak website

The company website for **Dochak**, a mobility and traffic-simulation company. Live at **https://dochak.com**.

Built with React 19 (Create React App), React Router and three.js, in Korean and English. Deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

## Run locally

```bash
git clone https://github.com/dochak-Inc/dochakWebsite.git
cd dochakWebsite
npm install
PORT=3030 npm start     # http://localhost:3030
npm run build           # production build in build/
```

## Pages

| Page | Source |
|---|---|
| Home (landing sections) | `src/App.js`, `src/components/landing/` |
| About, Team, Contact | `src/About.js`, `src/Team.js`, `src/GetInTouch.js` |
| Solutions (Nexus, Prism, Vista, digital twin, simulators, remote driving) | `src/Solutions.js`, `src/Solutions/` |
| Projects | `src/components/ProjectsPage.js` |
| News, Training, Disclosure | `src/News.js`, `src/NewsArticle.js`, `src/Training.js`, `src/components/CourseDetail.js`, `src/Disclosure.js` |

## Editing text

All interface text is in `src/locales/en.json` and `src/locales/ko.json` (course content is in `src/courseData.js` and `src/courseData_ko.js`).

Only change the string values. Keep every key and the JSON structure as they are:

```json
"home.title": "Hello from Dochak"
```

Then commit to `main`; the site redeploys automatically.
