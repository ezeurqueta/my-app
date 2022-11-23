export interface Token {
    token: string;
    expiracion: string;
    isAdmin: boolean;
  }
  export interface Movie {
    id: number
    titulo: string
    fechaEstreno: string
    poster: string
  }
 
  export type Credentials = {
    email: string;
    password: string;
  }; 