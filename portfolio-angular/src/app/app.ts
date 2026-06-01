import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import { MatListModule } from  '@angular/material/list' ;

@Component({
  selector: 'app-root',
  imports : [ MatListModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Meu Portfólio');
}
