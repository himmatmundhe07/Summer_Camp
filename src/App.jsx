import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrganizersPage from './pages/OrganizersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/organizers" element={<OrganizersPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'font-quicksand font-bold text-[var(--color-text-main)] border-2 border-[var(--color-text-main)] rounded-xl shadow-solid',
          duration: 3000,
        }} 
      />
    </Router>
  );
}

export default App;
