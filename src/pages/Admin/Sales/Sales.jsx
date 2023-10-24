import styles from "./Sales.module.css";
import React from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineTeam,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const SidebarAdmin = () => {
  const { AdminLogout } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (pathname === "/dashboard") {
      setNome("Dashboard");
    } else if (pathname === "/unidade-geradora") {
      setNome("Unidades");
    } else if (pathname === "/lancamento-mensal") {
      setNome("Cadastro de energia geradora");
    }
  }, [pathname]);
  const handleSidebarAdmin = () => {
    AdminLogout();
  };
  return (
    <aside className={styles.sidebarAdmin}>
      <ul>
        <li>
          <Link to="/sales">
            <AiOutlineShoppingCart />
            Vendas
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={
              pathname === "/admin/dashboards/register/products"
                ? `${styles.ativo}`
                : ""
            }
          >
            <AiOutlineShop />
            Produtos
          </Link>
        </li>
        <li>
          <Link to="/admin/dashboard/users">
            <AiOutlineTeam />
            Usuários
          </Link>
        </li>
        <li>
          <Link to="/user/admin">
            <AiOutlineSetting /> Sair
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
