export interface ServicoProfissional {
    idServico: string;
    comissao: number; 
    duracao: number;
    valorCobrado: number;
    nomeServico?: string;
    custo?: number;
  }