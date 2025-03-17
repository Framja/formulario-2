import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  exibirLoading(mensagem?: string) {
    Swal.fire({
      title: 'Espere',
      text: mensagem ?? 'Por favor, aguarde',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }

  fecharLoading() {
    Swal.close();
  }

  exibirAvisoCampoObrigatorio(): void {
    Swal.fire({
            text: "Por favor, preencha os campos obrigatórios.",
            icon: "warning",
            confirmButtonColor: "#820ADF",
            iconColor: "grey"
          });
  }

  exibirErro(mensagem: any, timer?: number) {
    if (
      mensagem === 'EMAIL_NOT_FOUND' ||
      mensagem === 'INVALID_PASSWORD' ||
      mensagem === 'INVALID_EMAIL'
    ) {
      mensagem = 'E-mail ou senha inválidos.';
    }

    Swal.fire({
      icon: 'error',
      title: 'Ooops.',
      confirmButtonColor: '#5cb85c',
      html: mensagem,
      timer
    });
  }

  exibirErroGenerico(titulo: string, mensagem: string) {
  
    Swal.fire({
      icon: 'error',
      title: titulo,
      confirmButtonColor: '#5cb85c',
      html: mensagem,
    });
  }


}
