import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Index from "../pages/Home/Index";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import PrivateRoute from "../components/PrivateRoute";
import CadastrarProduto from "../pages/Admin/Products/Products";
import CreateUser from "../pages/Admin/Users/CreateUser";
import typeUserEnum from "../constants/enums/typeUserEnum";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route
          path="/admin/product"
          element={
            <PrivateRoute acessControll={typeUserEnum.ADMIN}>
              <CadastrarProduto />
            </PrivateRoute>
          }
        />

        <Route path="/admin/criar-usuario" element={<CreateUser />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}
