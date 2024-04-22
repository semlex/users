import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, InputAdornment, IconButton, Button } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { Modal, Input } from '@/shared/ui';
import { schema } from '../model/schema';
import { UpdatePasswordForm } from '../model/types';
import { useUpdatePasswordMutation } from '../api/update-password.api';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

interface UpdatePasswordProps {
  open: boolean;
  onClose: () => void;
}

const defaultValues = {
  newPassword: '',
  confirmNewPassword: '',
};

const UpdatePassword = ({ open, onClose }: UpdatePasswordProps) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [visibleNewPass, setVisibleNewPass] = useState<boolean>(false);
  const [visibleConfirmNewPass, setVisibleConfirmNewPass] = useState<boolean>(false);

  const [updatePassword, { isSuccess, isLoading, error, reset: resetMutation }] =
    useUpdatePasswordMutation();

  const {
    handleSubmit,
    control,
    setError,
    reset: resetForm,
  } = useForm<UpdatePasswordForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        setError('password', {
          type: 'required',
          message: 'Неправильный пароль',
        });
      }
    }
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      resetForm({}, { keepDefaultValues: true });
      resetMutation();
      onClose();
    }
  }, [isSuccess, isLoading, onClose, resetForm, resetMutation]);

  const onSubmit = ({ password, newPassword }: UpdatePasswordForm) => {
    updatePassword({ password, newPassword });
  };

  return (
    <Modal title="Смена пароля" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
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
            name="newPassword"
            label="Новый пароль"
            type={visibleNewPass ? 'text' : 'password'}
            control={control}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisibleNewPass(!visibleNewPass)} edge="end">
                    {visibleNewPass ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Input
            name="confirmNewPassword"
            label="Подтверждение нового пароля"
            type={visibleConfirmNewPass ? 'text' : 'password'}
            control={control}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setVisibleConfirmNewPass(!visibleConfirmNewPass)}
                    edge="end"
                  >
                    {visibleConfirmNewPass ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdatePassword;
