import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup.string().email('Неправильный email').required('Необходимо ввести email'),
    password: yup
      .string()
      .required('Необходимо ввести пароль')
      .min(6, 'Пароль должен быть не менее 6 симоволов'),
  })
  .required();
