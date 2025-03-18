import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { environment } from '../../environments/environment';
import { ResponseGenerico } from '../interfaces/response-generico.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  urlBase: string = environment.firebase.databaseURL;

  constructor(
    public http: HttpClient,
    public utilService: UtilService
  ) { }

  public retornoAPI(response: any): ResponseGenerico {
    return {
      mensagem: null,
      retorno: response,
      sucesso: true
    };

  }

  public erroAPI(error: any, url: string, request?: any): Observable<ResponseGenerico> {

    const retorno: ResponseGenerico = {
      mensagem: 'Erro ao consumir API. Por favor, saia do sistema e entre novamente. Caso o problema persista, entre em contato com o suporte técnico.',
      retorno: error,
      sucesso: false
    };

    console.log({ url, error, request, retorno });
    
    return of(retorno);
  }

  public buscar<T>(rota: string, empresa: string): Observable<T[]> {

    const url = `${this.urlBase}/${rota}.json?orderBy="empresa"&equalTo="${empresa}"`;

    return this.http.get<T[]>(url)
      .pipe(
        map((resp: any) => this.utilService.criarArray<T>(resp)),
        catchError(error => {
          this.erroAPI(error, url, { url });
          return of([]);
        })
      );

  }
  
  public buscarPorReferencia<T>(rota: string, referencia: string): Observable<T[]> {

    const url = `${this.urlBase}/${rota}.json?orderBy="referencia"&equalTo="${referencia}"`;

    return this.http.get<T[]>(url)
      .pipe(
        map((resp: any) => this.utilService.criarArray<T>(resp)),
        catchError(error => {
          this.erroAPI(error, url, { url });
          return of([]);
        })
      );

  }

  public buscarPorId<T>(rota: string, id: string): Observable<T> {

    const url = `${this.urlBase}/${rota}/${id}/.json`;

    return this.http.get<T>(url);

  }

  public buscarPorIntervalo<T>(rota: string, referenciaInicial: string, referenciaFinal: string): Observable<T[]> {
    const url = `${this.urlBase}/${rota}.json?orderBy="referencia"&startAt="${referenciaInicial}"&orderBy="referencia"&endAt="${referenciaFinal}"`;

    return this.http.get<T[]>(url).pipe(
      map((resp: any) => this.utilService.criarArray<T>(resp)),
      catchError((error) => {
        this.erroAPI(error, url, { url });
        return of([]);
      })
    );
  }

  buscarPorComanda<T>(rota: string, idComanda: string): Observable<T[]> {
    const url = `${this.urlBase}/${rota}.json?orderBy="idComanda"&equalTo="${idComanda}"`;

    return this.http.get<T[]>(url).pipe(
      map((resp: any) => this.utilService.criarArray<T>(resp)),
      catchError((error) => {
        this.erroAPI(error, url, { url });
        return of([]);
      })
    );
  }

  buscarPorProfissionalGenerico<T>(rota: string, idProfissional: string): Observable<T[]> {
    const url = `${this.urlBase}/${rota}.json?orderBy="idProfissional"&equalTo="${idProfissional}"`;

    return this.http.get<T[]>(url).pipe(
      map((resp: any) => this.utilService.criarArray<T>(resp)),
      catchError((error) => {
        this.erroAPI(error, url, { url });
        return of([]);
      })
    );
  }

  buscarGenerico<T>(rota: string, orderBy: string, equalTo: string): Observable<T[]> {
    const url = `${this.urlBase}/${rota}.json?orderBy="${orderBy}"&equalTo="${equalTo}"`;

    return this.http.get<T[]>(url).pipe(
      map((resp: any) => this.utilService.criarArray<T>(resp)),
      catchError((error) => {
        this.erroAPI(error, url, { url });
        return of([]);
      })
    );
  }


  public cadastrar<T>(rota: string, request: T): Observable<ResponseGenerico> {

    const url = `${this.urlBase}/${rota}/.json`;

    return this.http.post<T>(url, request)
      .pipe(
        map(response => this.retornoAPI(response)),
        catchError(error => this.erroAPI(error, url, request))
      );

  }

  public atualizar<T>(rota: string, id: string, request: T): Observable<ResponseGenerico> {

    const url = `${this.urlBase}/${rota}/${id}/.json`;

    return this.http.put<T>(url, request)
      .pipe(
        map(response => this.retornoAPI(response)),
        catchError(error => this.erroAPI(error, url, request))
      );

  }

  public excluir(rota: string, id: string): Observable<ResponseGenerico> {

    const url = `${this.urlBase}/${rota}/${id}/.json`;
    return this.http.delete<boolean>(url)
      .pipe(
        map(response => this.retornoAPI(response)),
        catchError(error => this.erroAPI(error, url, { url }))
      );
  }

}
