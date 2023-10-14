import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Index from '../pages/Home/Index';
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
