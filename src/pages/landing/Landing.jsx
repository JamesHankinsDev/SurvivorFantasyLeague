import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [toLogin, setToLogin] = useState(false);

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
    <div className="columns-2 bg-slate-900 h-screen overflow-hidden">
      <div className="bg-[url('https://media.istockphoto.com/id/1372885868/photo/hawaii-luau-party-maui-fire-tiki-torches-with-open-flames-burning-at-sunset-sky-clouds-at.jpg?s=612x612&w=0&k=20&c=-RVqFPNNMvfRL7iYamGkl6zn8awfxadsKUmMvojE6-s=')] bg-cover h-full text-slate-950 font-extrabold flex items-center justify-center flex-col">
        <h1 className="text-5xl">Survivor Fantasy League </h1>
        <h3 className="text-2xl">Fall, '24</h3>
      </div>
      <div className="bg-slate-300 h-full flex flex-col justify-between items-center">
        <div className={'flex justify-end w-full px-5'}>
          {!toLogin ? (
            <button onClick={() => setToLogin(true)}>Login</button>
          ) : (
            <button onClick={() => setToLogin(false)}>Sign Up</button>
          )}
        </div>
        <div
          className={'grow flex flex-col justify-center items-center h-full'}
        >
          {toLogin ? (
            <>
              <form
                className={'flex flex-col items-center px-14 text-center'}
                onSubmit={register}
              >
                <h2 className={'py-5'}>
                  Register with a fantasy tribe to <br />
                  compete for fantasy glory!
                </h2>
                <input
                  className={'my-5'}
                  type="text"
                  placeholder="Fantasy Tribe Name"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <p className={'text-xs'}>
                  **While you're password is encrypted, I can't gaurantee it is
                  safe from external eyes. Please do not use a password you
                  commonly use for sensitive info!
                </p>
                <input
                  className={'my-5'}
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <select
                  className={'my-5'}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option key="Option_1" value="user">
                    User
                  </option>
                  <option key="Option_2" value="admin">
                    Admin
                  </option>
                </select>

                <button className={'my-5'} type="submit">
                  Register
                </button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={login}>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
