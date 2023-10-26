import { useState, useEffect } from 'react';
import styles from './TableAllProducts.module.css';
import useApi from '../../hooks/useApi';
import LoadingSpinner from '../Loading_Snipper/Loading_Snipper';
import ModalEditProducts from './ModalEditProducts/ModalEditProducts';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const TableAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [typeProduct, setTypeProduct] = useState('');
    const [searchName, setSearchName] = useState('');
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 20,
    });


    const { listAdminProducts } = useApi();

    useEffect(() => {
        getProducts();
    }, [pagination]);


    const getProducts = async () => {
        setLoading(true);
        const response = await listAdminProducts(pagination);
        setProducts(response.data.products);
        setLoading(false);

    };

    const handleEditUser = (userId) => {
        setSelectedProduct(userId);

    };

    const handlePagination = (type) => {
        if (type === 'prev') {
            setPage(prev => prev - 1);
            setPagination(prev => (
                {
                    ...prev,
                    offset: prev.offset - prev.limit
                }
            ));
        } else if (type === 'next') {
            setPage(prev => prev + 1);
            setPagination(prev => (
                { ...prev, offset: prev.offset + prev.limit }
            ));
        }
    }

    async function fetchProductsFilter(params) {
        const data = await listAdminProducts(params);
        setProducts(data.data.products);

    }

    const searchTypeProduct = async (e) => {
        setTypeProduct(e.target.value);
        const params = {
            typeProduct: e.target.value
        }
        fetchProductsFilter(params);;

    };
    const handleSearch = (e) => {

        const params = {
            name: searchName
        }
        fetchProductsFilter(params);
    };
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleSaveUser = () => {
        getProducts()
        setSelectedProduct(null);
    };


    return (
        <>
            {loading ? (

                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.tableContainer}>
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
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome Medicamento</th>
                                <th>Dosage</th>
                                <th>Tipo Medicamento</th>
                                <th>Preço unitário</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.dosage}</td>
                                    <td>{product.typeProduct}</td>
                                    <td>R$ {Number(product.unitPrice).toFixed(2).replace('.', ',')}</td>
                                    <td>{product.description}</td>
                                    <td>{product.totalStock}</td>
                                    <td>
                                        <button className={styles.actionButton} onClick={() => handleEditUser(product.id)}>Editar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className={styles.buttonPagination}>
                        {page === 1 ? <span></span> : <button onClick={() => handlePagination('prev')}>
                            <AiOutlineDoubleLeft />
                            Voltar
                        </button>}

                        {page === totalPages ? <span></span> : <button onClick={() => handlePagination('next')} >
                            Avançar
                            <AiOutlineDoubleRight />
                        </button>}



                    </div>
                </div>)
            }
            {selectedProduct && (
                <ModalEditProducts productId={selectedProduct} onClose={handleCloseModal} onSave={handleSaveUser} />
            )}
        </>
    );
};

export default TableAllProducts;
