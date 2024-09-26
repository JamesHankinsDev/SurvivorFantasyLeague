import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAPIURI } from '../../utils/API';
import { useAuth } from '../../context/AuthContext';

const Landing = () => {
  const [credentials, setCredentials] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const BASE_URI = getAPIURI();
    try {
      const response = await axios.post(
        `${BASE_URI}/api/auth/login`,
        credentials
      );
      // console.log({ response });

      login(response.data.name, response.data.role, response.data.token);
      navigate('/castaways');
      alert('Login Successful');
    } catch (error) {
      console.error({ error });
      alert('Error logging in!');
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const BASE_URI = getAPIURI();
    try {
      await axios.post(`${BASE_URI}/api/auth/register`, credentials);
      alert('Registration successful');
    } catch (error) {
      alert('Error in registreation');
    }
  };

  return (
    <div className="columns-2 bg-slate-900 h-screen overflow-hidden">
      <div className="bg-[url('https://media.istockphoto.com/id/467002425/photo/tiki-lamps-on-the-beach-of-hawaii.jpg?s=612x612&w=0&k=20&c=3MrGawPg8ZkrIgQwMNW4f9u9wEk7NS0IP76KFnCR_Rg=')] bg-cover h-full text-slate-300 font-extrabold flex items-center justify-center flex-col p-5 text-center">
        <h1 className="text-5xl">
          Survivor
          <br />
          Fantasy
          <br />
          League{' '}
        </h1>
        <h3 className="text-2xl mt-5">Fall, '24</h3>
      </div>
      <div className="bg-slate-900 text-slate-300 h-full flex flex-col justify-between items-center p-6">
        <div className={'flex justify-end w-full px-5'}>
          {!showLogin ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          )}
        </div>
        <div
          className={
            'grow flex flex-col justify-center items-center h-full p-14'
          }
        >
          {!showLogin ? (
            <>
              <form
                className={'flex flex-col items-center text-center'}
                onSubmit={register}
              >
                <h2 className={'py-5 text-xl font-bold'}>
                  Register with a fantasy tribe to compete for fantasy glory!
                </h2>

                <div className={'form'}>
                  <input
                    className={'input'}
                    type="text"
                    placeholder="Fantasy Tribe Name"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                  <span className={'input-border'}></span>
                </div>

                <div className={'form'}>
                  <input
                    className={'mt-5 input'}
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <span className={'input-border'}></span>
                </div>

                <button className={'mt-5 boton-elegante'} type="submit">
                  Register
                </button>
              </form>
            </>
          ) : (
            <>
              <form
                onSubmit={handleLogin}
                className={'flex flex-col justify-center items-center'}
              >
                <h2 className={'py-5 text-xl font-bold text-center'}>
                  Sign in with your existing Fantasy Tribe!
                </h2>
                <div className={'form'}>
                  <input
                    className={'input'}
                    type="text"
                    placeholder="Fantasy Tribe Name"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                  <span className={'input-border'}></span>
                </div>

                <div className={'form'}>
                  <input
                    className={'input mt-5'}
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <span className={'input-border'}></span>
                </div>

                <button className={'boton-elegante mt-5'} type="submit">
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
