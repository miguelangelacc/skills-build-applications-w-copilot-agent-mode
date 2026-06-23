import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await fetchFromApi('/leaderboard');
      setLeaderboardData(data);
      setLoading(false);
    };
    loadLeaderboard();
  }, []);

  const filteredData = filter === 'all' 
    ? leaderboardData 
    : leaderboardData.filter(item => item.entity === filter);

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      
      <div className="mb-4">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`btn ${filter === 'user' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setFilter('user')}
        >
          Users
        </button>
        <button 
          className={`btn ${filter === 'team' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('team')}
        >
          Teams
        </button>
      </div>

      {loading ? (
        <p className="text-muted">Loading leaderboard...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-warning">No leaderboard data found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Type</th>
                <th>Score</th>
                <th>Total Activities</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={entry._id}>
                  <td>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td>
                    <span className={`badge ${entry.entity === 'user' ? 'bg-primary' : 'bg-success'}`}>
                      {entry.entity}
                    </span>
                  </td>
                  <td>{entry.score}</td>
                  <td>{entry.totalActivities}</td>
                  <td>{entry.totalCalories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
