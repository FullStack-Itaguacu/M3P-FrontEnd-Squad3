import React from "react";
import { useState } from "react";
import useApi from "../../hooks/useApi";
//import useAuth from "../../hooks/useAuth";
import styles from './Modal.module.css';

const ModalEdit = (props) => {
    const handleShowModal = () => {
        props.onShowModal();
    };

    const handleCloseModal = () => {
        props.onCloseModal();
    };

    const [name, setName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const { updateProduct, uploadImage } = useApi();
    //const {logout} = useAuth();
    const [editOk, setEditOk] = useState(false);
    const [listEditProducts, setListEditProducts] = useState([]);

    const product = {
        name: name,
        imageLink: imageLink,
        dosage: dosage,
        totalStock: totalStock
    }

    const handleAddEditProduct = () => {
        const newEditProduct = {
            name,
            labName,
            imageLink,
            dosage,
            totalStock,

        };
    setListEditProducts([...listEditProducts, newEditProduct]);

        setName('');
        setImageLink('');
        setDosage('');
        setTotalStock('')

    }

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            try {
                const response = await uploadImage(selectedImage);
                setImageLink(response.links[0]);
                setCarregandoImagem(true);
            } catch (error) {
                console.log(error);
                logout()
            }
        }
    }

    async function haddlerEditProdutc(event) {
        event.preventDefault();
        const editProduct = await updateProduct(product);

        if (editProduct .status === 201) {
            setEditOk(true);

        }
    }

    const { id, showModal } = props;

    return (
        <div>
            <button onClick={handleShowModal} className={styles.editButton}>
                Editar Produto {id}
            </button>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleCloseModal}>
                            &times;
                        </span>
                        <div>
                            <form className={styles.formModal} onSubmit={haddlerEditProdutc}>
                            
                            <label className={styles.titulos} htmlFor="nomeProduto"> Nome do Produto:</label>
                            <input className={styles.inputProduto} type="text" name="nome-produto" id="nome-produto" placeholder="Nome do produto" onChange={(e) => setName(e.target.value)} />
                            <label className={styles.titulos} htmlFor="imagemProduto">Imagem:</label>
                            <input className={styles.inputImagem} type="file" name="imagem-produto" id="imagem-produto"
                                accept="image/*" onChange={handleImageChange}  />
                            <label className={styles.titulos} htmlFor="dosagem-produto">Dosagem:</label>
                            <input className={styles.inputProduto} type="number" name="dosagem-produto" id="dosagem-produto" placeholder="Dosagem" onChange={(e) => setDosage(e.target.value)}/>
                            <label className={styles.titulos} htmlFor="total-estoque">Quantidade:</label>
                            <input className={styles.inputProduto} type="number" name="totalEstoque" id="totalEstoque" placeholder="Total estoque" onChange={(e) => setTotalStock(e.target.value)}  />
                                <button  type="submit" className={styles.saveButton}>
                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalEdit;