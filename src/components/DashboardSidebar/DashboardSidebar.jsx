import styles from './DashboardSidebar.module.css';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineTeam, AiOutlineShop, AiOutlineSetting,AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';





const DashboardSidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        if (pathname === '/dashboard') {
            setNome('Dashboard');
        } else if (pathname === '/unidade-geradora') {
            setNome('Unidades');
        } else if (pathname === '/lancamento-mensal') {
            setNome('Cadastro de energia geradora');
        }
    }, [pathname]);

    const handleLogout = () => {
        window.location.href = "/login/admin";

        logout();
    }


    return (
        <aside className={styles.sidebar}>
            <ul>
                <li>
                    <Link to="/admin/dashboard/resumo"

                        className={pathname === '/admin/dashboard/resumo' ? `${styles.ativo}` : ''}
                    >
                        <AiOutlineHome />
                        Resultado de vendas
                    </Link>
                </li>
                <li><Link to="/admin/dashboard/sales"
                    className={pathname === '/admin/dashboard/sales' ? `${styles.ativo}` : ''}
                >

                    <AiOutlineShoppingCart />
                    Vendas</Link></li>
                <li><Link to="/admin/dashboard/users"

                    className={pathname === '/admin/dashboard/users' ? `${styles.ativo}` : ''}
                >
                    <AiOutlineTeam />
                    Usuários</Link>
                </li>
                <li><Link to="/admin/dashboard/register/user"

                    className={pathname === '/admin/dashboard/register/user' ? `${styles.ativo}` : ''}
                >
                    <AiOutlineUsergroupAdd />
                    Registrar Usuario</Link>
                </li>
                <li>
                    <Link
                        to="/admin/dashboard/register/products"
                        className={pathname === '/admin/dashboard/register/products' ? `${styles.ativo}` : ''}
                    >
                        <AiOutlineShop />
                        Cadastrar novo Produto
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/dashboard/products"
                        className={pathname === '/admin/dashboard/products' ? `${styles.ativo}` : ''}
                    >
                        <AiOutlineShop />
                        Meus Produtos
                    </Link>
                </li>
                <li onClick={handleLogout}><a >
                    <AiOutlineSetting />
                    Sair</a></li>
            </ul>
        </aside>
    );
}

export default DashboardSidebar;
