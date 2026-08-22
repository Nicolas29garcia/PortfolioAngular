// src/app/contato/contato.ts

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contato.html',
})
export class ContatoComponent {

  private fb = inject(FormBuilder);

  private service = inject(ContatoService);

  @ViewChild('nomeInput') nomeInput?: ElementRef<HTMLInputElement>;

  enviando = false;
  sucesso = '';
  erro = '';
  errosBack: string[] = [];

  form = this.fb.group({

    nome: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    mensagem: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],

  });

  onSubmit() {

    this.sucesso = '';
    this.erro = '';
    this.errosBack = [];

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      this.focarPrimeiroCampoInvalido();

      return;
    }

    this.enviando = true;

    this.service.enviar({
      nome: this.form.value.nome ?? '',
      email: this.form.value.email ?? '',
      mensagem: this.form.value.mensagem ?? ''
    }).subscribe({

      next: (resp) => {

        this.sucesso = resp.mensagem;

        this.form.reset();

        this.enviando = false;
      },

      error: (err: HttpErrorResponse) => {

        this.enviando = false;

        if (err.error?.erros && Array.isArray(err.error.erros)) {

          this.errosBack = err.error.erros;

        } else {

          this.erro = 'Não foi possível enviar. Tente novamente.';
        }

      },

    });
  }

  private focarPrimeiroCampoInvalido() {

    const campos = ['nome', 'email', 'mensagem'];

    for (const campo of campos) {

      const controle = this.form.get(campo);

      if (controle?.invalid) {

        const elemento = document.getElementById(campo);

        if (elemento) {
          elemento.focus();
        }

        break;
      }
    }
  }
}