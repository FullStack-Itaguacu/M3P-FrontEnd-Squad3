import { useState } from "react";
import useApi from "../../../hooks/useApi";
import ModalSucess from "../../../components/Modal/ModalSucess"
import styles from "./Products.module.css"


function NewProduct() {
    const [name, setName] = useState('');
    const [labName, setLabName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [typeDosage, setTypeDosage] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [description, setDescription] = useState('');
    const { cadastrarProduto, uploadImage } = useApi();
    const [carregandoImagem, setCarregandoImagem] = useState(false);



    const product = {
        name: name,
        labName: labName,
        imageLink: imageLink,
        dosage: parseInt(dosage),
        typeDosage: typeDosage,
        unitPrice: parseFloat(unitPrice),
        totalStock: parseInt(totalStock),
        typeProduct: typeProduct,
        description: description,
    };


    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        const response = await uploadImage(selectedImage);
        console.log(response.data.links[0]);
        setImageLink(response.links[0]);
        setCarregandoImagem(true);

    }

    async function haddlerNewProduct(event) {
        event.preventDefault();
        console.log(product);
        try {
            const registerProduct = await cadastrarProduto(product);
            console.log(registerProduct);

        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div className={styles.conatiner}>
            <div>
                <h2 >Cadastro de Produtos</h2>
            </div>

            <div className={styles.gridContainer}>

                <form onSubmit={haddlerNewProduct}>
                    <div >

                        <div>
                            <label htmlFor="nomeProduto"> Nome do Produto:</label>
                            <input
                                type="text"
                                name="nome-produto"
                                id="nome-produto"
                                placeholder="Nome do produto"
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>



                        <div className={styles.groupInput}>
                            <div>
                                <label htmlFor="tipoProduto">Tipo Produto:</label>
                                <select
                                    name="tipo-produto"
                                    id="tipo-produto"
                                    onChange={(e) => setTypeProduct(e.target.value)}
                                    required>
                                    <option value="">Selecione</option>
                                    <option value="Não controlado">Não controlado</option>
                                    <option value="Controlado">Controlado</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="tipo-dosagem-produto">Tipo dosagem:</label>
                                <select
                                    name="tipo-dosagem"
                                    id="tipo-dosagem"
                                    onChange={(e) => setTypeDosage(e.target.value)}
                                    required>
                                    <option value="">Selecione</option>
                                    <option value="mg">mg</option>
                                    <option value="mcg">mcg</option>
                                    <option value="g">g</option>
                                    <option value="ml">ml</option>
                                    <option value="%">%</option>
                                    <option value="outro">outro</option>
                                </select>
                                                        </div>
                            </div>
                    </div>


                    <div className={styles.groupInput}>
                        <div>
                            <label htmlFor="dosagem-produto">Dosagem:</label>
                            <input
                                type="number"
                                name="dosagem-produto"
                                id="dosagem-produto"
                                placeholder="Dosagem"
                                onChange={(e) => setDosage(e.target.value)}
                                required />
                        </div>

                        <div>
                            <label htmlFor="nome-laboratorio">Laboratório:</label>
                            <input
                                type="text"
                                name="nome-laboratorio"
                                id="nome-laboratorio"
                                placeholder="Laboratório"
                                onChange={(e) => setLabName(e.target.value)}
                                required />
                        </div>
                    </div>



                    <div className={styles.groupInput}>
                        <div >
                            <label htmlFor="total-estoque">Quantidade:</label>
                            <input
                                type="number"
                                name="totalEstoque"
                                id="totalEstoque"
                                placeholder="Total estoque"
                                onChange={(e) => setTotalStock(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="preco-produto">Preço: R$</label>
                            <input
                                type="number"
                                name="preco-produto"
                                id="preco-produto"
                                placeholder="Preço"
                                onChange={(e) => setUnitPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>


                    <label htmlFor="imagemProduto">Imagem:</label>
                    <input
                        type="file"
                        name="imagem-produto"
                        id="imagem-produto"
                        accept="image/*"
                        onChange={handleImageChange}
                        required />

                    <label htmlFor="descricao-produto">Descrição:</label>
                    <textarea
                        name="descricao-produto"
                        id="descricao-produto"
                        placeholder="Descrição do medicamento"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className={styles.buttonProdutos}>
                        <button

                            disabled={carregandoImagem}
                        >
                            Cadastrar
                        </button>

                    </div>

                </form>
            </div>

        </div>

    );
}
export default NewProduct