export interface Servico {
    id?: string;
    empresa?: string;
    nomeServico?: string;
    idCategoria?: string;
    duracao?: number;
    duracaoHoras?: string;
    folga?: number;
    permiteAgendamento?: boolean;
    descricaoServico?: string;
    tipoValor?: string;
    valorCobrado?: number;
    custoServico?: number;
    retornoSugerido?: number;
    ativo?: boolean;
    exportado?: boolean;
    dataRegistro?: string; //yyyy-MM-dd
    segmento?: string;
  }
  
  export interface ServicoExportacao {
    categoria?: string;
    nomeServico?: string;
    duracaoMinutos?: number;
    duracaoHoras?: string;
    tipoPreco?: string;
    precoServico?: number;
    custoServico?: number;
    agendamentoOnline?: string;
    descricao?: string;
    folgaEmMinutos?: number;
    sugerirRetornoEmDias?: number;  
  }
  
  export interface ServicoResumo {
    idServico: string;
    nomeServico?: string;
    quantidade: number;
    valorTotal: number;
  }
  
  export interface ServicoResumoExportacao {
    nomeServico: string;
    quantidade: number;
    valorTotal: number;
  }
  
  export interface ServicoDetalheExportacao {
    nomeServico?: string;
    valorServico?: number;
    numeroComanda?: number;
    dataComanda?: string;
    nomeProfissional?: string;
    nomeCliente?: string;
  }
  
  
  