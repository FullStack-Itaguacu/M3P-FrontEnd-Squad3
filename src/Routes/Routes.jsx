import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Index from "../pages/Home/Index";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import PrivateRoute from "../components/PrivateRoute";
import CadastrarProduto from "../pages/Admin/Products/Products";
import typeUserEnum from "../constants/enums/typeUserEnum";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import Login from "../pages/Auth/Login/Login";
import Dashbord from "../pages/Admin/Dashboard/Dashboard";
import Users from "../pages/Admin/Users/Users";
import DashBoardIndex from "../pages/Admin/DashBoardIndex/DashBoardIndex";
import Sales from "../pages/Admin/Sales/Sales";
import CreateUser from "../pages/Admin/Users/CreateUser";
import AllUsers from "../pages/Admin/AllUsers/AllUsers";
import TableAllProducts from "../components/Table/TableAllProducts";

export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route path="/admin/product" element={<CadastrarProduto />} />
        <Route path="/admin/dashboard" element={<CadastrarProduto />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute acessControll={typeUserEnum.ADMIN}>
              <Dashbord />
            </PrivateRoute>
          }
        >
          <Route path="resumo" element={<DashBoardIndex />} />
          <Route path="register/products" element={<CadastrarProduto />} />
          <Route path="sales" element={<Sales />} />

          <Route path="users" element={<Users />} />
          <Route path="register/user" element={<CreateUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}
