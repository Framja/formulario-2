import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ResponseGenerico } from '../interfaces/response-generico.interface';
import { environment } from '../../environments/environment';
import { UserFirebaseResponse } from '../interfaces/user-firebase-response.interface';
import { UserFirebaseRequest } from '../interfaces/user-firebase-request.interface';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//API do Google para autenticação
  //https://developers.google.com/resources/api-libraries/documentation/identitytoolkit/v3/python/latest/identitytoolkit_v3.relyingparty.html

  private urlAuth = environment.urlAuth;
  private apiKey = environment.firebase.apiKey;
  private idToken!: string;
  private refreshToken!: string;

  constructor(
    private auth: Auth,
    private http: HttpClient
  ) { }

  login(usuario: UserFirebaseRequest): Observable<ResponseGenerico> {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.urlAuth}/verifyPassword?key=${this.apiKey}&returnSecureToken=true`,
      authData
    ).pipe(
      map(resp => {

        const retorno: ResponseGenerico = {
          mensagem: "",
          retorno: resp,
          sucesso: true
        };

        return retorno;

      }),
      catchError(err => {

        var mensagemErro: string = "";

        switch (err.error.error.message) {
          case "INVALID_PASSWORD":
          case "INVALID_EMAIL":
          case "EMAIL_NOT_FOUND":
            mensagemErro = "E-mail ou senha inválidos."
            break;
          default:
            mensagemErro = err.error.error.message;
            break;
        }

        if (mensagemErro.indexOf('TOO_MANY_ATTEMPTS_TRY_LATER') > -1) {
          mensagemErro = "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login fracassadas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.";
        }

        const retorno: ResponseGenerico = {
          mensagem: mensagemErro,
          retorno: null,
          sucesso: false
        };

        return of(retorno);

      }),
      tap(
        ({ retorno }) => { //Usei desestruturação aqui, pois retorno é uma propriedade da interface ResponseGenerico que foi mapeada como retorno com o map()

          if (retorno?.idToken) {
            this.guardarToken(retorno);
          }

          //Autentica no firebase para poder gravar arquivos no storage
          signInWithEmailAndPassword(this.auth, usuario.email, usuario.password).then(
            (resp) => {
              // console.log(`Usuário ${resp.user.email} autenticado.`) 
              console.log(`Usuário autenticado.`)
            }
          );

        })
    );

  }


  public criarUsuarioFirebaseAuth(email: string, password: string): Observable<ResponseGenerico> {

    const usuario = { email, password };

    return this.http.post(`${this.urlAuth}/signupNewUser?key=${this.apiKey}`, usuario)
      .pipe(
        map((resp: UserFirebaseResponse) => {

          const retorno: ResponseGenerico = {
            mensagem: "",
            retorno: resp,
            sucesso: true
          };

          return retorno;

        }),
        catchError(err => {

          var mensagemErro: string = "";

          switch (err.error.error.message) {
            case "EMAIL_EXISTS":
              mensagemErro = `O e-mail ${email} já foi cadastrado.`
              break;
            default:
              mensagemErro = err.error.error.message;
              break;
          }

          const retorno: ResponseGenerico = {
            mensagem: mensagemErro,
            retorno: null,
            sucesso: false
          };

          return of(retorno);

        })
      );

  }

  private guardarToken(token: any) {

    this.idToken = token.idToken;
    localStorage.setItem(environment.storage.framjaTokenAuth, this.idToken);

    this.refreshToken = token.refreshToken;
    localStorage.setItem(environment.storage.framjaRefreshTokenAuth, this.refreshToken);

    let hoje = new Date();
    hoje.setSeconds(token.expiresIn);
    localStorage.setItem(environment.storage.framjaExpiraToken, hoje.getTime().toString());

  }

  //Atualiza o id da empresa na conta criada no firebase
  public atualizarEmpresaNaContaFirebaseAuth(idToken: string, displayName: string): Observable<ResponseGenerico> {

    const account = { idToken, displayName };

    return this.http.post(`${this.urlAuth}/setAccountInfo?key=${this.apiKey}`, account)
      .pipe(
        map((resp: UserFirebaseResponse) => {

          const retorno: ResponseGenerico = {
            mensagem: "",
            retorno: resp,
            sucesso: true
          };

          return retorno;

        }),
        catchError(err => {

          var mensagemErro: string = err.error.error.message;

          const retorno: ResponseGenerico = {
            mensagem: mensagemErro,
            retorno: null,
            sucesso: false
          };

          return of(retorno);

        })
      );

  }

}
