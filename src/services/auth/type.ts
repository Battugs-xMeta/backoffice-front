export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: Admin;
  employee: any;
}

export interface Admin {
  token?: String;
  user?: User;
}

export interface User {
  organization_name?: String;
  logo?: any;
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}
