import { Endereco } from "./endereco.interface";

export interface LayoutSite {
    nome?: string;
    podeAgendarHorasAntes?: number; 
    podeCancelarHorasAntes?: number;
    slogan?: string;
    fraseDestaque?: string;
    sobre?: string;
    whatsapp1?: string;
    whatsapp2?: string;
    telefoneFixo1?: string;
    telefoneFixo2?: string;
    email1?: string;
    email2?: string;
    horarioAtendimento?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    endereco?: Endereco;
    fotos?: Foto[];
    logotipo?: string;
    coresDoSite?: CoresDoSite;
    comodidades?: Comodidades;
    formasDePagamento?: FormasDePagamento;
    ativo?: boolean;
}

export interface Foto {
    url?: string;
}

export interface CoresDoSite {
    fundoPrincipal?: string;
    textoPrincipal?: string;
    arredondarLogotipo?: boolean;
    temaLight?: boolean;
}

export interface Comodidades {
    wifi?: boolean;
    estacionamento?: boolean;
    acessibilidade?: boolean;
    atendeCriancas?: boolean;
}

export interface FormasDePagamento {
    dinheiro?: boolean;
    debito?: boolean;
    credito?: boolean;
    pix?: boolean;
    linkPagamento?: boolean;
    cheque?: boolean;
    boleto?: boolean;    
    transferencia?: boolean;
    necessarioSinalAgendamento?: boolean;
    valorSinalAgendamento?: number;
    tipoChavePix?: string;
    chavePix?: string;
}

