import clienteAxios from "./axios";


export interface Token {
  token: string;
  expiresIn: Date;
  isAdmin: boolean;
}
export type Credentials = {
    email: string;
    password: string;
}

const loginService = async (payload: Credentials) => {
    const response = await clienteAxios.post<Token>("/cuentas/login", {
      email: payload.email,
      password: payload.password,
    });
    return response;
};

export default loginService;