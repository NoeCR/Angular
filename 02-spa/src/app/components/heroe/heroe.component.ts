import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent {

  public heroe: Heroe = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: ''
  };
  constructor(private route: ActivatedRoute,
              private heroesService: HeroesService) {
    this.route.params.subscribe( params => {
      console.log(params.id);
      this.heroe = this.heroesService.getHeroe(params.id);
    });
  }



}
