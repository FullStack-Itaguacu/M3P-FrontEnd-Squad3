import { useState } from "react";
import UserForm from "../../../components/Form/UserForm";
import { getCep } from "../../../Services/api";
import { signupAdmin } from "../../../Services/api";
//import { useApi } from "../../../hooks/useApi";

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

      if (
        response.name === "CepPromiseError" &&
        response.errors.some((error) => error.message === "CEP NAO ENCONTRADO")
      ) {
        alert("CEP não encontrado");

        setUser((prevUser) => ({ ...prevUser, cep: "" }));
      } else {
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
      alert("Erro ao buscar o CEP");
      console.log(error);
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

      if (cadastrarUser.status === 201) {
        alert("Usuário cadastrado com sucesso!");
      }

      if (cadastrarUser.status === 400) {
        alert("requisição inválida");
      }

      if (cadastrarUser.status === 401) {
        alert("não autorizado");
      }

      if (cadastrarUser.status === 403) {
        alert("proibido");
      }

      if (cadastrarUser.status === 409) {
        alert("conflito");
      }

      if (cadastrarUser.status === 422) {
        alert("entidade invalida");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <>
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
