export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export type SignUpRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type UpdateProfileRequest = {
  fullName: string;
};
