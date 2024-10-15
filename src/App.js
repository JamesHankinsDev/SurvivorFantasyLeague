import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context/AuthContext';
import { CastawaysProvider } from './context/CastawayContext';

import Castaways from './pages/Castaways/Castaways';
import Home from './pages/Home/Home';
import Landing from './pages/landing/Landing';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import MyTribe from './pages/MyTribe/MyTribe';
import Scoring from './pages/scoring/Scoring';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { SeasonRecap } from './pages/Recaps/SeasonRecap';
import { ScoringProvider } from './context/ScoringContext';

function App() {
  return (
    <AuthProvider>
      <CastawaysProvider>
        <ScoringProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Landing />} />
              <Route path="/" element={<Home />}>
                <Route path="" element={<Castaways />} />
                <Route path="my-tribe" element={<MyTribe />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="ep-recap" element={<SeasonRecap />} />
                <Route path="log-scoring" element={<Scoring />} />
              </Route>
              <Route path="reset-password/*" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position={'bottom-right'}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
          />
        </ScoringProvider>
      </CastawaysProvider>
    </AuthProvider>
  );
}

export default App;
