export interface Menu {
    descricao: string;
    classe?: string;
    rota: string;
    resumo?: string;
    categoria?: string;
    numero?: number;
}

export interface AcessoRecepcionista {
    menuAgenda: boolean;
    menuCaixa: boolean;
    fechamentoCaixa: boolean;
    menuComissoes: boolean;
    menuClientes: boolean;
    menuProfissionais: boolean;
    menuServicos: boolean;
    menuProdutos: boolean;
}

export interface AcessoProfissional {
    podeAgendar: boolean;
    podeAbrirComanda: boolean;    
    podeEnviarWhatsapp: boolean;
}