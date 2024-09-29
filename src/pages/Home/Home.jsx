import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [activeTab, setActiveTab] = useState('castaways');
  const { userName, userRole, logout } = useAuth();

  const navigate = useNavigate();
  const { pathname: urlPath } = useResolvedPath();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      navigate('/Login');
    }

    console.log({ urlPath });
    if (urlPath && urlPath !== '/') {
      setActiveTab(urlPath.substring(1));
    }
  }, [navigate, urlPath]);

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  return (
    <>
      <div className="min-h-screen h-screen max-w-screen w-screen bg-slate-900 flex flex-col overflow-x-hidden">
        <div
          className={
            'sticky top-0 w-full bg-slate-900 text-slate-300 p-2 px-6 flex justify-between items-center border-b-4 border-slate-600 z-10'
          }
        >
          <span className={'text-2xl font-bold'}>Welcome to {userName}</span>
          <button className={'boton-elegante'} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <div className="flex flex-row">
          <nav className="text-slate-300 bg-slate-900 p-4 w-44 flex flex-col inline text-sm sticky left-0 top-16">
            <Link
              to="/"
              onClick={() => setActiveTab('castaways')}
              className={`hover:text-white px-4 py-1 my-2 ${
                activeTab === 'castaways' &&
                'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
              }`}
            >
              Castaways
            </Link>
            <Link
              to="/my-tribe"
              onClick={() => setActiveTab('my-tribe')}
              className={`hover:text-white px-4 py-1 my-2 ${
                activeTab === 'my-tribe' &&
                'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
              }`}
            >
              My Tribe
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`hover:text-white px-4 py-1 my-2 ${
                activeTab === 'leaderboard' &&
                'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/ep-recap"
              onClick={() => setActiveTab('ep-recap')}
              className={`hover:text-white px-4 py-1 my-2 ${
                activeTab === 'ep-recap' &&
                'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
              }`}
            >
              Recaps
            </Link>
            {userRole === 'admin' && (
              <Link
                to="/log-scoring"
                onClick={() => setActiveTab('log-scoring')}
                className={`hover:text-white px-4 py-1 my-2 ${
                  activeTab === 'log-scoring' &&
                  'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                }`}
              >
                Log Scoring
              </Link>
            )}
          </nav>

          <main
            className={'w-full border-l-4 border-slate-600 bg-slate-300 p-4'}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
