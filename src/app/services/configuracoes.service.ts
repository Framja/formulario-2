import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { catchError, map, Observable } from 'rxjs';
import { ResponseGenerico } from '../interfaces/response-generico.interface';
import { RotasApi } from '../enums/rotas-api.enum';
import { ConfiguracaoHorario } from '../interfaces/configuracao-horario.interface';
import { Horario } from '../interfaces/horario.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService extends BaseService {

  constructor(
    public override http: HttpClient,
    public override utilService: UtilService,    
  ) {
    super(http, utilService);
  }

  cadastrarConfiguracaoHorarioPadrao<ConfiguracaoHorario>(empresa: string): Observable<ResponseGenerico> {
  
    const url = `${this.urlBase}/${RotasApi.configuracaoHorarios}/.json`;
    const request = this.obterConfiguracaoHorarioPadrao(empresa);

    return this.http.post<ConfiguracaoHorario>(url, request)
      .pipe(
        map(response => this.retornoAPI(response)),
        catchError(error => this.erroAPI(error, url, request))
      );

  }

  obterConfiguracaoHorarioPadrao(empresa: string): ConfiguracaoHorario {
    
    let horarios: Horario[] = [];

    for (let i = 0; i < 7; i++) {
      horarios.push({
        diaDaSemana: i,
        atende: true,
        horaInicio: '09:00',
        horaFim: '19:00'
      })
    }

    const configuracaoHorario = {
      empresa,
      horarios
    }

    return configuracaoHorario;

  }
}
