import { useState } from "react";
import UserForm from "../../../components/Form/UserForm";
import useApi from "../../../hooks/useApi";
import ErroModal from "../../../components/Modal/ErroModal/ErroModal";
import SucessoModal from "../../../components/Modal/SucessoModal/SucessoModal";

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
  const [erro, setErro] = useState({
    erro: false,
    mensagem: "",
  });

  const [success, setSuccess] = useState({
    success: false,
    mensagem: "",
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

      switch (salveUser.status) {
        case 201:
          setSuccess({
            success: true,
            mensagem: "Usuário cadastrado com sucesso!",
          });
          break;
        case 400:
          setErro({
            erro: true,
            typeErro: "Solicitação invalida",
            mensagem: "Dados enviados invalidos",
          });
          break;
        case 401:
          setErro({
            erro: true,
            typeErro: "Não autorizado",
            mensagem: "Usuário não cadastrado",
          });
          break;
        case 409:
          setErro({
            erro: true,
            typeErro: "Dados enviados já cadastrados",
            mensagem: "Email ou cpf já cadastrados",
          });
          break;
        case 422:
          setErro({
            erro: true,
            typeErro: "Erro de validação",
            mensagem: "Verifique os dados enviados e tente novamente",
          });
          break;
        default:
          setErro({
            erro: true,
            mensagem: "Erro desconhecido",
          });
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
      {erro.erro && (
        <ErroModal
          mensagem={erro.mensagem}
          typeErro={erro.typeErro}
          onClose={() => setErro({ erro: false, mensagem: "" })}
        />
      )}
      {success.success && (
        <SucessoModal
          mensagem={success.mensagem}
          onClose={() => setSuccess({ success: false, mensagem: "" })}
        />
      )}
    </>
  );
};

export default CreateUser;
