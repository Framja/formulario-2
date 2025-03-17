import { UserFirebaseResponse } from "./user-firebase-response.interface";

export interface Usuario {
    id?: string;
    empresa: string; //id da empresa no firebase
    nome: string;
    email: string;
    tipoUsuario: number;
    telefone: string;
    senha?: string;
    ativo: boolean;
    userFirebase?: UserFirebaseResponse;
    nomeEmpresa: string;
    codigoEmpresa?: number;
}