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
  const [userRegistered, setUserRegistered] = useState(false);

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

  const handleCadastroClick = async () => {
    const cpfWithoutMask = user.cpf.replace(/[\D]/g, "");

    const phoneWithoutMask = user.phone.replace(/[\D]/g, "");
    if (
      isFormValid(user) &&
      isCPFValid(cpfWithoutMask) &&
      isPasswordValid(user.password)
    ) {
      const formattedUser = {
        user: {
          fullName: user.fullName,
          email: user.email,
          cpf: cpfWithoutMask,
          birthDate: user.birthDate,
          phone: phoneWithoutMask,
          password: user.password,
          typeUser: user.userType,
        },
        addresses: [
          {
            street: user.street,
            numberStreet: user.number,
            complement: user.complement,
            neighborhood: user.neighborhood,
            city: user.city,
            state: user.state,
            zip: user.cep.replace(/[\D]/g, ""), // Remove a formatação do CEP
            lat: user.latitude,
            long: user.longitude,
          },
        ],
      };

      try {
        console.log(formattedUser);

        setUserRegistered(true);
      } catch (error) {
        alert(
          "Erro ao cadastrar usuário. Verifique os dados e tente novamente."
        );
      }
    } else {
      alert(
        "Por favor, verifique se todos os campos foram preenchidos corretamente."
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid(user) && isCPFValid(user.cpf)) {
          handleSubmit(e);

          setUserRegistered(true);
        } else {
          alert(
            "Por favor, verifique se a senha digitada atende os requisitos ou se o CPF é válido."
          );
        }
      }}
    >
      {userRegistered && (
        <div className="success-message">Usuário cadastrado.</div>
      )}

      <label htmlFor="fullName">
        Nome Completo:
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
          required
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
          required
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
          required
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
          required
        />
      </label>

      <label htmlFor="userType">
        Tipo de Usuário:
        <select
          id="userType"
          name="userType"
          value={user.userType}
          onChange={handleInputChange}
          required
        >
          <option value="ADMIN">Administrador</option>
          <option value="BUYER">Comprador</option>
        </select>
      </label>

      <label htmlFor="password">
        Senha:
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => {
            handleInputChange(e);

            if (e.target.value) {
              isPasswordValid(e.target.value);
            }
          }}
          required
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

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
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
          required
        />
      </label>

      <button type="button" onClick={handleSearchCep}>
        Buscar CEP
      </button>
      <label>
        Logradouro:
        <input
          type="text"
          id="street"
          name="street"
          value={user.street}
          onChange={handleInputChange}
          required
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
          required
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
          required
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
          required
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
          required
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

      <button type="button" onClick={handleCadastroClick}>
        Cadastrar
      </button>
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
