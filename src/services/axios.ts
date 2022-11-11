import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://localhost:7164/api",
});

export default clienteAxios;