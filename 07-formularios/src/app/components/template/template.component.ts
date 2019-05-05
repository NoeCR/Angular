import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario: Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: "",
    sexo: 'H',
    acepta: false
  };

  paises = [
    {
      codigo: 'ES',
      nombre: 'España'
    },
    {
      codigo: 'CRI',
      nombre: 'Costa Rica'
    },
    {
      codigo: 'FR',
      nombre: 'Francia'
    },
    {
      codigo: 'IT',
      nombre: 'Italia'
    },
  ];

  sexos = [
    {
      codigo: 'H',
      nombre: 'Hombre'
    },
    {
      codigo: 'M',
      nombre: 'Mujer'
    },
  ];
  constructor() { }


  guardar(forma: NgForm) {
    console.log('Formulario posteado! ');
    console.log('ngFrom', forma);
    console.log('Valor ', forma.value);

    console.log('Usuario. ', this.usuario);
  }
}
