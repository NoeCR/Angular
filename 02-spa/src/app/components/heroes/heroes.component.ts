import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  public heroes: Heroe[];
  public filterName = '';
  constructor( private heroesService: HeroesService,
               private router: Router,
               private route: ActivatedRoute ) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if ( params.term !== undefined ) {
        this.heroes = this.heroesService.buscarHeroe(params.term);
      } else {
        this.heroes = this.heroesService.getHeroes();
      }
    });
  }


  verHeroe( idx: number) {
    this.router.navigate(['/heroe', idx]);
  }
}
