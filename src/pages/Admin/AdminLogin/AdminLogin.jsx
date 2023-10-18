import styles from "./AdminLogin.module.css";
import React, { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { loginAdmin } from "../../../Services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  function validarEmail(email) {
    const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return valEmail.test(email);
  }

  async function validLog(e) {
    e.preventDefault();

    if (!validarEmail(email)) {
      setErroEmail("Campo email é obrigatório!");
      return;
    }
    setErroEmail("");

    setErroSenha("");
    console.log("email", email);

    
    const response = await loginAdmin(email, senha);
    const data = ResponseLogin(response)
  }

    function ResponseLogin(response) {
      if (!response.ok) {
        throw new Error(response.statusText);
        
      }
      return response.json();
}

  return (
    <div className={styles.containerPrimario}>
      <div className={styles.imagemContainer}>
        <img src="/screen.png" alt="" />
      </div>
      <h1 className={styles.tituloLogin}>Bem vindo</h1>
      <form className={styles.formContainer} onSubmit={validLog}>
        <label htmlFor="email">e-mail</label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="digite seu email"
          autoComplete="off"
        />
        {erroEmail && (
          <div className={styles.alertWarning} role="alert">
            {erroEmail}
          </div>
        )}
        <div className={styles.icons}>
          <MdEmail />
        </div>
        <label htmlFor="password">senha</label>
        <input
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          name="password"
          minLength="8"
          id="password"
          placeholder="digite sua senha"
        />
        {erroSenha && (
          <div className={styles.alertWarning} role="alert">
            {erroSenha}
          </div>
        )}
        <div className={styles.icons}>
          <MdVpnKey />
        </div>
        <button className={styles.enviarLogin} type="submit" value="Entrar">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
