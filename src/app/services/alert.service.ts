import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  exibirAvisoCampoObrigatorio(): void {
    Swal.fire({
            text: "Por favor, preencha os campos obrigatórios.",
            icon: "warning",
            confirmButtonColor: "#820ADF",
            iconColor: "grey"
          });
  }
}
