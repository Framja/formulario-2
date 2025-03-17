import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [provideNgxMask()],
})
export class HomeComponent {

  stepAtual = "step1";
  exibirSenha: boolean = false;

  definirStep(step: string) {
    this.stepAtual = step;
  }

  avancarStep2(): void {

    const nomeValido = this.validarFormControl('nome');
    const whatsappValido = this.validarFormControl('whatsapp');
    if (nomeValido && whatsappValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step2';

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  avancarStep3(): void {

    debugger;
    const empresaValido = this.validarFormControl('empresa');
    const segmentoValido = this.validarFormControl('segmento');
    const cargoValido = this.validarFormControl('cargo');
    if (empresaValido && segmentoValido && cargoValido) {
      this.leadForm.markAsUntouched();
      this.stepAtual = 'step3';

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }

  }

  voltarStep(step: string) {
    this.stepAtual = step;
  }

  leadForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {

    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      whatsapp: ['', [Validators.required, Validators.minLength(10)]],
      empresa: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]


    })
  }

  enviar (): void {

    const emailValido = this.validarFormControl('email');
    const senhaValido = this.validarFormControl('senha');
    if (emailValido && senhaValido) {
      
      alert('gravou lead')

    } else {
      this.leadForm.markAllAsTouched();
      this.alertService.exibirAvisoCampoObrigatorio();
    }




  }

  validarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].valid;
  }

  invalidarFormControl(nomeControle: string): boolean {
    return this.leadForm.controls[nomeControle].invalid && (this.leadForm.controls[nomeControle].touched);
  }

}