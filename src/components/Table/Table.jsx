import React, { useState, useEffect } from "react";
import styles from './Table.module.css';
import useApi from "../../hooks/useApi";
import ModalEdit from "../Modal/Modal";

const Table = ({ buscarProduct }) => {
    const [products, setProducts] = useState({ products: [] });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [typeProduct, setTypeProduct] = useState('');
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);


    const { listAdminProducts } = useApi();
    const RESULTS_PER_PAGE = 20;


    useEffect(() => {

        fetchProducts()

    }, [buscarProduct]);


    // Função para buscar os dados com base na página
    async function fetchPage(page) {
        const offset = page * RESULTS_PER_PAGE;
        const params = {
            offset,
            limit: RESULTS_PER_PAGE,
            typeProduct: typeProduct,
            name: searchName
        }
        const data = await listAdminProducts(params);
        console.log(data);

        // retorna dados e informações de paginação
        return {
            data,
            total: data.total,
            currentPage: page
        }
    }




    // Função para calcular o total de páginas
    function getTotalPages(totalResults) {
        return Math.ceil(totalResults / RESULTS_PER_PAGE);
    }

    // Usando as funções quando o componente é montado e quando a página é alterada
    useEffect(() => {
        fetchPage(currentPage).then(response => {
            setProducts(response.data);
            setTotalPages(getTotalPages(response.total));
        })
    }, [currentPage])



    async function fetchProducts() {
        const data = await listAdminProducts();
        setProducts(data);

    }
    async function fetchProductsFilter(params) {
        const data = await listAdminProducts(params);
        setProducts(data);
    }
    console.log(products.total);

    const handleNext = () => {
        if (products.total < 20) {
            return;
        }
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleSearch = (e) => {

        const params = {
            name: searchName
        }
        fetchProductsFilter(params);
    };

    const searchTypeProduct = async (e) => {
        setTypeProduct(e.target.value);
        const params = {
            typeProduct: e.target.value
        }
        fetchProductsFilter(params);;

    };


    const handleEdit = (id) => {
        setModalProductId(id);
        setShowModal(true);
    };


    const mapProducts = () => {

        return products.products.map((product) => (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.dosage}</td>
                <td>{product.typeProduct}</td>
                <td>{product.unitPrice}</td>
                <td>{product.description}</td>
                <td>{product.totalStock}</td>
                <td className={styles.containerBtn}>
                    <button className={styles.buttonEditar} onClick={() => handleEdit(product.id)}>Editar</button>

                </td>
            </tr>
        ));
    };

    return (
        <div className={styles.containerPrimary}>
            <div className={styles.search}>
                <div className={styles.containerInput}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                    >Buscar</button>
                </div>
                <select
                    value={typeProduct}
                    onChange={searchTypeProduct}
                >
                    <option value="">Selecione</option>
                    <option value="Não controlado">Não controlado</option>
                    <option value="Controlado">Controlado</option>
                </select>
            </div>
            <table className={styles.colunasTabela}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Produto</th>
                        <th>Dosagem</th>
                        <th>Tipo produto</th>
                        <th>Preço R$</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {mapProducts()}
                </tbody>
            </table>
            <div className={styles.containerPagination}>
                <button className={styles.buttonPagination}
                    onClick={handlePrev}>Anterior</button>
                <button className={styles.buttonPagination}
                    onClick={handleNext}>Próxima</button>

            </div>
            <ModalEdit
                id={modalProductId}
                showModal={showModal}
                onShowModal={() => setShowModal(true)}
                onCloseModal={() => setShowModal(false)}
            />

        </div>
    );
};

export default Table;