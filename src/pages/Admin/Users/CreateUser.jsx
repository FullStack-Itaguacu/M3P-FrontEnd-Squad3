import { useState } from "react";
import UserForm from "../../../components/Form/UserForm";
import { getCep } from "../../../Services/api";
import styles from "./CreateUser.module.css";
import { signupAdmin } from "../../../Services/api";

const CreateUser = () => {
  const [user, setUser] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
    phone: "",
    email: "",
    userType: "",
    password: "",
    confirmPassword: "",
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    complement: "",
    lat: "",
    long: "",
  });

  const handleSearchCep = async () => {
    try {
      const response = await getCep(user.cep);

      if (response) {
        setUser((prevUser) => ({
          ...prevUser,
          street: response.street,
          neighborhood: response.neighborhood,
          city: response.city,
          state: response.state,
          latitude: response.location.coordinates.latitude,
          longitude: response.location.coordinates.longitude,
        }));
      }
    } catch (error) {
      alert("Erro: CEP não encontrado");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      signupAdmin(user);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <img src="/screen.png" alt="" />
        </div>
      </div>
      <h1 className={styles.titulo}>Criar novo usuário</h1>
      <UserForm
        user={user}
        handleSearchCep={handleSearchCep}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateUser;
