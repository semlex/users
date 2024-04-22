import { Grid, TextField } from '@mui/material';
import { getFormattedDate } from '@/shared/lib';
import { User } from '../../model/types';

interface UserDataProps {
  user: User;
}

const UserData = ({ user }: UserDataProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="ФИО" value={user.fullName} disabled fullWidth size="small" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField label="Email" value={user.email} disabled fullWidth size="small" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Дата регистрации"
          value={getFormattedDate(user.createdAt)}
          disabled
          fullWidth
          size="small"
        />
      </Grid>
    </Grid>
  );
};

export default UserData;
