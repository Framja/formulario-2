import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public criarArray<T>(itens: Record<string, T> | null): T[] {
    if (!itens) {
      return [];
    }
  
    const listaRetorno: T[] = [];
  
    Object.keys(itens).forEach((id) => {
      const item = { ...itens[id], id } as T; 
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
