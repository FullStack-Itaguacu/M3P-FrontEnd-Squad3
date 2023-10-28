import React, { useState } from 'react';
import styles from './ModalSucess.module.css';

const ModalSucess = (props) => {
    const [showModal, setShowModal] = useState(true);
    
    const handleShowModal = () => {
        props.onShowModal()
    }

    const handleCloseModalSucess = () => {
        props.onCloseModalSucess();
    }

    const handleCloseModalSucessOk = () => {
        setShowModal(false);
        props.onCloseModalSucess();
    };

    return (
        <div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h1>Produto cadastrado com sucesso!</h1>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={handleCloseModalSucessOk}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalSucess;
