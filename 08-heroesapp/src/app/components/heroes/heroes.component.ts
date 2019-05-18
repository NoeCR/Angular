import { Component, OnInit } from '@angular/core';
import { IHeroe } from 'src/app/models/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  public heroes: Array<IHeroe>;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getAllHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
      }
    );
  }

  ngOnInit() {
  }
  removeHero(k: string) {
    this._heroesService.eliminarHeroe( k ).subscribe(
      data => {
        if ( data ) {
          console.error(data);
        } else {
          delete this.heroes[ k ];
        }
      }
    );
  }

}
