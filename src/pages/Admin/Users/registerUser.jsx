import React, { useState } from 'react';
import axios from 'axios';
import styles from "./RegisterUser.module.css"
import { useNavigate } from "react-router-dom";




const RegisterUser = () => {
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cep, setCep] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [listUser, setListUser] = useState([])
    //const [signupUser] = useApi();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleAssUser = () => {
    const newUser ={
        cpf:cpf,
        birthDate:birthDate,
        fullName:fullName,
        email:email,
        phone:phone,
        password:password,
        cep:cep,
        state:state,
        city:city,
        neighborhood:neighborhood,
        street:street,
        number:number,
        complement:complement,
        latitude:latitude,
        longitude:longitude,
        };

        setListUser([...listUser, newUser])

        setCpf(''),
        setBirthDate(''),
        setFullName(''),
        setEmail(''),
        setPhone(''),
        setPassword(''),
        setCep(''),
        setState(''),
        setCity(''),
        setNeighborhood(''),
        setStreet(''),
        setNumber(''),
        setComplement(''),
        setLatitude(''),
        setLongitude('')
    }
    const handleCepChange = async (event) => {
        const cep = event.target.value;
        setCep(cep);

        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                setState(response.data.uf);
                setCity(response.data.localidade);
                setNeighborhood(response.data.bairro);
                setStreet(response.data.logradouro);
                setComplement(response.data.complemento);
                setLatitude(response.data.latitude);
                setLongitude(response.data.longitude);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const registerUser = await json(newUser);
            console.log ("Respota da API:", registerUser);
            
            if(registerUser.status===201) {
            handleAssUser ();
            setSuccessMessage('Seu cadastro foi realizado com sucesso.');
            navigate("/user/login")
            }
        } catch (error) {
            if (error.response.status === 409) {
                setErrorMessage('E-mail já cadastrado.');
            } else {
                setErrorMessage('Ocorreu um erro ao realizar o cadastro, tente novamente mais tarde.');
            }
        }
    };

    return (

        <div className={styles.formUser}>
        <div>
            <h2 className={styles.titulo}>Cadastro do Usuário</h2>
        </div>

        <div className={styles.container}>
        <form  onSubmit={handleSubmit}>

        <div>
            <h4 className={styles.dataUser}>Dados do usuário</h4>
        </div>

        <div className={styles.grup1}>
            <div>
                <label className={styles.labelUsuario} htmlFor="fullName">Nome Completo</label>
                <input className={styles.inputUsuario}
                    type="text"
                    id="fullName"
                    value={fullName}
                    placeholder='Nome completo'
                    onChange={(event) => setFullName(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className={styles.labelUsuario} htmlFor="email">Email</label>
                <input className={styles.inputUsuario}
                    type="email"
                    id="email"
                    value={email}
                    placeholder='email@email.com'
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className={styles.labelUsuario} htmlFor="phone">Telefone</label>
                <input className={styles.inputUsuario}
                    type="text"
                    id="phone"
                    value={phone}
                    placeholder='(48)99999-9999'
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    pattern="\(\d{2}\) \d{5}-\d{4}"
                />
            </div>
        </div>

        <div className={styles.grup2}>
            <div>
                <label className={styles.labelUsuario} htmlFor="cpf">CPF</label>
                <input className={styles.inputUsuario}
                    type="text"
                    id="cpf"
                    value={cpf}
                    placeholder='000.000.000-00'
                    onChange={(event) => setCpf(event.target.value)}
                    required
                    pattern="\d{3}\\d{3}\\d{3}\d{2}"
                />
            </div>
            <div>
                <label className={styles.labelUsuario} htmlFor="birthDate">Data Nascimento</label>
                <input className={styles.inputUsuario}
                    type="text"
                    id="birthDate"
                    value={birthDate}
                    placeholder='DD/MM/AAAA'
                    onChange={(event) => setBirthDate(event.target.value)}
                    required
                    pattern="\d{2}/\d{2}/\d{4}"
                />
            </div>
            <div>
                <label className={styles.labelUsuario} htmlFor="password">Senha</label>
                <input className={styles.inputUsuario}
                    type="password"
                    id="password"
                    value={password}
                    placeholder='Senha'
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                />
            </div>
        </div>

                <div>
                    <h4 className={styles.dataAddress}>Endereço Usuário</h4>
                </div>

            <div className={styles.grup3}>
            <div>
                <label className={styles.labelAddress} htmlFor="cep">CEP</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="cep"
                    value={cep}
                    placeholder='88888-888'
                    onChange={handleCepChange}
                    required
                    pattern="\d{5}-\d{3}"
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="state">Estado</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="state"
                    value={state}
                    placeholder='Estado'
                    onChange={(event) => setState(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="city">Cidade</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="city"
                    value={city}
                    placeholder='Cidade'
                    onChange={(event) => setCity(event.target.value)}
                    required
                />
            </div>
        </div>

        <div className={styles.grup4}>
            <div>
                <label className={styles.labelAddress} htmlFor="street">Logradouro</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="street"
                    value={street}
                    placeholder='Logradouro'
                    onChange={(event) => setStreet(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="neighborhood">Bairro</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="neighborhood"
                    value={neighborhood}
                    placeholder='Bairro'
                    onChange={(event) => setNeighborhood(event.target.value)}
                    required
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="number">Número</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="number"
                    value={number}
                    placeholder='Número'
                    onChange={(event) => setNumber(event.target.value)}
                    required
                />
                </div>
            </div>

            <div className={styles.grup5}>
            <div>
                <label className={styles.labelAddress} htmlFor="complement">Complemento</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="complement"
                    value={complement}
                    placeholder='Complemento'
                    onChange={(event) => setComplement(event.target.value)}
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="latitude">Latitude</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="latitude"
                    value={latitude}
                    placeholder='Latitude'
                    onChange={(event) => setLatitude(event.target.value)}
                />
            </div>
            <div>
                <label className={styles.labelAddress} htmlFor="longitude">Longitude</label>
                <input className={styles.inputAddress}
                    type="text"
                    id="longitude"
                    value={longitude}
                    placeholder='Longitude'
                    onChange={(event) => setLongitude(event.target.value)}
                />
            </div>
        </div>
        </form>
        </div>

            <div >
            <button className={styles.buttonUser}>Cadastrar</button>

            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            </div>
        
       
        </div>
    );
};

export default RegisterUser;
