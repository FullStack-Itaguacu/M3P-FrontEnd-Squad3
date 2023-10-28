import { useState } from "react";
import UserForm from "../../../components/Form/UserForm";
import useApi from "../../../hooks/useApi";

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

  const { getCep, signupAdmin } = useApi();

  const handleSearchCep = async () => {
    const response = await getCep(user.zip);
    setUser((prevUser) => ({
      ...prevUser,
      street: response.street,
      neighborhood: response.neighborhood,
      city: response.city,
      state: response.state,
      latitude: response.location.coordinates.latitude,
      longitude: response.location.coordinates.longitude,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const newUser = {
      user: {
        fullName: user.fullName,
        cpf: user.cpf.replace(/\D/g, ""),
        birthDate: user.birthDate,
        phone: user.phone.replace(/\D/g, ""),
        email: user.email,
        typeUser: user.userType,
        password: user.password,
      },
      addresses: [
        {
          zip: user.zip.replace(/\D/g, ""),
          street: user.street,
          numberStreet: user.number,
          neighborhood: user.neighborhood,
          city: user.city,
          state: user.state,
        },
      ],
    };
    try {
      const salveUser = await signupAdmin(newUser);
      console.log(salveUser);

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
