import react from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged Out');
    navigate('/');
  };
  return (
    <>
      <h1 className="text-3xl">Dashboard Page</h1>;
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
};

export default Dashboard;
