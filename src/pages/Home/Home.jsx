import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useResolvedPath } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('');

  const tribeName = localStorage.getItem('name');

  const navigate = useNavigate();
  const { pathname: urlPath } = useResolvedPath();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/Login');
    }

    if (urlPath) {
      setActiveTab(urlPath.substring(1));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/Login');
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <div
          className={
            'sticky top-0 w-screen bg-slate-900 text-slate-300 p-2 flex justify-between items-center border-b-4 border-slate-600 z-10'
          }
        >
          <span className={'text-2xl font-bold'}>Welcome to {tribeName}</span>
          <button className={'boton-elegante'} onClick={logout}>
            Log Out
          </button>
        </div>
        <div className="flex flex-row">
          <nav className="text-slate-300 bg-slate-900 p-4 lg:w-44 h-full flex flex-col inline text-sm sticky left-0 top-16">
            <Link
              to="/castaways"
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
            {localStorage.getItem('role') === 'admin' && (
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
