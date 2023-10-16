import styles from "./AdminLogin.module.css";
import React, { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const navigate = useNavigate();

  function validarEmail(email) {
    const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return valEmail.test(email);
    console.log("validarEmail:", result);
    return result;
  }

  function validarSenha(senha) {
    const valSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return valSenha.test(senha);
    console.log("validarSenha:", result);
    return result;
  }

  function validLog(e) {
    e.preventDefault();

    if (!validarEmail(email)) {
      setErroEmail("Campo email é obrigatório!");
      return;
    }
    setErroEmail("");

    if (!validarSenha(senha)) {
      setErroSenha(
        "A senha deve ter pelo menos 8 caracteres entre letras e números."
      );
      return;
    }
    setErroSenha("");
    navigate("/login/admin");
  }

  return (
    <div className="imagem-login">
      <div className={styles["login-container"]}>
        <form onSubmit={validLog} className={styles["formulario"]}>
          <h1 className={styles["titulo"]}>Bem vindo</h1>
          <div className={styles["input-container"]}>
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
              <div className="alert alert-warning" role="alert">
                {erroEmail}
              </div>
            )}
            <MdEmail className={styles["icons"]} />
            <label htmlFor="password">senha</label>
            <input
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              name="password"
              minLength="8"
              id="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              placeholder="digite sua senha"
            />
            {erroSenha && (
              <div className="alert alert-warning" role="alert">
                {erroSenha}
              </div>
            )}
            <MdVpnKey className={styles["icons"]} />
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className={styles["register-container"]}>
          <p>Não tem uma conta?</p>
          <a href="#">Registrar</a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
