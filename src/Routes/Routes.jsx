import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Index from '../pages/Home/Index';
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin';
import PrivateRoute from '../components/PrivateRoute';
import CadastrarProduto from '../pages/Admin/Products/Products';
import Login from '../pages/Auth/Login/Login';
import typeUserEnum from '../constants/enums/typeUserEnum';
import Unauthorized from '../pages/Unauthorized/Unauthorized';



export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product"
          element={
            <PrivateRoute acessControll={typeUserEnum.ADMIN}>
            <CadastrarProduto />
            </PrivateRoute>
          }
        />


        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}
