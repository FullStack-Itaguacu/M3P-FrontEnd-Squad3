import { Link } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import React from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";

const AdminLogin = () => {
  return (
    <div className={styles["login-container"]}>
      <form action={styles["formulario"]}>
        <h1 className={styles["titulo"]}>Bem vindo</h1>
        <div className={styles["input-container"]}>
          <label for="email">e-mail</label>
          <input
            type="email"
            name="email"
            placeholder="digite seu email"
            autoComplete="off"
          />
          <MdEmail className={styles["icons"]} />
          <label for="password">senha</label>
          <input
            type="password"
            name="password"
            placeholder="digite sua senha"
          />
          <MdVpnKey className={styles["icons"]} />
        </div>
        <input type="submit" value="Login" />
        <div className={styles["register-container"]}>
          <p>Não tem uma conta?</p>
          <a href="#">Registrar</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
