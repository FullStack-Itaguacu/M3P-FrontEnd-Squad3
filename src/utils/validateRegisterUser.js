import { isEmail } from 'validator';
import { validate } from 'gerador-validador-cpf'; // Importe a função validate apropriada

export const isValidEmail = (email) => {
  return isEmail(email);
};

export const isValidCpf = (cpf) => {
  if (cpf.length === 11) {
    return validate(cpf); // Certifique-se de que a função validate esteja disponível
  }
  return false;
};

export const isValidPassword = (password) => {
  // Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
  return passwordRegex.test(password);
};

export const formatDateForBackend = (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};