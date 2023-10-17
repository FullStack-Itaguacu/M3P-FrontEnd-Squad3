import { useState } from "react";
import PropTypes from "prop-types";
import { isPasswordValid, isFormValid } from "../../Services/PasswordValidate";
import { isCPFValid } from "../../Services/CpfValidate";
import InputMask from "react-input-mask";

const UserForm = ({
  user,
  handleSearchCep,
  handleSubmit,
  handleInputChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegex = /^\(\d{3}\) \d{5}-\d{4}$/;

  const handleCPFChange = (e) => {
    const isValid = isCPFValid(e.target.value);
    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });

    if (!isValid) {
      alert("CPF inválido. Verifique o formato.");
    }
  };

  const handlePhoneChange = (e) => {
    const isValid = phoneRegex.test(e.target.value);
    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });

    if (!isValid) {
      alert("Telefone inválido. Verifique o formato (048) 99999-9999.");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid(user) && isCPFValid(user.cpf)) {
          handleSubmit(e);
        } else {
          alert(
            "Por favor, verifique se a senha digitada atende os requisitos ou se o CPF é válido."
          );
        }
      }}
    >
      <label htmlFor="fullName">
        Nome Completo:
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="cpf">
        CPF:
        <InputMask
          mask="999.999.999-99"
          maskPlaceholder={null}
          type="text"
          id="cpf"
          name="cpf"
          value={user.cpf}
          onBlur={handleCPFChange}
          onChange={handleInputChange}
        />
        {!isCPFValid(user.cpf) && user.cpf && (
          <span className="error">CPF inválido. Verifique o formato.</span>
        )}
      </label>
      <label htmlFor="birthDate">
        Data de Nascimento:
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={user.birthDate}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="phone">
        Telefone:
        <InputMask
          mask="(999) 99999-9999"
          maskPlaceholder={null}
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onBlur={handlePhoneChange}
          onChange={handleInputChange}
        />
        {!phoneRegex.test(user.phone) && user.phone && (
          <span className="error">Telefone inválido. Verifique o formato.</span>
        )}
      </label>

      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="userType">
        Tipo de Usuário:
        <select
          id="userType"
          name="userType"
          value={user.userType}
          onChange={handleInputChange}
        >
          <option value="ADMIN">Administrador</option>
          <option value="BUYER">Comprador</option>
        </select>
      </label>

      <label htmlFor="password">
        Senha:
        <input
          type={showPassword ? "text" : "password"} // Altera o tipo para exibir/ocultar senha
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => {
            handleInputChange(e);
            // Chama a validação da senha ao alterar o campo
            if (e.target.value) {
              isPasswordValid(e.target.value);
            }
          }}
        />
        {!isPasswordValid(user.password) && user.password && (
          <span className="error">
            Senha inválida. Deve conter no mínimo 8 caracteres, incluindo uma
            letra maiúscula, uma letra minúscula, um número e um caractere
            especial.
          </span>
        )}
      </label>

      <label htmlFor="confirmPassword">
        Confirmar Senha:
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputChange}
        />
        {user.password !== user.confirmPassword && (
          <span className="error">As senhas não coincidem</span>
        )}
      </label>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)} // Alterna entre exibir/ocultar senha
      >
        {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
      </button>

      <label htmlFor="cep">
        CEP:
        <InputMask
          mask="99999-999"
          maskPlaceholder={null}
          type="text"
          id="cep"
          name="cep"
          value={user.cep}
          onChange={handleInputChange}
        />
      </label>

      <button type="button" onClick={handleSearchCep}>
        Buscar CEP
      </button>
      <label>
        Rua:
        <input
          type="text"
          id="street"
          name="street"
          value={user.street}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Número:
        <input
          type="text"
          id="number"
          name="number"
          value={user.number}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Bairro:
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={user.neighborhood}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Cidade:
        <input
          type="text"
          id="city"
          name="city"
          value={user.city}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Estado:
        <input
          type="text"
          id="state"
          name="state"
          value={user.state}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Complemento:
        <input
          type="text"
          id="complement"
          name="complement"
          value={user.complement}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Latitude:
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={user.latitude}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={user.longitude}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleSearchCep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default UserForm;