import React, { useState, useEffect } from "react";
import styles from'./Table.module.css';
import axios from "axios";

const Table = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(30);


    
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`/products/admin/${(currentPage - 1) * productsPerPage}/${productsPerPage}`);
            setProducts(res.data);
        };
        fetchProducts();
    }, [currentPage, productsPerPage]);

    useEffect(() => {
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.type.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = async (productId, updatedProduct) => {
        await axios.patch(`/products/admin/${productId}`, updatedProduct);
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, ...updatedProduct } : product
        );
        setProducts(updatedProducts);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className={styles.filtro} />
            <table  className={styles.colunasTabela}>
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
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.dosage}</td>
                            <td>{product.type}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className={styles.buttonEditar} onClick={() => handleEdit(product.id, { name: "new name" })}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div >
            <button className={styles.buttonAnterior } onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => paginate(number)} className={currentPage === number ? "active" : ""}>
                    {number}
                </button>
            ))}
            <button className={styles.buttonProximo }
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
            >
                Próximo
            </button>
        </div>
    );
};

export default Table;
