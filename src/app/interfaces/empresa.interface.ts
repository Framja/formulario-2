import { Endereco } from "./endereco.interface";
import { LayoutSite } from "./layout-site.interface";
import { AcessoProfissional, AcessoRecepcionista } from "./menu.interface";

export interface Empresa {
    id?: string;
    codigo?: number;
    plano?: any; //plano atual
    dataInicioPlano?: Date;
    historicoPlanos?: HistoricoPlano[]; //histórico de planos da empresa
    nomeEmpresa?: string;
    tipoPessoa?: string;
    cpfCnpj?: string;
    nomeResponsavel?: string;
    telefone?: string;
    email?: string;
    quantidadeProfissionais?: number;
    facebook?: string;
    instagram?: string;
    endereco?: Endereco;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    ativo?: boolean;
    observacoes?: string;
    logotipo?: string;
    corBotao?: string;
    acessoRecepcionista?: AcessoRecepcionista;
    acessoProfissional?: AcessoProfissional;
    layoutSite?: LayoutSite;
    diaVencimento?: string;
    descricaoPlano?: string;
    link?: string;
    segmento?: string;
    exportado?: boolean;
    lembreteAutomaticoAtivo?: boolean;
    lembreteAutomaticoLimiteMensal?: number;
  }
  
  export interface HistoricoPlano {
    planoId?: string;
    dataInicio?: Date;
    dataFim?: Date;
  }
  