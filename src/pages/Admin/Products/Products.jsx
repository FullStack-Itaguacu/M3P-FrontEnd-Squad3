import React from "react";
import { useState } from "react";
import {cadastrarProduto, uploadImage} from "../../../Services/api"
//import Modal from "../../../components/Modal"
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
  };
  // Função para lidar com a edição de produtos
  const handleEdit = (product) => {
    // Implemente a lógica de edição aqui
  };
       

  async function haddlerNewProduct(event) {
    event.preventDefault();
    const allValuesFilled = Object.values(product).every((value, key) => {
        if (key === "description") {
          return false; 
        }
        
        return value !== undefined && value !== null && value !== "";
      });
    
      if (!allValuesFilled) {
        
        const registerProduct = await cadastrarProduto(product, auth);
        console.log(registerProduct.data);

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
        
                    </form>
                </div>

                <div className={styles.tabelaProdutos}>
        <h2 className={styles.listaProdutos}>Lista de produtos cadastrados</h2>
        <div>
          
        <input className={styles.filtro} type="text" id="txtColuna1" placeholder="Pesquisar"/>
        </div>
        <table className={styles.colunasTabela}>
          <thead >
            <tr>
              <th className={styles.colunaId} >ID</th>
              <th className={styles.colunaNome}>Nome</th>
              <th>Dosagem</th>
              <th>Tipo do Produto</th>
              <th>Preço R$</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
             {listProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.dosage}</td>
                <td>{product.typeProduct}</td>
                <td>{product.unitPrice}</td>
                <td>{product.description}</td>
                <td>{product.totalStock}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
            }
            

            export default NewProduct;