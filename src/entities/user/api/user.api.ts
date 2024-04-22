import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, where, query, updateDoc, getDocs } from 'firebase/firestore';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getDB } from '@/shared/lib';
import { User, SignInRequest, SignUpRequest, UpdateProfileRequest } from '../model/types';

export const userApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUpRequest>({
      queryFn: async ({ fullName, email, password }) => {
        try {
          const auth = getAuth();
          const db = getDB();
          const user = (await createUserWithEmailAndPassword(auth, email, password)).user;

          await updateProfile(user, { displayName: fullName });

          await addDoc(collection(db, 'users'), {
            id: auth.currentUser?.uid,
            fullName: auth.currentUser?.displayName,
            email: auth.currentUser?.email,
            createdAt: auth.currentUser?.metadata.creationTime,
          });

          const newUser: User = {
            id: auth.currentUser?.uid || '',
            fullName: auth.currentUser?.displayName || '',
            email: auth.currentUser?.email || '',
            createdAt: auth.currentUser?.metadata.creationTime || '',
          };

          return {
            data: newUser,
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Users'],
    }),
    signIn: builder.mutation<UserCredential, SignInRequest>({
      queryFn: async ({ email, password }) => {
        try {
          const auth = getAuth();
          const user = await signInWithEmailAndPassword(auth, email, password);

          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
    updateUser: builder.mutation<User | null, UpdateProfileRequest>({
      queryFn: async ({ fullName }) => {
        try {
          const auth = getAuth();
          const db = getDB();

          if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: fullName });

            const usersRef = await collection(db, 'users');
            const usersQuery = query(usersRef, where('id', '==', auth.currentUser.uid));
            const usersDoc = await getDocs(usersQuery);

            await updateDoc(usersDoc.docs[0].ref, { fullName });

            const updatedUser: User = {
              id: auth.currentUser?.uid || '',
              fullName: auth.currentUser?.displayName || '',
              email: auth.currentUser?.email || '',
              createdAt: auth.currentUser?.metadata.creationTime || '',
            };

            return { data: updatedUser };
          }

          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useUpdateUserMutation } = userApi;
