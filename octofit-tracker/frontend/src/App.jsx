import { Routes, Route, Link } from 'react-router-dom'
import { Users } from './components/Users'
import { Activities } from './components/Activities'
import { Teams } from './components/Teams'
import { Leaderboard } from './components/Leaderboard'
import { Workouts } from './components/Workouts'
import { getApiBaseUrl } from './utils/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function Home() {
  const apiUrl = getApiBaseUrl()
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">🏋️ Octofit Tracker</h1>
        <p className="lead">Track your fitness activities and compete with teams</p>
        <hr className="my-4" />
        
        <div className="alert alert-info">
          <h5>API Configuration</h5>
          <p className="mb-0">
            <strong>API Base URL:</strong> <code>{apiUrl}</code>
          </p>
          {codespaceName ? (
            <p className="mb-0 mt-2">
              <strong>Codespace:</strong> {codespaceName}
            </p>
          ) : (
            <p className="mb-0 mt-2">
              <strong>Mode:</strong> Localhost Development
            </p>
          )}
        </div>

        <p>Navigate using the menu above to explore activities, users, teams, leaderboards, and workouts.</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🏋️ Octofit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">© 2026 Octofit Tracker | Multi-tier Application with React 19, Vite, and Express</p>
      </footer>
    </div>
  )
}

export default App
