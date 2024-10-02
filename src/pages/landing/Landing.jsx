import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LandingForm } from './components/LandingForm';
import useLogin from '../../hooks/Authentication/useLogin';
import useRegister from '../../hooks/Authentication/useRegister';

const Landing = () => {
  const [credentials, setCredentials] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  const {
    handleLogin: loginHandler,
    loading: loginLoading,
    success: loginSuccess,
  } = useLogin();

  const {
    handleRegister: registerHandler,
    loading: registerLoading,
    success: registerSuccess,
  } = useRegister();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(credentials);
    } catch (error) {
      console.error({ error });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerHandler(credentials);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (loginSuccess || registerSuccess) {
      navigate('/');
    }
  }, [loginSuccess, registerSuccess, navigate]);

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
            registerLoading ? (
              <h1
                className={
                  'bg-slate-300 rounded p-4 font-bold text-slate-900 text-3xl animate-pulse'
                }
              >
                PACKING YOUR BAGS FOR SURVIVOR FANTASY LEAGUE...
              </h1>
            ) : (
              <LandingForm
                handleFormSubmit={handleRegister}
                formTitle={'- Create your account -'}
                formBody={
                  'Create an account to join a fantasy Survivor league and compete for fantasy glory!'
                }
                formCTA={'Register'}
                setCredentials={setCredentials}
              />
            )
          ) : loginLoading ? (
            <h1
              className={
                'bg-slate-300 rounded p-4 font-bold text-slate-900 text-3xl animate-pulse'
              }
            >
              WAKING UP YOUR FANTASY TRIBE...
            </h1>
          ) : (
            <LandingForm
              handleFormSubmit={handleLogin}
              formTitle={'- Welcome Back -'}
              formBody={
                'Sign in with your Tribe Name and password to get back into the Fantasy action!'
              }
              formCTA={'Login'}
              setCredentials={setCredentials}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
