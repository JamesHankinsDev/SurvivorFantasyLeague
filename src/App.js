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

function App() {
  return (
    <AuthProvider>
      <CastawaysProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Landing />} />
            <Route path="/" element={<Home />}>
              <Route path="castaways" element={<Castaways />} />
              <Route path="my-tribe" element={<MyTribe />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route
                path="ep-recap"
                element={
                  <h1>Sorry... I ran out of time. No recaps enabled yet.</h1>
                }
              />
              <Route path="log-scoring" element={<Scoring />} />
            </Route>
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
      </CastawaysProvider>
    </AuthProvider>
  );
}

export default App;
