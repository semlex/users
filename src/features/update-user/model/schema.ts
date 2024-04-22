import * as yup from 'yup';

export const schema = yup
  .object({
    fullName: yup.string().required('Необходимо ввести ФИО'),
  })
  .required();
