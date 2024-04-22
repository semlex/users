import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/shared/lib';
import { Input, Modal } from '@/shared/ui';
import { UpdateUserForm } from '../model/types';
import { schema } from '../model/schema';
import { Button, Stack } from '@mui/material';
import { useUpdateUserMutation } from '@/entities/user';

interface UpdateProfileProps {
  open: boolean;
  onClose: () => void;
}

const UpdateUser = ({ open, onClose }: UpdateProfileProps) => {
  const userData = useAppSelector((state) => state.user);

  const [updateUser, { isSuccess, isLoading, reset: resetMutation }] = useUpdateUserMutation();

  const { handleSubmit, control } = useForm<UpdateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: userData.fullName,
    },
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      resetMutation();
      onClose();
    }
  }, [isSuccess, isLoading, onClose, resetMutation]);

  const onSubmit = async ({ fullName }: UpdateUserForm) => {
    updateUser({ fullName });
  };

  return (
    <Modal title="Редактирование профиля" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Input name="fullName" label="ФИО" control={control} />
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateUser;
