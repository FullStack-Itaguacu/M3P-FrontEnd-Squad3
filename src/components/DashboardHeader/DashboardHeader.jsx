import styles from './DashboardHeader.module.css';

const DashboardHeader = () => {
    return(
        <header className={styles.containeHeader}>
           
                <div className={styles.containerImagem}>
                    <img src="/screen.png" alt="" />
                </div>
                <div className={styles.containerText}>
                    <h1>Olá, Fulano</h1>
                    <p>Seja bem-vindo ao Dashboard</p>
                </div>
           
        </header>
    )
}

export default DashboardHeader;