import clienteAxios from "./axios";
import {Token, Credentials} from "../types"


const loginService = async (payload: Credentials) => {
  const response = await clienteAxios.post<Token>("/cuentas/login", {
    email: payload.email,
    password: payload.password,
  });
  return response;
};

export default loginService;
