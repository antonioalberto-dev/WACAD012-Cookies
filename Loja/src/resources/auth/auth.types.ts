export type SignupDto = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
