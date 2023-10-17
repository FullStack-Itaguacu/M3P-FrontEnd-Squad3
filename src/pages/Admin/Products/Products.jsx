import React from "react";
import { useState } from "react";
import {cadastrarProduto, uploadImage} from "../../../Services/api"
import Table from "../../../components/Table/Table"
import styles from "./Products.module.css"


function NewProduct () {
    const [name, setName] = useState('');
    const [labName, setLabName] = useState('');
    const [imageLink, setImageLink] = useState ('');
    const [dosage, setDosage] = useState('');
    const [typeDosage, setTypeDosage] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [description, setDescription] = useState('');
    const [listProducts, setListProducts] = useState([]);

    

    const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwZWRybzVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJQZWRybyBTaWx2YSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5NzQ5OTUyMH0.xevNkncng-I-5z2lN2ZTpOnqSwiWGXTFHgw6vsUhsfM"

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

        // Função para adicionar um novo produto à lista
  const handleAddProduct = () => {
    const newProduct = {
      name,
      labName,
      image: image,
      dosage,
      typeDosage,
      unitPrice,
      totalStock,
      typeProduct,
      description,
    };

    // Adicionar o novo produto à lista
    setListProducts([...listProducts, newProduct]);

    // Limpar os campos após adicionar o produto
    setName('');
    setLabName('');
    setImage(null);
    setDosage('');
    setTypeDosage('');
    setUnitPrice('');
    setTotalStock('');
    setTypeProduct('');
    setDescription('');
  };

  // Função para lidar com a mudança da imagem
   const handleImageChange = async (e) => {
      const selectedImage = e.target.files[0];

      if (selectedImage) {
          try {
              const response = await uploadImage(selectedImage, auth);
              setImageLink(response.links[0]);

          } catch (error) {
              // Lide com erros, se necessário.
              console.error("Erro ao fazer upload da imagem:", error);
          }
      }
  }   

  async function haddlerNewProduct(event) {
    event.preventDefault();
    const allValuesFilled = Object.values(product).every((value, key) => {
        if (key === "description") {
          return false; 
        }
        
        return value !== undefined && value !== null && value !== "";
      });
    
      if (!allValuesFilled) {
        
        const registerProduct = await cadastrarProduto(product);
        console.log(registerProduct);
        handleAddProduct();
      } else {
        console.log("Pelo menos um valor obrigatório está vazio.",product);
      }
}
            return (
                <div className = {styles.fomulario}>
                    <div>
                    <h2 className={styles.titulo}>Cadastro de Produtos</h2>
                    </div>

                    <div className={styles.gridContainer}>

                    <form onSubmit={haddlerNewProduct}>
                            
                        <div className={styles.grupo1}>
                        <div>
                            <label className={styles.labelNome} htmlFor="nomeProduto"> Nome do Produto:</label>
                            <input className={styles.inputProduto} type="text" name="nome-produto" id="nome-produto" placeholder="Nome do produto"  onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div className={styles.tipoMedicamento}>
                            <label className={styles.labelTipoMedicamento} htmlFor="tipoProduto">Tipo Produto:</label>
                            <select className={styles.selecDosagem}  name="tipo-produto" id="tipo-produto"   onChange={(e) => setTypeProduct(e.target.value)} required>
                                <option value="">Selecione</option>
                                <option value="Não controlado">Não controlado</option>
                                <option value="Controlado">Controlado</option>
                            </select>
                        </div>

                            <div>
                            <label htmlFor="tipo-dosagem-produto">Tipo dosagem:</label>
                            <select className={styles.inputTipoProduto}  name="tipo-dosagem" id="tipo-dosagem"   onChange={(e) => setTypeDosage(e.target.value)} required>
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

                        <div className={styles.grupo2}>
                        <div >
                            <label  htmlFor="dosagem-produto">Dosagem:</label>
                            <input className={styles.inputProduto} type="text" name="dosagem-produto" id="dosagem-produto" placeholder="Dosagem"  onChange={(e) => setDosage(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="nome-laboratorio">Laboratório:</label>
                            <input className={styles.inputProduto}  type="text" name="nome-laboratorio" id="nome-laboratorio" placeholder="Laboratório"   onChange={(e) => setLabName(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="descricao-produto">Descrição:</label>
                            <textarea className={styles.inputDescricao}  name="descricao-produto" id="descricao-produto" placeholder="Descrição do medicamento"  onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        </div>

                         <div className={styles.grupo3}>
                        <div>
                            <label  htmlFor="total-estoque">Quantidade:</label>
                            <input className={styles.inputProduto} type="text" name="totalEstoque" id="totalEstoque" placeholder="Total estoque" onChange={(e) => setTotalStock(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="preco-produto">Preço: R$</label>
                            <input className={styles.inputProduto} type="text" min="0" name="preco-produto" id="preco-produto" placeholder="Preço" onChange={(e) => setUnitPrice(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="imagemProduto">Imagem:</label>
                            <input className={styles.inputImagem} type="file" name="imagem-produto" id="imagem-produto"
                                accept="image/*" onChange={handleImageChange} required />
                        </div>
                        </div>

                            <div>
                            <button className={styles.buttonProdutos}> Cadastrar </button>
                            </div>
                              <Table listProducts={listProducts} />
                    </form>
                </div>
    </div>
  );
  
            }
            

            export default NewProduct;