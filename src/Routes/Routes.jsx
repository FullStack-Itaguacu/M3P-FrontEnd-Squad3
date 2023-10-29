import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Index from '../pages/Home/Index';
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin';
import PrivateRoute from '../components/PrivateRoute';
import CadastrarProduto from '../pages/Admin/Products/Products';
import typeUserEnum from '../constants/enums/typeUserEnum';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import Login from "../pages/Auth/Login/Login";
import Dashbord from '../pages/Admin/Dashboard/Dashboard';
import RegisterUser from "../pages/Auth/Register/registerUser"
import DashBoardIndex from '../pages/Admin/DashBoardIndex/DashBoardIndex';
import Sales from '../pages/Admin/Sales/Sales';
import AllUsers from '../pages/Admin/AllUsers/AllUsers';
import TableAllProducts from '../components/Table/TableAllProducts';

import Navbar from "../components/Navbar/navbar"
import { AuthContext } from '../contexts/AuthContext';

import Profile from '../pages/Client/Profile/Profile';
import CreateUser from '../pages/Admin/Users/CreateUser';








export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login/admin" element={<AdminLogin />} />

 loginUser

 <Route path="/navbar" 
          element={<Navbar user={AuthContext.user} />} 
        />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/register" element={<RegisterUser />} />
       
        
        <Route path="/admin/product" element={<CadastrarProduto />}/>


        loginUser
        <Route path="/login/user" element={<Login />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/profile"
          element={
            <PrivateRoute acessControll>
              <Profile />
            </PrivateRoute>
          }/>




        <Route path='/admin/dashboard'
          element={
            <PrivateRoute acessControll={typeUserEnum.ADMIN}>
              <Dashbord
              />
            </PrivateRoute>
          }>
          <Route path='resumo' element={<DashBoardIndex />} />
          <Route path='register/products' element={<NewProduct />} />
          <Route path='sales' element={<Sales />} />


          <Route path='users' element={<Users />} />

          <Route path='products' element={<TableAllProducts />} />
          <Route path='register/user' element={<Users />} />
          <Route path='users' element={<AllUsers />} />

          <Route path='products' element={<TableAllProducts />} />
          <Route path='register/user' element={<CreateUser />} />
          <Route path='users' element={<AllUsers />} />

        </Route>


        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

