# Octofit Tracker - React 19 Frontend

## Overview

React 19 presentation tier for the Octofit Tracker multi-tier application, built with Vite and Bootstrap 5.

## Features

- **React 19** - Latest React version with latest hooks
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Bootstrap 5** - Responsive UI components
- **Environment Variables** - Support for Codespaces and localhost
- **API Integration** - Seamless connection to backend

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Activities.jsx   # Activities listing
│   │   ├── Leaderboard.jsx  # Rankings and scores
│   │   ├── Teams.jsx        # Team management
│   │   ├── Users.jsx        # User listing
│   │   └── Workouts.jsx     # Workout templates
│   ├── utils/
│   │   └── api.js           # API utilities and configuration
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point with BrowserRouter
│   ├── App.css              # Application styles
│   └── index.css            # Global styles
├── .env.local.example       # Environment variables template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Environment Variables

### Configuration (.env.local)

Create a `.env.local` file in the frontend directory:

```env
# GitHub Codespace name (e.g., "myspace-12345")
# Leave empty for localhost development
VITE_CODESPACE_NAME=
```

### Environment Variables Reference

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `VITE_CODESPACE_NAME` | No | `undefined` | GitHub Codespace name for API URL construction |

### API URL Logic

The application automatically determines the API URL:

- **Codespaces Mode**: If `VITE_CODESPACE_NAME` is set:
  ```
  https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
  ```

- **Localhost Mode**: If `VITE_CODESPACE_NAME` is empty/unset:
  ```
  http://localhost:8000/api
  ```

### Safe Fallback

The `getApiBaseUrl()` utility includes protection against undefined values:

```javascript
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost (prevents https://undefined-8000...)
  return 'http://localhost:8000/api';
};
```

## Components

### Pages

- **Home** - Dashboard with API configuration info
- **Users** - Display all users with username, email, name
- **Activities** - Activity log with type badges and calories
- **Teams** - Team cards with member counts
- **Leaderboard** - Rankings with filters (All/Users/Teams)
- **Workouts** - Workout templates with exercises

### Features

- Loading states for all components
- Empty state messages
- Error handling with safe API fallbacks
- Responsive Bootstrap layout
- Type badges for activities and difficulty levels
- Paginated and array response handling

## API Integration

### fetchFromApi Utility

```javascript
// Fetch data from API endpoint
const data = await fetchFromApi('/users');

// Handles:
// - Network errors
// - HTTP errors (returns [])
// - Paginated responses (data.data)
// - Direct array responses
```

## Routing

Navigation is implemented with React Router v7:

```
/              - Home page
/users         - Users list
/activities    - Activities list
/teams         - Teams
/leaderboard   - Leaderboard rankings
/workouts      - Workout templates
```

## Running the Application

### Development

```bash
cd frontend
npm run dev
```

Starts Vite dev server on `http://localhost:5173`

### Build

```bash
npm run build
```

Creates optimized production build in `dist/` directory

### Preview

```bash
npm run preview
```

Preview the production build locally

## Styling

- **Bootstrap 5** - Main CSS framework
- **Custom CSS** - In `src/App.css`
- **Responsive** - Mobile-first design

## Dependencies

### Runtime
- `react@^19.2.6` - UI framework
- `react-dom@^19.2.6` - DOM rendering
- `react-router-dom@^7.18.0` - Client-side routing
- `bootstrap@^5.3.8` - CSS framework

### Development
- `vite@^8.0.12` - Build tool
- `@vitejs/plugin-react@^6.0.1` - React support
- `eslint@^10.3.0` - Code linting

## Notes

- All components use Bootstrap classes for styling
- Loading and empty states are consistent across all pages
- API errors don't crash the app - empty arrays are returned
- Environment variables use `import.meta.env` (Vite standard)
- Backend API should run on port 8000
- Frontend Vite dev server typically runs on port 5173
