import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './projetos.html'
})
export class Projetos implements OnInit {

  private service = inject(ProjetoService);

  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (lista: Projeto[]) => {
        console.log('PROJETOS RECEBIDOS:', lista);
        this.projetos = lista;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('ERRO AO CARREGAR PROJETOS:', erro);
        this.erro = 'Falha ao carregar os projetos.';
        this.carregando = false;
      }
    });
  }
}