import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { IHeroe } from '../../models/heroe.interface';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  public id: any;
  private heroe: IHeroe = {
    nombre: '',
    bio: '',
    casa: ''
  };

  nuevo: boolean = false;

  constructor(private _heroesService: HeroesService,
              private route: ActivatedRoute,
              private router: Router) {
                this.route.params
                  .subscribe( params => {
                    this.id = params.id;
                    if ( this.id !== 'nuevo') {
                      this._heroesService.getHeroe( this.id ).subscribe( heroe => this.heroe = heroe );
                    }
                  });
               }

  ngOnInit() {  }

  guardar() {
    console.log(this.heroe);

    if ( this.id === 'nuevo') {
      this._heroesService.nuevoHeroe( this.heroe ).subscribe( data => {
        this.id = data.name;
        this.router.navigate(['/heroe', this.id ]);
      }, (err) => {
        console.log(err);
      });
    } else {
      this._heroesService.actualizarHeroe( this.heroe, this.id ).subscribe( data => {
        this.router.navigate(['/heroes']);
      }, (err) =>{
        console.log('Error: ', err);
      });
    }
  }

  agregarNuevo( form: NgForm )  {
    this.router.navigate(['/heroe', 'nuevo']);
    form.reset({
      casa: 'Marvel'
    });
  }
}
