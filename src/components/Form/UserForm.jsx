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

  const handleCPFChange = (e) => {
    //const formattedCPF = formatCpf(e.target.value);
    const isValid = isCPFValid(e.target.value); // Realize a validação do CPF
    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });

    // Pode exibir uma mensagem de erro se o CPF for inválido
    if (!isValid) {
      alert("CPF inválido. Verifique o formato.");
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
        <input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />
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

      <label>
        Tipo de Usuário:
        <input
          type="checkbox"
          id="userTypeAdmin"
          name="userType"
          value="ADMIN"
          checked={user.userType === "ADMIN"}
          onChange={handleInputChange}
        />
        <label htmlFor="userTypeAdmin">Administrador</label>
      </label>
      <label>
        <input
          type="checkbox"
          id="userTypeUser"
          name="userType"
          value="USER"
          checked={user.userType === "USER"}
          onChange={handleInputChange}
        />
        <label htmlFor="userTypeUser">Usuário</label>
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
        <input
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
