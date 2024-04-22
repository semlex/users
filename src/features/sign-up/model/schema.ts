import * as yup from 'yup';

export const schema = yup
  .object({
    fullName: yup.string().required('Необходимо ввести ФИО'),
    email: yup.string().email('Неправильный email').required('Необходимо ввести email'),
    password: yup
      .string()
      .required('Необходимо ввести пароль')
      .min(6, 'Пароль должен быть не менее 6 симоволов'),
    confirmPassword: yup
      .string()
      .required('Необходимо ввести подтверждение пароля')
      .oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
  })
  .required();
