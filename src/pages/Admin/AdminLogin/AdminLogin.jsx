import { Link } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import { BiLock, BiUser } from "react-icons/bi";

const AdminLogin = () => {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Bem Vindo</h1>
        <div className={styles["input-box"]}>
          <input type="email" placeholder="Email" required />
          <BiUser />
        </div>

        <div className={styles["input-box"]}>
          <input type="password" placeholder="Senha" required />
          <BiLock />
        </div>

        <button type="submit" className={styles.btn}>
          Login
        </button>

        <div className={styles["register-link"]}>
          <p>
            Não tem cadastro? <Link to="/">Cadastre</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
