export type Auth = {
  username: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  code: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
