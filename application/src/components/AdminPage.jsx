import { useAuth0 } from '@auth0/auth0-react';

const AdminPage = () => {
  const { user } = useAuth0();
  
  // Check if the user has the 'Administrator' role
  const isAdmin = user['http://localhost:5173/roles'] === 'Administrator';

  if (!isAdmin) {
    // Redirect or display an error message for non-admin users
    return <p>You do not have permission to access this page.</p>;
  }

  // Admin-specific content here
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add your admin-specific content here */}
    </div>
  );
};

export default AdminPage;
