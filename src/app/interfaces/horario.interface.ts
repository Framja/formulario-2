export interface Horario {
    diaDaSemana: number; //Domingo = 0, Segunda-feira = 1, ... para obter o dia atual = new Date().getDay()
    atende: boolean;
    horaInicio?: string;
    horaFim?: string;
}