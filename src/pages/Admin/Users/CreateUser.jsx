import { useState } from "react";
import UserForm from "../../../components/Form/UserForm";
//import useApi from "../../../hooks/useApi";
import { getCep } from "../../../Services/api";
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
    latitude: "",
    longitude: "",
  });

  //const { getCep, signupAdmin } = useApi;

  const handleSearchCep = async () => {
    try {
      const response = await getCep(user.zip);

      if (
        response.name === "CepPromiseError" &&
        response.errors.some((error) => error.message === "CEP NAO ENCONTRADO")
      ) {
        alert("CEP não encontrado");

        setUser((prevUser) => ({ ...prevUser, zip: "" }));
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

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    console.log("Início de handleSubmit");
    try {
      const salveUser = await signupAdmin(token, user);
      console.log(salveUser);
      console.log("Após a requisição Axios");
      switch (salveUser.status) {
        case 201:
          console.log("Usuário cadastrado com sucesso!");
          break;
        case 400:
          console.log("Requisição inválida!");
          break;
        case 401:
          console.log("Não autorizado!");
          break;
        case 409:
          console.log("Usuário já cadastrado!");
          break;
        case 422:
          console.log("Dados inválidos!");
          break;
        default:
          console.log("Erro ao cadastrar usuário!");
          break;
      }
      console.log("Após o switch");
      console.log("Teste antes do switch");
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
