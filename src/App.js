import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Scoring from './pages/scoring/Scoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Dashboard />} />
        <Route path="/Scoring" element={<Scoring />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
