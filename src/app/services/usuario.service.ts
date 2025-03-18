import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { Usuario } from '../interfaces/usuario.interface';
import { catchError, map, Observable } from 'rxjs';
import { ResponseGenerico } from '../interfaces/response-generico.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(
    public override http: HttpClient,
    public override utilService: UtilService
  ) {
    super(http, utilService)
  }

  cadastrarUsuario(request: Usuario): Observable<ResponseGenerico> {

    const url = `${this.urlBase}/usuarios.json`;

    return this.http.post<Usuario>(url, request)
      .pipe(
        map(response => this.retornoAPI(response)),
        catchError(error => this.erroAPI(error, url, request))
      );

  }

}
