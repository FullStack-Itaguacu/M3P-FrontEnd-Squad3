import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  useAuth  from '../../hooks/useAuth';
import styles from "./navbar.module.css"

const Navbar = ({  handleLogout, cart  }) => {
    const { user, userLogin  } = useAuth()
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            await userLogin ();
            setIsLoading(false);
        };
        if (isLoading) {
            loadUser();
        }
    }, [isLoading, userLogin ]);

    async function fetchProductsFilter(params) {
        const data = await listAdminProducts(params);
        setProducts(data.data.products);
    }

    const handleSearch = (e) => {
        const params = {
            name: searchTerm
        };
        fetchProductsFilter(params);
    };

    return (
        <div>
            <div className={styles.navbar}>
                
                <img className={styles.navbarImagem} src="/screen.png" alt="" />
                <div className={styles.containerText}>
                
  
                <h1>Olá, {user.fullName}</h1>
                <p>Seja bem-vindo</p>


                </div>

        <div className={styles.containerInput}>
            <input className={styles.navbarFilter}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.navbarButton} onClick={handleSearch}>Buscar</button>
        </div>

                <Link className={styles.navbarCompras} to="/">Meus pedidos</Link>
                <Link className={styles.navbarCarrinho} to="/cart">
                    Carrinho {cart ? `(${cart.items.length})` : '(0)'}
                </Link>
                {user ? (
    <>
        <span className={styles.navbarUsername}>{user.name}</span>
        <Link className={styles.navbarLogout} to="/" onClick={handleLogout}>Sair</Link>
    </>
) : (
    <>
        <Link className={styles.navbarLogin} to="/user/login">Minha Conta</Link>
        <Link className={styles.navbarCadastro} to="/user/register">Cadastro</Link>
    </>
)}
</div>
        </div>
    );
};

export default Navbar;