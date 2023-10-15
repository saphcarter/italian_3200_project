import { useAuth0 } from '@auth0/auth0-react';

const customNamespace = 'https://italianapp.com/';

const AdminPage = () => {
  const { user } = useAuth0();
  
  const isAdmin = user[customNamespace + 'roles'] === 'admin';

  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Only admins can see this page.</p>
    </div>
  );
};

export default AdminPage;
