import { Horario } from "./horario.interface";


export interface ConfiguracaoHorario {
    id?: string,
    empresa: string,
    horarios: Horario[]
}