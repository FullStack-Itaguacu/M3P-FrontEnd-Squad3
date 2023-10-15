import { Link } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import { MdOutlineEmail, BiUser } from "react-icons/bi";

const AdminLogin = () => {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1 className={styles.title}>Bem Vindo</h1>
        <div className={styles.input}>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            required
          />
          <BiUser className={styles.icon} />
        </div>

        <div className={styles["input-box"]}>
          <input
            type="password"
            className="input-field"
            placeholder="Senha"
            required
          />
          <MdOutlineEmail className={styles.icon} />
        </div>

        <button type="submit" className={styles.btn}>
          Login
        </button>

        <div className={styles["register-link"]}>
          <p>
            Não tem cadastro? <Link to="/">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
