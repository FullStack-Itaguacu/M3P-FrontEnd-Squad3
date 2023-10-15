import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchCep } from "../../../Services/apiSearchCep";

const CreateUser = () => {
  const { register, setValue, control } = useForm();

  const [cpf, setCpf] = useState("");
  const [formattedCpf, setFormattedCpf] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleCpfChange = (event) => {
    const inputCpf = event.target.value.replace(/\D/g, "");
    setCpf(inputCpf);

    setFormattedCpf(
      inputCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    );
  };

  const handleSearchCep = () => {
    SearchCep(cep, setValue, control);
  };

  const handleBirthDateChange = (event) => {
    setbirthDate(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value.replace(/\D/g, "");
    setPhone(inputPhone);

    setFormattedPhone(
      inputPhone.replace(/(\d{3})(\d{5})(\d{4})/, "($1) $2-$3")
    );
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleComplementChange = (event) => {
    setComplement(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      cpf,
      birthDate,
      fullName,
      email,
      phone,
      userType,
      password,
      confirmPassword,
      cep,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
      latitude,
      longitude
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          CPF:
          <input type="text" value={formattedCpf} onChange={handleCpfChange} />
        </label>
        <label htmlFor="">
          Data de Nascimento:
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
        </label>
        <label htmlFor="">
          Nome Completo:
          <input type="text" value={fullName} onChange={handleFullNameChange} />
        </label>
        <label htmlFor="">
          E-mail:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label htmlFor="">
          Telefone:
          <input
            type="text"
            value={formattedPhone}
            onChange={handlePhoneChange}
          />
        </label>
        <label htmlFor="">
          Tipo de Usuário:
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </select>
        </label>
        <label htmlFor="">
          Senha:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label htmlFor="">
          Confirmar Senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <label htmlFor="">
          CEP:
          <input type="text" {...register("cep")} onChange={handleCepChange} />
        </label>
        <button type="button" onClick={handleSearchCep}>
          Buscar CEP
        </button>
        <label htmlFor="">
          Estado:
          <input type="text" value={state} onChange={handleStateChange} />
        </label>
        <label htmlFor="">
          Cidade:
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
        <label htmlFor="">
          Bairro:
          <input
            type="text"
            value={neighborhood}
            onChange={handleNeighborhoodChange}
          />
        </label>
        <label htmlFor="">
          Rua:
          <input type="text" value={street} onChange={handleStreetChange} />
        </label>
        <label htmlFor="">
          Número:
          <input type="text" value={number} onChange={handleNumberChange} />
        </label>
        <label htmlFor="">
          Complemento:
          <input
            type="text"
            value={complement}
            onChange={handleComplementChange}
          />
        </label>
        <label htmlFor="">
          Latitude:
          <input type="text" value={latitude} onChange={handleLatitudeChange} />
        </label>
        <label htmlFor="">
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default CreateUser;
