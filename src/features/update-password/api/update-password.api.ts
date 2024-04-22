import { userApi } from '@/entities/user';
import { UpdatePasswordRequest } from '../model/types';
import { getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/cordova';

const updatePasswordApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    updatePassword: build.mutation<undefined, UpdatePasswordRequest>({
      queryFn: async ({ password, newPassword }) => {
        try {
          const user = getAuth().currentUser;

          if (user) {
            const credential = EmailAuthProvider.credential(user.email || '', password);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
          }

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useUpdatePasswordMutation } = updatePasswordApi;
