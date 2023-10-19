import styles from "../Users/Users.module.css";
import React, { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { userLogin } from "../../../Services/api";
const { userLogin } = useAuth();
 
function UserLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  async function loginUser(email, password) {
    const chamarLogin = await userLogin(email, password)
    console.log(chamarLogin);
  }
  const handleeSubmit = async (e) => {
    e.preventDefault();
    const response = await userLogin(email, senha); 
    console.log(response);
  }
  

  return (
    <div className={styles.contPrimario}>
      <div className={styles.imgContainer}>
        <img src="/screen.png" alt="" />
      </div>
      <h1 className={styles.titLogin}>Bem vindo</h1>
      <form className={styles.forContainer} onSubmit={handleeSubmit}>
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
          <div className={styles.alertWrg} role="alert">
            {erroEmail}
          </div>
        )}
        <div className={styles.icon}>
          <MdEmail />
        </div>
        <label htmlFor="password">senha</label>
        <input
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          name="password"
          minLength="6"
          id="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$"
          placeholder="digite sua senha"
        />
        {erroSenha && (
          <div className={styles.alertWrg} role="alert">
            {erroSenha}
          </div>
        )}
        <div className={styles.icon}>
          <MdVpnKey />
        </div>
        <button className={styles.envLogin} type="submit" value="Entrar">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
