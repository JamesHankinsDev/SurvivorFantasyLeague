import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import { API_URL } from '../../utils/constants';

import { usePostWithToast } from '../../hooks/usePostWithToast';
import { LandingForm } from './components/LandingForm';

const Landing = () => {
  const [credentials, setCredentials] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const { postData: postLogin } = usePostWithToast(API_URL.LOGIN);
  const { postData: postRegister } = usePostWithToast(API_URL.REGISTER);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { name, role, token } = await postLogin('LOGIN', credentials);
      login(name, role, token);
      navigate('/');
    } catch (error) {
      console.error({ error });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { name, role, token } = await postRegister('REGISTER', credentials);
      login(name, role, token);
      navigate('/');
    } catch (error) {
      console.error({ error });
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
            <LandingForm
              handleFormSubmit={handleRegister}
              formTitle={'- Create your account -'}
              formBody={
                'Create an account to join a fantasy Survivor league and compete for fantasy glory!'
              }
              formCTA={'Register'}
              setCredentials={setCredentials}
            />
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
