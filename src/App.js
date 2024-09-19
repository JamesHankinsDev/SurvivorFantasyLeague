import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
