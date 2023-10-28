import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css"

const Navbar = () => {
    return (
        <div  >
            

            <div className={styles.navbar}>
            
                <img className={styles.navbarImagem} src="/screen.png" alt="" />
                
                <Link className={styles.navbarCompras} to="/">Minhas Compras</Link>
                <Link className={styles.navbarCarrinho} to="/cart">Carrinho de Compras</Link>
                <Link className={styles.navbarLogin} to="/user/login">Login</Link>
                <Link className={styles.navbarCadastro} to="/user/register">Cadastro</Link>
                <Link className={styles.navbarLogout} to="/">Logout</Link>
                
            </div>
        </div>
    );
};

export default Navbar;

