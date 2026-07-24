# Weather App

A responsive weather dashboard built with vanilla JavaScript that fetches real-time weather data, a 3-day forecast, and city autocomplete suggestions from a public API. Built as part of an internship track covering asynchronous JavaScript, API integration, state persistence, and modular front-end architecture.

## Live Demo

`https://tcintern-006.github.io/Weather-App/`

## Features

- Search current weather by city name
- Live search-as-you-type city suggestions (debounced)
- Current temperature, condition, humidity, and wind speed
- 3-day forecast with daily weather icons
- Graceful handling of invalid city names
- Loading state while data is being fetched
- Last 5 searched cities, persisted via `localStorage`
- Click any recent search to reload its weather instantly
- "Clear History" to wipe saved searches
- Dark / light mode toggle
- Automatically loads the last searched city's weather on page open

## Tech Stack

- **HTML5** — semantic page structure
- **CSS3** — responsive layout, custom properties for theming, custom scrollbar styling
- **JavaScript (ES6+)** — native ES Modules, no build tools or frameworks
- **[WeatherAPI.com](https://www.weatherapi.com/)** — current weather, forecast, and search/autocomplete endpoints

This project intentionally avoids frameworks and bundlers to reinforce core browser APIs and language fundamentals.

## Project Structure

```
Weather-App/
├── index.html
├── style.css
├── js/
│   ├── main.js           # entry point — DOM references, event listeners, orchestration
│   ├── api.js            # current weather + forecast fetch logic, loading/error handling
│   ├── Suggestion.js      # debounced autocomplete search (search.json endpoint)
│   ├── render.js          # pure rendering functions (current weather, forecast, recents)
│   ├── recentSearch.js     # recent-search persistence, date formatting, last-5 lookup
│   ├── deletehistory.js   # clear history logic
│   └── toogle.js          # dark/light mode toggle
└── README.md
```

### Why it's split this way

Each module has a single, focused responsibility — a pattern known as **separation of concerns**:

| File | Responsibility |
|---|---|
| `main.js` | Wires up the DOM, owns top-level state (`city`, `lastSearched`), delegates to other modules |
| `api.js` | Talks to the network for current weather + forecast. Owns loading/error UI state. |
| `Suggestion.js` | Talks to the network for city search suggestions, debounced on user input |
| `render.js` | Turns weather/forecast/recent-search data into DOM updates or HTML strings |
| `recentSearch.js` | Formats dates, tracks and re-renders the recent-searches list |
| `deletehistory.js` | Clears `localStorage` and refreshes dependent UI |
| `toogle.js` | Isolated dark/light theme toggle behavior |

Splitting logic this way keeps each piece independently readable and debuggable — a change to how recent searches are displayed only requires touching one file, not hunting through a single monolithic script.

## Core Concepts Applied

### Fetch API + Async/Await
All network requests use the native `fetch()` API wrapped in `async` functions:

```js
export async function getApi(apiKey, city) {
  const response = await fetch(url);
  const data = await response.json();
  ...
}
```

### Error Handling
`fetch()` only rejects on network-level failures — it does **not** reject on HTTP error responses like an invalid city name. This is handled explicitly:

```js
if (!response.ok) {
  throw new Error("Invalid City Name :(");
}
```

All request logic is wrapped in `try...catch...finally`, so errors surface in the UI and loading state always clears — whether the request succeeds or fails.

### Debouncing (Search-as-you-type)
Typing in the search bar doesn't fire a request per keystroke. Instead, each keystroke cancels the previous pending timer and starts a new one — a request only fires once the user pauses typing:

```js
searchBar.addEventListener("input", (e) => {
  clearTimeout(timer);
  if (e.target.value.length > 2) {
    timer = setTimeout(() => showSuggestion(e.target.value, apiKey), 1000);
  }
});
```

### Event Delegation
Recent-search items and suggestion items are rendered dynamically via `innerHTML`, which replaces DOM nodes on every update. Rather than re-attaching listeners to elements that keep getting recreated, click listeners are attached once to a stable parent container and inspect `e.target` to determine what was actually clicked.

### ES Modules
The project uses native browser `import` / `export` syntax rather than a bundler:

```js
export async function getApi(...) { ... }
import { getApi } from "./api.js";
```

Each file explicitly declares what it exposes and what it depends on, making dependencies between files traceable.

### Persisted State with `localStorage`
Recent searches are saved as JSON and rehydrated on page load, so search history and the last-viewed city survive a page refresh:

```js
localStorage.setItem("lastSearched", JSON.stringify(lastSearched));
JSON.parse(localStorage.getItem("lastSearched")) ?? [];
```

Duplicate city names are removed using `Set` before display:
```js
const unique = [...new Set(lastSearched)];
```

## Getting Started

### Prerequisites
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)
- A local development server (native ES Modules do not run over `file://` URLs)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/tcintern-006/Weather-App.git
   cd Weather-App
   ```

2. Add your API key in `js/api.js` (and `js/recentSearch.js`, `js/main.js`, `js/Suggestion.js` where referenced)
   ```js
   const apiKey = "YOUR_API_KEY_HERE";
   ```

3. Serve the project locally:
   ```bash
   npx serve .
   ```
   Or use the VS Code "Live Server" extension.

4. Open the served URL in your browser.

## Known Limitations / Future Improvements

- API key is currently duplicated across multiple files and stored client-side in plain text — acceptable for a learning project, but a production version would centralize it and proxy requests through a backend to keep it private.
- Recent-search weather cards re-fetch all 5 cities from the network on every search, which is inefficient and could hit free-tier rate limits with heavy use. A future improvement would cache each city's data and only refetch when stale.
- Forecast length is limited by the free API tier (currently 3 days).
- No automated tests yet.

## Author

Built as part of a multi-day internship track on asynchronous JavaScript, API integration, and Local Storage-based state persistence.
