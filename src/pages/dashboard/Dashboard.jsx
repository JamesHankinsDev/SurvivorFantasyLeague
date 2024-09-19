import react from 'react';

const Dashboard = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged Out');
  };
  return (
    <>
      <h1 className="text-3xl">Dashboard Page</h1>;
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
};

export default Dashboard;
