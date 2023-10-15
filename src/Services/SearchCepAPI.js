export const SearchCep = (cep, setValue) => {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resposta) => resposta.json())
    .then((dados) => {
      setValue("endereco", {
        cidade: dados.localidade,
        estado: dados.uf,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        numero: dados.numero,
        complemento: dados.complemento,
        cep: dados.cep,
        latitude: dados.latitude,
        longitude: dados.longitude,
      });
    })
    .catch((error) => console.log(error));
};
