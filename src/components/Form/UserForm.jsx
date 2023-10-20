import { useState } from "react";
import PropTypes from "prop-types";
import { isPasswordValid, isFormValid } from "../../Services/PasswordValidate";
import { isCPFValid } from "../../Services/CpfValidate";
import InputMask from "react-input-mask";
import styles from "./UserForm.module.css";

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
    <div className={styles.container}>
      <form
        className={styles.form}
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
          <div className={styles.success_message}>Usuário cadastrado</div>
        )}

        <div className={styles.user_container}>
          <h3>Dados pessoais</h3>
          <div className={styles.input_box}>
            <label htmlFor="fullName" className={styles.label}>
              Nome Completo:
            </label>

            <input
              className={styles.input_bigger}
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label htmlFor="cpf" className={styles.label}>
              CPF:
            </label>
            <InputMask
              className={styles.input_smaller}
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
              <span className={styles.error_message}>
                CPF inválido. Verifique o formato.
              </span>
            )}
          </div>
          <div className={styles.input_box}>
            <label htmlFor="birthDate" className={styles.label}>
              Data de Nascimento:
            </label>
            <input
              className={styles.input_smaller}
              type="date"
              id="birthDate"
              name="birthDate"
              value={user.birthDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label htmlFor="phone" className={styles.label}>
              Telefone:
            </label>
            <InputMask
              className={styles.input_smaller}
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
              <span className={styles.error_message}>
                Telefone inválido. Verifique o formato.
              </span>
            )}
          </div>
          <div className={styles.input_box}>
            <label htmlFor="email" className={styles.label}>
              E-mail:
            </label>
            <input
              className={styles.input_bigger}
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label htmlFor="userType" className={styles.label}>
              Tipo de Usuário:
            </label>
            <select
              className={styles.select}
              id="userType"
              name="userType"
              value={user.userType}
              onChange={handleInputChange}
              required
            >
              <option value="ADMIN">Administrador</option>
              <option value="BUYER">Comprador</option>
            </select>
          </div>
          <div className={styles.input_box}>
            <label htmlFor="password" className={styles.label}>
              Senha:
            </label>
            <input
              className={styles.input_smaller}
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
              <span className={styles.error_message}>
                Senha inválida. Deve conter no mínimo 8 caracteres, incluindo
                uma letra maiúscula, uma letra minúscula, um número e um
                caractere especial.
              </span>
            )}
          </div>
          <div className={styles.input_box}></div>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar Senha:
          </label>
          <input
            className={styles.input_smaller}
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
          />

          {user.password !== user.confirmPassword && (
            <span className={styles.error_message}>
              As senhas não coincidem
            </span>
          )}

          <button
            className={styles.button_password}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
          </button>
        </div>
        <div className={styles.address_container}>
          <h3>Dados de endereço</h3>
          <div className={styles.input_box}>
            <label htmlFor="cep" className={styles.label}>
              CEP:
            </label>
            <InputMask
              className={styles.input_smaller}
              mask="99999-999"
              maskPlaceholder={null}
              type="text"
              id="cep"
              name="cep"
              value={user.cep}
              onChange={handleInputChange}
              required
            />

            <button
              className={styles.button_cep}
              type="button"
              onClick={handleSearchCep}
            >
              Buscar CEP
            </button>
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Logradouro:</label>
            <input
              className={styles.input_bigger}
              type="text"
              id="street"
              name="street"
              value={user.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Número:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="number"
              name="number"
              value={user.number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Bairro:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={user.neighborhood}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Cidade:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="city"
              name="city"
              value={user.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Estado:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="state"
              name="state"
              value={user.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Complemento:</label>
            <input
              className={styles.input_bigger}
              type="text"
              id="complement"
              name="complement"
              value={user.complement}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Latitude:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="latitude"
              name="latitude"
              value={user.latitude}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Longitude:</label>
            <input
              className={styles.input_smaller}
              type="text"
              id="longitude"
              name="longitude"
              value={user.longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.button_container}>
          <button
            className={styles.button_signup}
            type="button"
            onClick={handleCadastroClick}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleSearchCep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default UserForm;
