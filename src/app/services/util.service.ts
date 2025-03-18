import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  
  public criarArray<T>(itens: any): T[] {
    const listaRetorno: T[] = [];

    if (itens === null) {
      return [];
    }

    //JAVASCRIPT PURO! Converte objeto itens em array de keys
    //Para converter em array de values: utilizar Object.values(itens)
    //Para converter em array com keys e values: utilizar Object.entries(itens)
    Object.keys(itens).forEach((id: any) => {
      const item: any = itens[id];
      item['id'] = id;
      listaRetorno.push(item);
    });

    return listaRetorno;
  }
  removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
  }

  removerCaracteresEspeciais(str: string): string {
    // Substitui caracteres especiais por nada (remove)
    return str.replace(/[^\w\s]/gi, '');
  }
  

}
