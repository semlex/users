import { useForm } from 'react-hook-form';
import { SignUpForm } from '../model/types';
import { Input } from '@/shared/ui';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSignUpMutation } from '@/entities/user';
import { schema } from '../model/schema';
import { FirebaseError } from 'firebase/app';

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState<boolean>(false);

  const [signUp, { error }] = useSignUpMutation();

  const { handleSubmit, control, setError } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
      setError('email', {
        type: 'required',
        message: 'Аккаунт с таким email уже существует',
      });
    }
  }, [error, setError]);

  const onSubmit = ({ fullName, email, password }: SignUpForm) => {
    signUp({ fullName, email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input name="fullName" label="ФИО" control={control} />
        <Input name="email" label="Email" control={control} />
        <Input
          name="password"
          label="Пароль"
          type={visiblePass ? 'text' : 'password'}
          control={control}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisiblePass(!visiblePass)} edge="end">
                  {visiblePass ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Input
          name="confirmPassword"
          label="Подтверждение пароля"
          type={visibleConfirmPass ? 'text' : 'password'}
          control={control}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisibleConfirmPass(!visibleConfirmPass)} edge="end">
                  {visibleConfirmPass ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained">
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
