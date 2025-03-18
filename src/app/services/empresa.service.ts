import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { map, Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService {

  private baseUrlApi: string = environment.firebase.databaseURL;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    public override http: HttpClient,
    public override utilService: UtilService
  ) { 
    super(http, utilService);
  }

  public buscarTodasEmpresas(): Observable<Empresa[]> {

    return this.http.get<Empresa[]>(`${this.baseUrlApi}/empresas.json`)
      .pipe(
        map((resp: any) => this.utilService.criarArray<Empresa>(resp)),
        map((resp: any) => resp.sort((a: any, b: any) => a.codigo - b.codigo))
      );
  }

  public buscarEmpresas(): Observable<Empresa[]> {

    return this.http.get<Empresa[]>(`${this.baseUrlApi}/empresas.json`)
      .pipe(
        map((resp: any) => this.utilService.criarArray<Empresa>(resp)),
        map((resp: any) => resp.sort((a: any, b: any) => b.codigo - a.codigo))
      );
  }

  obterProximoCodigoDeEmpresa(): Promise<number> {

    return new Promise((result) => {

      //Busca todas as emnpresas
      this.buscarTodasEmpresas()
        .pipe(
          map(empresas => { //Faz um map para retornar um array somente de codigos de empresa

            //Cria um novo array só com os codigos de empresa
            var codigos = empresas.filter(x => x.id !== "null").map(empresa => empresa.codigo);

            //Se não tiver codigo, adiciona o número 0 como único elemento do array para o proximo codigo ser a 1
            if (codigos.length === 0)
              codigos.push(0);

            return codigos;

          }),
          map((codigos: any) => Math.max(...codigos)) //Faz um novo map e obtém o codigo da última empresa criada 
        )
        .subscribe(
          (numero) => {

            //acrescenta 1 ao codigo da última empresa criada e retorna esse valor
            result(numero + 1)

          }
        )

    });

  }

  obterLinkEmpresa(nomeSugerido: string): Promise<string> {

    return new Promise((resolve) => {

      this.buscarEmpresas().subscribe(
        (empresas) => {

          // 1. Remover acentos e caracteres especiais
          let link: string = nomeSugerido
              .trim()
              .toLowerCase()
              .normalize('NFD') // Desnormaliza os caracteres acentuados
              .replace(/[\u0300-\u036f]/g, '') // Remove as marcas de diacríticos (acentos)
              .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, mantendo letras, números, espaços e traços
              .replace(/\s+/g, '-') //Substituir espaços por traços
              .replace(/-+$/, '') //Garantir que o traço não seja o último caractere

          // 2. Extrair os nomes das empresas já existentes
          const nomesEmpresa: string[] = empresas.filter(x => x.id !== "null").map((x: any) =>
            x.nomeEmpresa
              .trim()
              .toLowerCase()
              .normalize('NFD') // Desnormaliza os caracteres acentuados
              .replace(/[\u0300-\u036f]/g, '') // Remove as marcas de diacríticos (acentos)
              .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, mantendo letras, números, espaços e traços
              .replace(/\s+/g, '-') //Substituir espaços por traços
              .replace(/-+$/, '') //Garantir que o traço não seja o último caractere
          );

          // 2. Se o nome for inédito, retornar o link transformado
          if (!nomesEmpresa.includes(link)) {
            resolve(link);
          }

          
          // 3. Se o nome já existir, gerar um nome inédito com números sequenciais
          let quantidadeEmpresasComMesmoNome = nomesEmpresa.filter(x => x === link).length;
          let contador = quantidadeEmpresasComMesmoNome + 1;
          let novoLink = `${link}-${contador}`;
          
          resolve(novoLink);


        }
      )


    })



  }

}
