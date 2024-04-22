import * as yup from 'yup';

export const schema = yup
  .object({
    password: yup
      .string()
      .required('Необходимо ввести пароль')
      .min(6, 'Пароль должен быть не менее 6 симоволов'),
    newPassword: yup
      .string()
      .required('Необходимо ввести новый пароль')
      .min(6, 'Пароль должен быть не менее 6 симоволов'),
    confirmNewPassword: yup
      .string()
      .required('Необходимо ввести подтверждение пароля')
      .oneOf([yup.ref('newPassword'), ''], 'Пароли не совпадают'),
  })
  .required();
