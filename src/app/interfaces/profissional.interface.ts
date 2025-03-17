import { Horario } from "./horario.interface";
import { ServicoProfissional } from "./servico-profissional.interface";

export interface Profissional {
    id?: string;
    empresa: string;
    nome: string;
    telefone?: string;
    tipoUsuario: number;
    email: string;
    senha: string;
    cargo: string;
    aniversario?: string;
    observacoes?: string;
    possuiAgenda: boolean;
    horarioTrabalho?: Horario[];
    dadosBancarios?: DadosBancarios;
    servicos?: ServicoProfissional[];
    ordemNaAgenda?: number;
    ativo?: boolean;
    exportado?: boolean;
    foto?: string;
  }
  
  export interface DadosBancarios {
    tipoConta?: string;
    tipoTransacao?: string;
    nomeTitular?: string;
    cpfTitular?: string;
    tipoChavePix?: string;
    chavePix?: string;
    banco?: string;
    modeloConta?: string;
    agencia?: string;
    conta?: string;
  }