export type User = {
  _id?: string;
  namaLengkap: string;
  noTelp: string;
  email: string;
  username: string;
  role: string;
  password: string;
  retype_password: string;
};

export type UpdateUser = {
  namaLengkap: string;
  noTelp: string;
  email: string;
  role: string;
  username: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
};
