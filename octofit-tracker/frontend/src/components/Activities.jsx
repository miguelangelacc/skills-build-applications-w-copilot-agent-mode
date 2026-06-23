import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      const data = await fetchFromApi('/api/activities');
      setActivities(data);
      setLoading(false);
    };
    loadActivities();
  }, []);

  const getActivityBadge = (type) => {
    const colors = {
      running: 'primary',
      cycling: 'success',
      swimming: 'info',
      gym: 'warning',
      other: 'secondary'
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      {loading ? (
        <p className="text-muted">Loading activities...</p>
      ) : activities.length === 0 ? (
        <p className="text-warning">No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Distance</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge bg-${getActivityBadge(activity.type)}`}>
                      {activity.type}
                    </span>
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
