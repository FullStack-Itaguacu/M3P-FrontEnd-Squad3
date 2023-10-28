import styles from "./Login.module.css";
import { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { Link } from 'react-router-dom'; 
import useAuth from "../../../hooks/useAuth";
import Navbar from "../../../components/Navbar/navbar"

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


const { userLogin } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await userLogin(email, senha); 
    console.log(response);

  }
  

  return (
      <div >
      <div>
        <Navbar />
      </div>
      <div className={styles.contPrimario}>
          <div className={styles.imgLogin}>
            <img src="/imgLoginAdm.png" alt="" />
      </div>
      <div className={styles.containerDireita}>
        
            <div className={styles.imgContainer}>
              <img src="/screen.png" alt="" />
            </div>
        <h1 className={styles.titLogin}>Bem vindo</h1>
        <div className={styles.forEsquerda}>
        <form className={styles.forContainer} onSubmit={handleLogin}>
          
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
                id="password"
                placeholder="digite sua senha"
              />
        
              <div className={styles.icon}>
                <MdVpnKey />
              </div>
              <div className={styles.registerLink}>
                <p>
                  Não tem cadastro? <Link to="/user/register">Cadastre-se</Link>
                </p>
              </div>
              <button className={styles.envLogin} type="submit" value="Entrar" >
               Entrar 
              </button>
        </form>
        </div>
      </div>
        </div>
        </div>
      )
    }
    
export default Login
