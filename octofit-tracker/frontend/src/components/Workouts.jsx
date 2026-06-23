import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      const data = await fetchFromApi('/api/workouts');
      setWorkouts(data);
      setLoading(false);
    };
    loadWorkouts();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger'
    };
    return colors[difficulty] || 'secondary';
  };

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      {loading ? (
        <p className="text-muted">Loading workouts...</p>
      ) : workouts.length === 0 ? (
        <p className="text-warning">No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title">{workout.name}</h5>
                    <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="card-text">{workout.description}</p>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted">Duration</small>
                      <p className="mb-0"><strong>{workout.duration} min</strong></p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Calories</small>
                      <p className="mb-0"><strong>{workout.caloriesBurned}</strong></p>
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">Exercises:</small>
                    <ul className="mb-0 mt-2">
                      {workout.exercises?.map((exercise, index) => (
                        <li key={index}>
                          {exercise.name} - {exercise.sets}x{exercise.reps}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
