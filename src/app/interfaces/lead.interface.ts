import { Endereco } from "./endereco.interface";

export interface Lead {
    id?: string;
    empresa?: string; //id da empresa no firebase
    anuncioId?: string;
    mesContato?: string;
    dataContato?: Date;
    dataAtualizacao?: Date;
    email?: string;
    localidade?: string;
    mensagem?: string;
    nome?: string;    
    nomeResponsavel?: string;
    origem?: string;
    status?: string;
    motivoNegocioNaoFechado?: string,
    telefone?: string;
    termometro?: string;
    observacoes?: string;
    ordemNaLista?: number;
    vendedor?: string;
    cpfCnpj?: string;
    quantidadeProfissionais?: number;
    endereco?: Endereco;
    urlOrigem?: string;
    googleAds?: boolean | string;
    idEmpresa?: string;
    segmento?: string;
    exportado?: boolean;
}