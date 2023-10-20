import React, { useState, useEffect } from "react";
import styles from './Table.module.css';
import useApi from "../../hooks/useApi";
import Modal from "../Modal/Modal";

const Table = () => {
    const [products, setProducts] = useState({ products: [] });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name"); 
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [buscar, setBuscar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { listAdminProducts } = useApi();

    useEffect(() => {
        if (buscar) {
            fetchProducts();
        }
    }, [buscar]);

    async function fetchProducts() {
        const data = await listAdminProducts();
        setProducts(data);
    }
    async function fetchProductsFilter(filter) {
        const data = await listAdminProducts(filter);
        setProducts(data);
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleModalSave = (updatedProduct) => {
        const updatedProducts = products.products.map((product) => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;
        });
        setProducts({ products: updatedProducts });
        setShowModal(false);
        setSelectedProduct(null);
    };

    const mapProducts = () => {
        const filteredProducts = products.products.filter((product) => {
            if (searchTerm) {
                if (searchType === "name") {
                    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
                }
            }
            return true;
        });

        return filteredProducts.map((product) => (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.dosage}</td>
                <td>{product.typeProduct}</td>
                <td>{product.unitPrice}</td>
                <td>{product.description}</td>
                <td>{product.totalStock}</td>
                <td className={styles.containerBtn}>
                    <button className={styles.buttonEditar} onClick={() => handleEdit(product)}>Editar</button>
                </td>
            </tr>
        ));
    };

    return (
        <div className={styles.containerPrimary}>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={() => setBuscar(true)}>Buscar Produtos</button>
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
                    {buscar ? mapProducts() : null}
                </tbody>
            </table>
            <div className={styles.containerPagination}>
                <button className={styles.buttonPagination} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                <button className={styles.buttonPagination} onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
            </div>
            {showModal && (
                <Modal onClose={handleModalClose}>
                    <h2>Editar Produto</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleModalSave(selectedProduct);
                    }}>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
                        <label htmlFor="image">Imagem:</label>
                        <input type="text" id="image" value={selectedProduct.image} onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })} />
                        <label htmlFor="dosage">Dosagem:</label>
                        <input type="text" id="dosage" value={selectedProduct.dosage} onChange={(e) => setSelectedProduct({ ...selectedProduct, dosage: e.target.value })} />
                        <label htmlFor="quantity">Quantidade:</label>
                        <input type="text" id="quantity" value={selectedProduct.totalStock} onChange={(e) => setSelectedProduct({ ...selectedProduct, totalStock: e.target.value })} />
                        <button type="submit">Salvar</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Table;