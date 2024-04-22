import { useState } from 'react';
import { useAppSelector } from '@/shared/lib';
import { Container, Stack, Typography } from '@mui/material';
import { UpdateUser } from '@/features/update-user';
import { UpdatePassword } from '@/features/update-password';
import { UserData } from '@/entities/user';
import { UserActions } from '@/features/user-actions';

const UserPage = () => {
  const user = useAppSelector((state) => state.user);

  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Stack gap={4}>
          <Typography variant="h4">Профиль</Typography>
          <UserData user={user} />
          <UserActions
            onClickEditUser={() => setOpenEditUser(true)}
            onClickEditPassword={() => setOpenEditPassword(true)}
          />
        </Stack>
      </Container>
      <UpdateUser open={openEditUser} onClose={() => setOpenEditUser(false)} />
      <UpdatePassword open={openEditPassword} onClose={() => setOpenEditPassword(false)} />
    </>
  );
};

export default UserPage;
