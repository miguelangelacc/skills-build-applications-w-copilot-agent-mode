import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchFromApi('-8000.app.github.dev/api/users');
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Users</h2>
      {loading ? (
        <p className="text-muted">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-warning">No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
