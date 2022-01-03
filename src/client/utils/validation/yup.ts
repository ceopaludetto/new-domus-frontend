import * as Yup from "yup";

Yup.setLocale({
  string: {
    email: "E-mail inválido",
  },
  mixed: {
    required: "Campo obrigatório",
  },
});

export { Yup };
