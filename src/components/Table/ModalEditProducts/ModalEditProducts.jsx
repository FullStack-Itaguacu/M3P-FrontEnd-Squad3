import React from "react";
import styles from "./ModalEditProducts.module.css";
import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from "../../Loading_Snipper/Loading_Snipper";
import useAuth from "../../../hooks/useAuth";

const ModalEditProducts = ({ productId, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(true);

    const { logout } = useAuth();
    const { updateProduct, uploadImage, getProductById } = useApi();


    useEffect(() => {
        fetchUser(productId);
    }, [productId]);



    const fetchUser = async (productId) => {
        const { data } = await getProductById(productId);
        setName(data.produto.name);
        setImageLink(data.produto.imageLink);
        setDosage(data.produto.dosage);
        setTotalStock(data.produto.totalStock);
        setUnitPrice(`R$ ${data.produto.unitPrice},00`);
        setLoading(false);

    };


    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            try {
                const response = await uploadImage(selectedImage);
               
                setImageLink(response.data.links[0]);
            } catch (error) {
                console.log(error);
                // logout()
            }
        }
    }


    const handleSave = async (e) => {
        e.preventDefault();


        const dataUpdateUser = {
            productId: productId,

        }

        const updateDataUer = await updateUser(dataUpdateUser);
        console.log(updateDataUer);
        onSave();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Editar Produto</h2>
                {loading ? <LoadingSpinner /> :
                    <form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputImagem}>
                            <label htmlFor="imageLink">Imagem:</label>
                            <div className={styles.modalImg}><img src={imageLink} alt="" /></div>
                            
                                <input
                                    type="file"
                                    name="imageLink"
                                    id="imageLink"
                                    accept="image/*" onChange={handleImageChange} />
                            
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dosage">Dosagem:</label>
                            <input
                                type="text"
                                id="dosage"
                                value={dosage}
                                onChange={(e) => setDosage(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="totalStock">Total em Estoque:</label>
                            <input
                                type="number"
                                id="totalStock"
                                value={totalStock}
                                onChange={(e) => setTotalStock(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="unitPrice">Preço Unitário:</label>
                            <input
                                type="string"
                                id="unitPrice"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <button className={styles.buttonCancel} onClick={onClose}>Cancel</button>
                            <button className={styles.buttonSave} onClick={handleSave}>Salvar</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default ModalEditProducts;
