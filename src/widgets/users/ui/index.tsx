import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getFormattedDate } from '@/shared/lib';
import { useGetUsersQuery } from '../api/users.api';

const UsersList = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Дата регистрации</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getFormattedDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
