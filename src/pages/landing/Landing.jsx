import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setToken(localStorage.getItem('token'));
    }
    if (localStorage.getItem('user') !== null) {
      setUser(localStorage.getItem('user'));
    }
    if (localStorage.getItem('role') !== null) {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        user
      );
      console.log({ response: response.data });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);
      setToken(response.data.token);
      setRole(response.data.role);
      alert('Login Successful');
    } catch (error) {
      alert('Error logging in!');
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      alert('Registration successful');
    } catch (error) {
      alert('Error in registreation');
    }
  };

  return (
    <div className="columns-2 h-screen">
      <div className="bg-black h-full">
        <h1 className="text-3xl">Landing Page</h1>
      </div>
      <div className="bg-white h-full flex flex-col justify-center items-center">
        <h2 className="text-2xl">Second Part</h2>
        <>
          <h1>Authentication</h1>
          <form onSubmit={register}>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <select
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option key="Option_1" value="user">
                User
              </option>
              <option key="Option_2" value="admin">
                Admin
              </option>
            </select>

            <button type="submit">Register</button>
          </form>

          <form onSubmit={login}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
        </>
      </div>
    </div>
  );
};

export default Landing;
