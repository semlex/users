import { Grid, Button } from '@mui/material';

interface UserActionsProps {
  onClickEditUser: () => void;
  onClickEditPassword: () => void;
}

const UserActions = ({ onClickEditUser, onClickEditPassword }: UserActionsProps) => {
  return (
    <Grid container gap={3}>
      <Grid item>
        <Button variant="contained" onClick={onClickEditUser}>
          Редактировать профиль
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onClickEditPassword}>
          Смена пароля
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserActions;
