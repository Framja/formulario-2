import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CategoriaServico } from '../interfaces/categoria-servico.interface';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { RotasApi } from '../enums/rotas-api.enum';
import { Servico } from '../interfaces/servico.interface';
import { ResponseGenerico } from '../interfaces/response-generico.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService {

  constructor(
    public override http: HttpClient,
    public override utilService: UtilService
  ) {
    super(http, utilService);
  }

  buscarCategorias(): Observable<CategoriaServico[]> {
    const url = `${this.urlBase}/${RotasApi.categoriaServicos}.json`;

    return this.http.get<CategoriaServico[]>(url).pipe(
      map((resp: any) => {
        return this.utilService.criarArray<CategoriaServico>(resp);
      }),
      map((result) =>
        result.sort((a, b) => (a.nomeCategoria > b.nomeCategoria ? 0 : -1))
      ),
      catchError((error) => {
        this.erroAPI(error, url, { url });
        return of([]);
      })
    );
  }

  obterIdCategoria(categorias: CategoriaServico[], nomeCategoria: string): string {
  
    const categoriasParaFiltro = [...categorias];
    
    return categoriasParaFiltro.filter(x => x.nomeCategoria === nomeCategoria)[0].id ?? categoriasParaFiltro[0].id;
  
  }

  obterServicosPadrao(empresa: string, segmento: string, categorias: CategoriaServico[]): Servico[] {

    const todosServicos: Servico[] = [
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Barbearia', idCategoria: this.obterIdCategoria(categorias, 'Barbearia'), nomeServico: 'Barba', duracao: 45, descricaoServico: 'Cuidados e modelagem da barba.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Barbearia', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Corte', duracao: 30, descricaoServico: 'Corte de cabelo personalizado.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Barbearia', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Hidratação', duracao: 30, descricaoServico: 'Reposição de nutrientes nos fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Barbearia', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Coloração / Tonalização', duracao: 60, descricaoServico: 'Mudança ou ajuste na cor do cabelo.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Barbearia', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Higienização', duracao: 20, descricaoServico: 'Limpeza do couro cabeludo e fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Centro de Estética', idCategoria: this.obterIdCategoria(categorias, 'Cílios e Sobrancelhas'), nomeServico: 'Design de Sobrancelha', duracao: 30, descricaoServico: 'Modelagem e depilação das sobrancelhas.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Centro de Estética', idCategoria: this.obterIdCategoria(categorias, 'Depilação'), nomeServico: 'Depilação', duracao: 60, descricaoServico: 'Remoção de pelos indesejados.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Centro de Estética', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Bronzeamento', duracao: 60, descricaoServico: 'Técnica para deixar a pele com um tom dourado e saudável.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Centro de Estética', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Maquiagem', duracao: 60, descricaoServico: 'Aplicação de maquiagem para realçar a beleza.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Centro de Estética', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Massagem', duracao: 60, descricaoServico: 'Técnicas de relaxamento e alívio de tensões.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Esmalteria', idCategoria: this.obterIdCategoria(categorias, 'Manicure e Pedicure'), nomeServico: 'Manicure', duracao: 30, descricaoServico: 'Cuidados com as unhas das mãos.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Esmalteria', idCategoria: this.obterIdCategoria(categorias, 'Manicure e Pedicure'), nomeServico: 'Pedicure', duracao: 30, descricaoServico: 'Cuidados com as unhas dos pés.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Esmalteria', idCategoria: this.obterIdCategoria(categorias, 'Manicure e Pedicure'), nomeServico: 'Manicure e Pedicure', duracao: 60, descricaoServico: 'Cuidados com as unhas das mãos e dos pés.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Esmalteria', idCategoria: this.obterIdCategoria(categorias, 'Manicure e Pedicure'), nomeServico: 'Esmaltação - Mãos', duracao: 20, descricaoServico: 'Aplicação de esmalte nas unhas das mãos.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Esmalteria', idCategoria: this.obterIdCategoria(categorias, 'Manicure e Pedicure'), nomeServico: 'Esmaltação - Pés', duracao: 20, descricaoServico: 'Aplicação de esmalte nas unhas dos pés.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Outros', idCategoria: this.obterIdCategoria(categorias, 'Terapia'), nomeServico: 'Pilates', duracao: 60, descricaoServico: 'Exercícios para fortalecimento e alongamento.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Outros', idCategoria: this.obterIdCategoria(categorias, 'Terapia'), nomeServico: 'RPG', duracao: 60, descricaoServico: 'Correção postural para aliviar dores.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Outros', idCategoria: this.obterIdCategoria(categorias, 'Terapia'), nomeServico: 'Acupuntura Corporal', duracao: 60, descricaoServico: 'Terapia com agulhas para equilíbrio e alívio.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Outros', idCategoria: this.obterIdCategoria(categorias, 'Tratamentos Específicos'), nomeServico: 'Estrias - Peeling Químico', duracao: 60, descricaoServico: 'Tratamento para atenuar estrias.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Podologia', idCategoria: this.obterIdCategoria(categorias, 'Tratamentos Específicos'), nomeServico: 'Correção de unhas encravadas', duracao: 40, descricaoServico: 'Tratamento de unhas encravadas.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Podologia', idCategoria: this.obterIdCategoria(categorias, 'Tratamentos Específicos'), nomeServico: 'Podologia completa', duracao: 50, descricaoServico: 'Cuidados completos com os pés.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Podologia', idCategoria: this.obterIdCategoria(categorias, 'Tratamentos Específicos'), nomeServico: 'Spa podológico', duracao: 60, descricaoServico: 'Tratamento relaxante para os pés.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Podologia', idCategoria: this.obterIdCategoria(categorias, 'Tratamentos Específicos'), nomeServico: 'Tratamento de micoses', duracao: 35, descricaoServico: 'Tratamento de infecções nas unhas e pele.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Salão de Beleza', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Corte', duracao: 45, descricaoServico: 'Corte e modelagem do cabelo.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Salão de Beleza', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Escova', duracao: 30, descricaoServico: 'Alisamento e modelagem do cabelo com escova.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Salão de Beleza', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Hidratação', duracao: 30, descricaoServico: 'Reposição de nutrientes nos fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Salão de Beleza', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Luzes', duracao: 120, descricaoServico: 'Clareamento das mechas do cabelo.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Salão de Beleza', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Progressiva', duracao: 120, descricaoServico: 'Alisamento dos fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Spa', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Drenagem Linfática', duracao: 60, descricaoServico: 'Estímulo à circulação e eliminação de toxinas.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Spa', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Esfoliação Corporal', duracao: 60, descricaoServico: 'Remoção de células mortas da pele.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Spa', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Hidratação Corporal', duracao: 60, descricaoServico: 'Nutrição da pele.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Spa', idCategoria: this.obterIdCategoria(categorias, 'Estética Corporal'), nomeServico: 'Massagem Relaxante', duracao: 60, descricaoServico: 'Técnicas de relaxamento e alívio de tensões.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Spa', idCategoria: this.obterIdCategoria(categorias, 'Estética Facial'), nomeServico: 'Eletrolifting', duracao: 60, descricaoServico: 'Tratamento para tonificar a pele.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Mega Hair', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Corte', duracao: 45, descricaoServico: 'Corte e modelagem do cabelo.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Mega Hair', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Escova', duracao: 30, descricaoServico: 'Alisamento e modelagem do cabelo com escova.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Mega Hair', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Hidratação', duracao: 30, descricaoServico: 'Reposição de nutrientes nos fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Mega Hair', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Luzes', duracao: 120, descricaoServico: 'Clareamento das mechas do cabelo.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Mega Hair', idCategoria: this.obterIdCategoria(categorias, 'Cabelo'), nomeServico: 'Progressiva', duracao: 120, descricaoServico: 'Alisamento dos fios.' },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Estúdio de Tatuagem', idCategoria: this.obterIdCategoria(categorias, 'Tatuagem'), nomeServico: 'Fechamento Antebraço Interno', duracao: 450 },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Estúdio de Tatuagem', idCategoria: this.obterIdCategoria(categorias, 'Tatuagem'), nomeServico: 'Flash Tattoo', duracao: 60 },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Estúdio de Tatuagem', idCategoria: this.obterIdCategoria(categorias, 'Tatuagem'), nomeServico: 'Tatuagem Braço', duracao: 500 },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Estúdio de Tatuagem', idCategoria: this.obterIdCategoria(categorias, 'Tatuagem'), nomeServico: 'Tatuagem No Pé', duracao: 210 },
      { empresa, permiteAgendamento: true, valorCobrado: 0, tipoValor: 'Fixo', segmento: 'Estúdio de Tatuagem', idCategoria: this.obterIdCategoria(categorias, 'Tatuagem'), nomeServico: 'Tatuagem No Peito', duracao: 390 },
    ];
  
    // Filtra serviços com base no segmento selecionado
    return todosServicos.filter(servico => servico.segmento === segmento);
  

  }

  cadastrarServicoComRetorno(servico: Servico): Observable<ResponseGenerico> {

    const url = `${this.urlBase}/${RotasApi.servicos}/.json`;

    return this.http.post<Servico>(url, servico)
      .pipe(
        map((response: any) => {

          servico.id = response["name"];
          
          return {
            mensagem: null,
            retorno: servico,
            sucesso: true
          };

        }),
        catchError(error => this.erroAPI(error, url, servico))
      );

  }

}
