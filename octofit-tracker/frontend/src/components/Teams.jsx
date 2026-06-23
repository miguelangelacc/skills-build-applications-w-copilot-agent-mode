import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      const data = await fetchFromApi('/teams');
      setTeams(data);
      setLoading(false);
    };
    loadTeams();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Teams</h2>
      {loading ? (
        <p className="text-muted">Loading teams...</p>
      ) : teams.length === 0 ? (
        <p className="text-warning">No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Members: {team.members?.length || 0}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
