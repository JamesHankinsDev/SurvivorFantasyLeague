import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const Home = () => {
  const [activeTab, setActiveTab] = useState('');
  const [showNav, setShowNav] = useState(false);

  const { userName, userRole, logout } = useAuth();

  const navigate = useNavigate();
  const { pathname: urlPath } = useResolvedPath();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken === null) {
      navigate('/Login');
    }
  }, [navigate, urlPath]);

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  const toggleNav = () => setShowNav(!showNav);

  return (
    <>
      <div className="min-h-screen h-screen max-w-screen w-screen bg-slate-900 flex flex-col overflow-x-hidden">
        <div
          className={
            'sticky top-0 w-full bg-slate-900 text-slate-300 p-2 px-6 flex justify-between items-center border-b-4 border-slate-600 z-10'
          }
        >
          <span className={'md:text-2xl text-md font-bold'}>
            Welcome to {userName}
          </span>
          <button
            className={'boton-elegante md:block hidden '}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <div className="flex md:flex-row flex-row-reverse h-full">
          <nav
            className={`text-slate-300 text-xs bg-slate-900 p-4 flex flex-col md:items-start items-end inline text-sm md:sticky fixed md:left-0 md:top-16 bottom-2 right-2 z-10 justify-end md:justify-start rounded w-fit md:border-r-4 border-slate-600 ${
              showNav ? 'opacity-100' : 'opacity-80'
            }`}
          >
            {!showNav ? (
              <>
                <span className={'md:hidden'}>
                  <ArrowUpward onClick={toggleNav} />
                </span>
                <span
                  className={
                    'font-bold text-3xl w-full text-slate-300 rounded hover:text-slate-600 cursor-pointer text-right md:block hidden'
                  }
                  onClick={toggleNav}
                >
                  {'>'}
                </span>
              </>
            ) : (
              <>
                <span
                  className={
                    'font-bold text-3xl w-full text-slate-300 rounded hover:text-slate-600 cursor-pointer text-right md:block hidden'
                  }
                  onClick={toggleNav}
                >
                  {'<'}
                </span>
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
                  to="/leaderboard"
                  onClick={() => setActiveTab('leaderboard')}
                  className={`hover:text-white px-4 py-1 my-2 ${
                    activeTab === 'leaderboard' &&
                    'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                  }`}
                >
                  Leaderboard
                </Link>
                {/* <Link
                  to="/chat"
                  onClick={() => setActiveTab('chat')}
                  className={`hover:text-white px-4 py-1 my-2 ${
                    activeTab === 'chat' &&
                    'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                  }`}
                >
                  Chat
                </Link> */}
                {/* <Link
                  to="/ep-recap"
                  onClick={() => setActiveTab('ep-recap')}
                  className={`hover:text-white px-4 py-1 my-2 ${
                    activeTab === 'ep-recap' &&
                    'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                  }`}
                >
                  Recaps
                </Link> */}
                {userRole === 'admin' && (
                  <Link
                    to="/log-scoring"
                    onClick={() => setActiveTab('log-scoring')}
                    className={`hover:text-white px-4 py-1 my-2 md:block hidden ${
                      activeTab === 'log-scoring' &&
                      'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                    }`}
                  >
                    Log Scoring
                  </Link>
                )}
                <Link
                  to="/how-it-works"
                  onClick={() => setActiveTab('how-it-works')}
                  className={`hover:text-white px-4 py-1 my-2 ${
                    activeTab === 'how-it-works' &&
                    'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                  }`}
                >
                  How it works
                </Link>
                <button
                  className={`md:hidden hover:text-white px-4 py-1 my-2 ${
                    activeTab === 'log-scoring' &&
                    'bg-slate-300 text-slate-900 rounded hover:text-slate-900'
                  }`}
                  onClick={handleLogout}
                >
                  Log Out
                </button>
                <span className={'md:hidden'}>
                  <ArrowDownward onClick={toggleNav} />
                </span>
              </>
            )}
          </nav>

          <main className={'w-full bg-slate-300 p-4 h-fit'}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
