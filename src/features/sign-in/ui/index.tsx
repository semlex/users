import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInForm } from '../model/types';
import { Input } from '@/shared/ui';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { schema } from '../model/schema';
import { useEffect, useState } from 'react';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { useSignInMutation } from '@/entities/user';
import { FirebaseError } from 'firebase/app';

const defaultValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [visiblePass, setVisiblePass] = useState<boolean>(false);

  const [signIn, { error }] = useSignInMutation();

  const { handleSubmit, control, setError } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        setError('email', {
          type: 'required',
          message: 'Неправильный email или пароль',
        });
      }
      if (error.code == 'auth/too-many-requests') {
        setError('email', {
          type: 'required',
          message: 'Слишком много попыток. Повторите позже',
        });
      }
    }
  }, [error, setError]);

  const onSubmit = ({ email, password }: SignInForm) => {
    signIn({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </Stack>
    </form>
  );
};

export default SignIn;
