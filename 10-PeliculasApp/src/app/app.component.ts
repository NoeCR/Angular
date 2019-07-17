import { Component } from '@angular/core';
import { PeliculasService } from './services/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PeliculasApp';

  constructor(public peliculasService: PeliculasService) { }

  getPopulares() {
    this.peliculasService.getPopulares().subscribe(data => {
      console.log(data);
    });
  }

  getPelicula( titulo: string ) {
    this.peliculasService.getPelicula( titulo ).subscribe(data => {
      console.log(data);
    });
  }
}
