# QuizWiz — Quiz App

An Angular 21 single-page application for creating, delivering and grading online quizzes. It serves two roles from one codebase: **Instructors** manage groups, students, question banks, quizzes and results, while **Students** join quizzes with a code, answer them in a timed stepper and review their results.

The app is fully bilingual (English / Arabic with RTL support), themed with PrimeNG, and talks to the hosted Upskilling Egypt quiz API.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment configuration](#environment-configuration)
- [Project structure](#project-structure)
- [Routing & access control](#routing--access-control)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [Theming & styles](#theming--styles)
- [API endpoints used](#api-endpoints-used)
- [Deployment](#deployment)

---

## Features

### Authentication
- Register as an Instructor or a Student
- Login with a JWT persisted in `localStorage`; the session is restored on app start
- Forgot password → OTP reset password flow
- Change password for signed-in users

### Instructor
- **Dashboard** — overview widgets: upcoming quizzes, completed quizzes, top students
- **Groups** — create, edit, view and delete groups; assign students
- **Students** — list all students or students without a group; view, edit and remove a student
- **Questions** — question bank with create, edit, view, delete and search
- **Quizzes** — create and update quizzes, view details, delete, and share the generated **quiz code** through a dialog
- **Results** — list quiz results and drill into a single result

### Student (Learner)
- **Home** — welcome card and upcoming quiz cards
- **Join a quiz** by entering the instructor's quiz code
- **Quiz stepper** — question-by-question navigation with a live countdown timer, auto-submit when time runs out, and **progress saved to `localStorage`** so an accidental refresh does not lose answers
- **Success dialog** on submission
- **Results** — list of completed quizzes and per-quiz result details

### Cross-cutting
- English / Arabic language switcher with automatic `dir="rtl"` swap and per-language fonts
- Role-aware navigation, sidebar and profile dropdown
- Shared loader, empty-state, delete-confirmation and not-found components
- Global HTTP interceptors: base-URL + bearer-token injection, and automatic logout on `401`

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Angular 21 (standalone components, signals, lazy-loaded routes) |
| Language | TypeScript 5.9 |
| UI kit | PrimeNG 21 + PrimeIcons + PrimeFlex |
| Styling | SCSS with CSS custom properties, custom `QuizPreset` PrimeNG theme |
| i18n | `@ngx-translate/core` + `@ngx-translate/http-loader` |
| HTTP / state | `HttpClient`, RxJS 7.8, Angular signals |
| Auth | `jwt-decode`, `localStorage` token store |
| Dates | `date-fns` |
| Testing | Vitest (via `@angular/build:unit-test`) + jsdom |
| Formatting | Prettier |

---

## Getting started

### Prerequisites
- Node.js 20+ (Angular 21 requirement)
- npm 10.9.4 (pinned via `packageManager`)

### Install

```bash
git clone https://github.com/esraaabuhalawa/Quiz-app.git
cd Quiz-app
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is used here (and in the Vercel install command) because of peer-range mismatches between the Angular 21 and PrimeNG 21 packages.

### Run the dev server

```bash
npm start          # or: ng serve
```

Open <http://localhost:4200/>. The app reloads on every source change.

### Build for production

```bash
npm run build
```

Artifacts are emitted to `dist/quiz-app/browser`.

---

## Available scripts

| Script | What it does |
| --- | --- |
| `npm start` | Dev server on `localhost:4200` (development configuration) |
| `npm run build` | Production build into `dist/` |
| `npm run watch` | Rebuild on change using the development configuration |
| `npm test` | Run unit tests with Vitest |
| `npm run ng -- <cmd>` | Any Angular CLI command, e.g. `npm run ng -- generate component foo` |

---

## Environment configuration

Two files live under `src/environments/`:

```ts
// src/environments/environment.ts             (production)
// src/environments/environment.development.ts (development)
export const environment = {
  production: false,
  apiUrl: 'https://upskilling-egypt.com:3005/api/',
  assetUrl: 'https://upskilling-egypt.com:3005/',
  appName: 'Quiz-app',
};
```

`angular.json` swaps `environment.ts` for `environment.development.ts` in the development configuration. Services call **relative** paths (`quiz`, `group`, `auth/login`, …) — `generalInterceptor` prefixes them with `environment.apiUrl` and attaches the bearer token.

---

## Project structure

```
src/
├─ app/
│  ├─ core/                     # app-wide singletons
│  │  ├─ enum/role.enum.ts      # RoleEnum (Instructor | Student), UserStatus
│  │  ├─ guards/                # authGuard, roleGuard, homeRedirectGuard
│  │  ├─ interceptors/          # general (baseUrl + token), error (401 → logout)
│  │  ├─ interfaces/            # shared API response models
│  │  ├─ services/              # LanguageService
│  │  ├─ theme/QuizPreset.ts    # PrimeNG theme preset
│  │  └─ translation/           # TranslateUniversalLoader (+ TransferState cache)
│  │
│  ├─ features/
│  │  ├─ auth/                  # login, register, forgot/reset/change password
│  │  │  └─ services/           # AuthService, AuthStoreService, TokenService, initializeSession
│  │  └─ dashboard/
│  │     ├─ instructor/
│  │     │  ├─ components/instructor-home
│  │     │  └─ modules/         # group | students | questions | quizzes | results
│  │     └─ learner/
│  │        ├─ components/      # learner-home, welcome-card, upcoming-quiz-card
│  │        └─ modules/         # learner-quiz (join + stepper) | learner-results
│  │
│  ├─ shared/
│  │  ├─ components/            # auth form-field, dashboard widgets, loader,
│  │  │                         # empty-state, delete dialog, language-switcher,
│  │  │                         # profile-dropdown, not-found
│  │  ├─ layouts/               # auth-layout, dashboard-layout (navbar + sidebar), page-layout
│  │  └─ enums/ interfaces/ validators/
│  │
│  ├─ app.config.ts             # providers: router, http + interceptors, translate, PrimeNG, session init
│  ├─ app.routes.ts             # root routes
│  └─ app.ts · app.html · app.scss
│
├─ assets/                      # fonts.scss, menu.scss, table.scss
├─ environments/
└─ index.html · main.ts · styles.scss

public/
├─ i18n/{en,ar}.json            # translation dictionaries
├─ fonts/{Inter,Nunito,Tajawal}
└─ images/ · favicon.ico
```

Each feature module follows the same shape: `components/`, `interfaces/`, `services/`, and a `*.routes.ts` file that is lazy-loaded.

---

## Routing & access control

Root routes (`src/app/app.routes.ts`):

| Path | Guard | Notes |
| --- | --- | --- |
| `/` | — | redirects to `/auth/login` |
| `/auth/*` | — | login, register, forgot-password, reset-password, change-password |
| `/dashboard/*` | `authGuard` | lazy-loads `DASHBOARD_ROUTES` inside `DashboardLayout` |
| `/current-quiz/:id` | `authGuard` + `roleGuard([Student])` | full-screen quiz stepper |
| `**` | — | Not Found page |

Dashboard children:

- `/dashboard` → `homeRedirectGuard` sends the user to their role's home
- `/dashboard/instructor` → `roleGuard([Instructor])` → `''`, `groups`, `students`, `quizzes`, `results`, `questions`
- `/dashboard/learner` → `roleGuard([Student])` → `''`, `quizzes`, `results`, `results/:id`

Route `data.title` values are translation keys (e.g. `navigation.quizzes`) used by the layout header.

---

## Authentication

- `AuthService` handles login, register, logout and the password flows.
- `TokenService` persists `access_token` and `user_profile` in `localStorage`.
- `AuthStoreService` holds the signed-in user as signals (`isAuthenticated()`, `userRole()`), which the guards read.
- `initializeSession()` runs via `provideAppInitializer` and rehydrates the store from `localStorage` on startup, so a refresh keeps the user signed in.
- `errorInterceptor` logs out and redirects to `/auth/login` on any `401` response.

---

## Internationalization

- Dictionaries live in `public/i18n/en.json` and `public/i18n/ar.json`, loaded over HTTP by `TranslateUniversalLoader` and cached in `TransferState`.
- `LanguageService.changeLanguage(lang)` persists the choice under the `lang` key in `localStorage` and sets `document.documentElement.lang` / `dir` (`rtl` for Arabic).
- Fonts switch per language: Nunito / Inter for English, Tajawal / Cairo for Arabic (`--font-en`, `--font-ar`).
- The `language-switcher` shared component exposes this in the UI.

When adding UI text, add the key to **both** `en.json` and `ar.json`.

---

## Theming & styles

- `providePrimeNG` is configured with the custom `QuizPreset` (`src/app/core/theme/QuizPreset.ts`), prefix `p`, and `.dark` as the dark-mode selector.
- Global design tokens (colors, surfaces, text, fonts) are declared as CSS custom properties on `:root` in `src/styles.scss`.
- Component styles are SCSS; shared table / menu / font partials live under `src/assets/`.
- Production budgets: 500 kB warning and 1 MB error for the initial bundle; 4 kB / 8 kB per component stylesheet.

---

## API endpoints used

Base URL: `https://upskilling-egypt.com:3005/api/`

**Auth** — `POST auth/login`, `POST auth/register`, `POST auth/forgot-password`, `POST auth/reset-password`, `POST auth/change-password`

**Quizzes** — `GET quiz`, `GET quiz/:id`, `GET quiz/incomming`, `GET quiz/completed`, `POST quiz`, `PUT quiz/update/:id`, `DELETE quiz/:id`

**Taking a quiz** — `POST quiz/join`, `GET quiz/without-answers/:id`, `POST quiz/submit/:id`

**Results** — `GET quiz/result`

**Questions** — `GET question`, `GET question/:id`, `POST question`, `POST question/search`, `PUT question/:id`, `DELETE question/:id`

**Groups** — `GET group`, `GET group/:id`, `POST group`, `PUT group/:id`, `DELETE group/:id`

**Students** — `GET student`, `GET student/without-group`, `DELETE student/:id`, `DELETE student/:studentId/:groupId`

---

## Deployment

The repo ships a `vercel.json` configured for a Vercel SPA deployment:

```json
{
  "buildCommand": "npm run build -- --configuration=production",
  "outputDirectory": "dist/quiz-app/browser",
  "installCommand": "npm install --legacy-peer-deps",
  "routes": [{ "handle": "filesystem" }, { "src": "/(.*)", "dest": "/index.html" }]
}
```

For any other static host: build with `npm run build`, serve `dist/quiz-app/browser`, and add a rewrite of all unmatched paths to `index.html` so client-side routing survives a page refresh.
