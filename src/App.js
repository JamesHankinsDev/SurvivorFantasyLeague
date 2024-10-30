import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Castaways from './pages/Castaways/Castaways';
import Home from './pages/Home/Home';
import Landing from './pages/landing/Landing';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import MyTribe from './pages/MyTribe/MyTribe';
import Scoring from './pages/scoring/Scoring';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { SeasonRecap } from './pages/Recaps/SeasonRecap';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import Chat from './pages/Chat/Chat';
import MasterContext from './context/MasterContext';

function App() {
  return (
    <MasterContext>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/" element={<Home />}>
            <Route path="/" element={<MyTribe />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="castaways" element={<Castaways />} />
            <Route path="my-tribe" element={<MyTribe />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="ep-recap" element={<SeasonRecap />} />
            <Route path="chat" element={<Chat />} />
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
    </MasterContext>
  );
}

export default App;
