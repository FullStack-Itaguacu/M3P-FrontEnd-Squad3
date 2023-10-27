import React from 'react';
import styles from './SucessoModal.module.css';

const SucessoModal = ({ mensagem, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Sucesso!</h2>
                <p>{mensagem}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default SucessoModal;
