import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  stepAtual = "step1";

  definirStep(step: string) {
    this.stepAtual = step;
  }

   leadForm: FormGroup
   constructor(private fb: FormBuilder) {
    this.leadForm = this.fb.group({
      nome: ['', [Validators.required]],
      whatsapp: ['', [Validators.required, Validators.minLength(10)]],
      empresa: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]


    })
   }
  
   onSubmit () {
    if (this.leadForm.valid) {
      console.log('Login Successful', this.leadForm.value);
    }
   }

  
  }