import styles from './DashboardSidebar.module.css';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineTeam, AiOutlineShop, AiOutlineSetting } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';





const DashboardSidebar = () => {
    const{logout} = useAuth();
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
    logout();
}

    return (
        <aside className={styles.sidebar}>
            <ul>
                <li>
                    <Link to="/admin/dashboard/vendas">
                        <AiOutlineHome />
                        Resultado de vendas
                    </Link>
                </li>
                <li><Link to="/admin/dashboard/sales">
                    <AiOutlineShoppingCart />
                    Vendas</Link></li>
                <li><Link to="/admin/dashboard/users">
                    <AiOutlineTeam />
                    Usuários</Link></li>
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
                <li><a >
                    <AiOutlineSetting />
                    Sair</a></li>
            </ul>
        </aside>
    );
}

export default DashboardSidebar;
