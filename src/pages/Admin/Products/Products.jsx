import React from "react";
import { useState } from "react";
import styles from "./Products.module.css"


function CadastrarProduto () {
    const [name, setName] = useState('');
    const [labName, setLabName] = useState('');
    const [imageLink, setImageLink] = useState ('');
    const [dosage, setDosage] = useState('');
    const [typeDosage, setTypeDosage] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [description, setDescription] = useState('');


    const produtos = {
        name: name,
        labName: labName,
        imageLink: imageLink,
        dosage: dosage,
        typeDosage: typeDosage,
        unitPrice: unitPrice,
        totalStock: totalStock,
        typeProduct: typeProduct,
        description: description,
        };

        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0];
        
            if (selectedImage) {
              const reader = new FileReader();
              reader.onload = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(selectedImage);
            } else {
              setImage(null);
            }
          };
       

        function haddlerCadastrarProduto(event) {
            event.preventDefault();
            const nomeMedicamento = document.getElementById('nomeMedicamento').value;
            if (produtoJaCadastrado(nomeMedicamento)) {
                statusMessage.textContent = 'Produto já cadastrado com esse nome!';
                return;
              }
            if(name !== "" && labName !== "" &&
            imageLink !== "" && dosage !== "" && typeDosage !== ""
            && unitPrice !== "" && totalStock !== "" && typeProduct !== ""){
                alert("Produto cadastrado com sucesso!")
                //navigate(tabela)

            var resultadoDoCadastro = cadastrarNovoProduto();
            var listaProdutos = JSON.parse(resultadoDoCadastro);
            if(!Array.isArray(listaProdutos)){
                listaProdutos=[];
            }
            listaProdutos.push({...produtos})
           
        }else{
            alert("Preencha todos os campos!")
            }}
        
            return (
                <div className = {styles.fomulario}>
                    <div>
                    <h2 className={styles.titulo}>Cadastro de Produtos</h2>
                    </div>

                    <div className={styles.gridContainer}>

                    <form onSubmit={haddlerCadastrarProduto}>
                            
                        <div className={styles.grupo1}>
                        <div>
                            <label className={styles.labelNome} htmlFor="nomeProduto"> Nome do Produto:</label>
                            <input className={styles.inputProduto} type="text" name="nome-produto" id="nome-produto" placeholder="Nome do produto"  onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div className={styles.tipoMedicamento}>
                            <label className={styles.labelTipoMedicamento} htmlFor="tipoProduto">Tipo Produto:</label>
                            <select className={styles.selecDosagem}  name="tipo-produto" id="tipo-produto"   onChange={(e) => setTypeProduct(e.target.value)} required>
                                <option value="produto-controlado">Não controlado</option>
                                <option value="produto-comum">Controlado</option>
                            </select>
                        </div>

                            <div>
                            <label htmlFor="tipo-dosagem-produto">Tipo dosagem:</label>
                            <input className={styles.inputProduto} type="text" name="tipo-dosagem-produto" id="tipo-dosagem-produto" placeholder="Tipo de dosagem"  onChange={(e) => setTypeDosage(e.target.value)} required/>
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
                </div>
            )}
            

            export default CadastrarProduto;