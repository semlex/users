import { User, userApi } from '@/entities/user';
import { getDB } from '@/shared/lib';
import { collection, query, getDocs } from 'firebase/firestore';

const usersApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      queryFn: async () => {
        try {
          const db = getDB();
          const usersRef = collection(db, 'users');
          const usersQuery = query(usersRef);
          const users = await getDocs(usersQuery);

          return {
            data: users.docs.map((doc) => ({ ...doc.data() })) as User[],
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
