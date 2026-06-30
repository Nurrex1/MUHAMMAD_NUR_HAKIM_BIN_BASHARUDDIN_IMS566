# Assignmo — Your Assignment Planner

Assignmo is a single-page web app for tracking university assignments: due dates, submission status, and progress, all in one dashboard. It's built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no backend.

## Demo Login

```
Email:    admin@example.com
Password: password123
```

Or just click "Login with Google" / "Login with Facebook" on the login screen — both are simulated and log you straight in.

## Features

- **Dashboard** — live clock and date stamp, a countdown timer to your nearest open deadline, completion-rate stats, and an upcoming deadlines list.
- **Charts** — a donut breakdown and a bar chart of assignment status, powered by Chart.js, updating live as data changes.
- **Tables** — a sortable, searchable assignment list with inline actions to mark items submitted or delete them.
- **Board (Kanban)** — drag and drop assignment cards between "In Progress" and "Submitted" columns.
- **Add Assignment** — a modal form to add your own assignments (name, course code, due date, status).
- **Local storage persistence** — everything you add, edit, or move is saved in the browser and survives a page refresh.
- **Dark mode** — a toggle in the header switches the whole interface to a dark theme.
- **Report export** — download a plain-text summary of all tracked assignments.

## Tech Stack

- HTML5
- CSS3 (custom properties / CSS variables for theming, no framework)
- Vanilla JavaScript (ES6+, no dependencies beyond Chart.js)
- [Chart.js 2.9.4](https://www.chartjs.org/) for graphs
- [Font Awesome 5](https://fontawesome.com/) for icons
- Google Fonts: Fraunces (headings) and Inter (body text)

## Project Structure

```
.
├── index.html     # App markup: auth screens, dashboard, charts, table, kanban, modals
├── styles.css     # All styling, including the dark mode theme
└── script.js      # App logic: auth, routing, charts, storage, kanban, modal handling
```

## Running Locally

No build tools or installation required. Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Data Persistence

Assignment data is stored in the browser's `localStorage` under the key `assignmo_assignments_v1`. To reset the app back to its original sample data, open your browser's developer console and run:

```js
localStorage.removeItem("assignmo_assignments_v1");
```

then refresh the page.

## Notes

This is a front-end demo/prototype: authentication is simulated (no real backend or database), and all data lives only in your own browser. It's intended as a learning project and UI showcase rather than a production assignment-tracking service.

## Author

Created by Muhammad Nur Hakim, 2026.
