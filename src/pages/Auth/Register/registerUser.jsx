import React, { useState } from 'react';
import useApi from "../../../hooks/useApi";
import styles from "./RegisterUser.module.css";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask'


const RegisterUser = () => {
    
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [zip, setZip] = useState(''); // Corrigi o nome da variável para "cep"
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [listUser, setListUser] = useState([]);
  const { signupUser } = useApi();
  const { getCep } = useApi();
  const navigate = useNavigate();

  const handleAssUser = () => {
    setListUser([...listUser, newUser]);
    
    setCpf('');
  setBirthDate('');
  setFullName('');
  setEmail('');
  setPhone('');
  setPassword('');
  setZip('');
  setState('');
  setCity('');
  setNeighborhood('');
  setStreet('');
  setNumber('');
  setComplement('');
  setLatitude('');
  setLongitude('');
  };

  const handleCepChange = async (event) => {

            const response = await getCep(zip.split('-').join(''));

            if (response) {
                setState(response.state);
                setCity(response.city);
                setNeighborhood(response.neighborhood);
                setStreet(response.street);
                setLatitude(response.location.coordinates.latitude);
                setLongitude(response.location.coordinates.longitude);
            } else {
                alert("Invalid response:", response);
            }
    }

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
        return passwordRegex.test(password);
      };
    
const handleSubmit = async (event) => {
    event.preventDefault();

    if (!zip || !state || !city || !neighborhood || !street || !number) {
        alert('Por favor, preencha todos os campos do endereço.');
    }
    if (!isPasswordValid(password)) {
        alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.');
    }
  

    const newUser = {
        
        user: {
          cpf: cpf.replace(/[^0-9]/g, ''),
          birthDate: birthDate.split("/").reverse().join('-'),
          fullName: fullName,
          email: email,
          phone:phone.replace(/\D/g, ""),
          password: password,
        },
        addresses: [{
            zip:zip.split('-').join(''),
            state: state,
            city: city,
            neighborhood: neighborhood,
            street: street,
            numberStreet: number,
            ...(complement ? { complement } : {}),
            lat: latitude,
            long: longitude,
        },]
        
      };
      

      const registerUser = await signupUser(newUser) 
    
        if (registerUser.status === 201) {
          handleAssUser(); 
        }
        navigate("/user/login")
   
      if (error.response.status === 409) {
        alert("E-mail já cadastrado.");
      } else {
        alert("correu um erro ao realizar o cadastro, tente novamente mais tarde.");
      }
     
    }
   

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
                <InputMask
                    mask="(99)99999-9999"
                    maskChar=""
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(48)99999-9999"
                    id="phone"
                    type="text"
                    className={styles.inputUsuario}
                    required
                />
            </div>
        </div>

        <div className={styles.grup2}>
            <div>
                <label className={styles.labelUsuario} htmlFor="cpf">CPF</label>
                <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    value={cpf}
                    onChange={(event) => setCpf(event.target.value)}
                    placeholder="000.000.000-00"
                    id="cpf"
                    type="text"
                    className={styles.inputUsuario}
                    required
                    />
            </div>
            <div>
                <label className={styles.labelUsuario} htmlFor="birthDate">Data Nascimento</label>
                <InputMask
                    mask="99/99/9999"
                    maskChar=""
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    placeholder="DD/MM/AAAA"
                    id="birthDate"
                    type="text"
                    className={styles.inputUsuario}
                    required
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
                />
            </div>
        </div>

                <div>
                    <h4 className={styles.dataAddress}>Endereço Usuário</h4>
                </div>

            <div className={styles.grup3}>
            <div>
                <label className={styles.labelAddress} htmlFor="zip">CEP</label>
                <InputMask 
                    className={styles.inputAddress}
                    mask="99999-999"
                    maskChar=""
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    placeholder="88888-888"
                    id="zip"
                    type="text"
                    required
                    onBlur={handleCepChange}
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
        <button type="submit" className={styles.buttonUser}>Cadastrar</button>
        </form>
        </div>
        </div>
    );
    }

export default RegisterUser;