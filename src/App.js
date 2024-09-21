import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home/Home';
import Castaways from './pages/Castaways/Castaways';
import MyTribe from './pages/MyTribe/MyTribe';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Scoring from './pages/scoring/Scoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />}>
          <Route path="castaways" element={<Castaways />} />
          <Route path="my-tribe" element={<MyTribe />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="ep-recap" element={<h1>Episode Recap</h1>} />
          <Route path="log-scoring" element={<Scoring />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
