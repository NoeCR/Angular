import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // variables
  title = 'Pipes in Angular';
  arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI = Math.PI;
  a = 0.234;
  salario = 1234.5;
  heroe = {
    nombre: 'Tony Stark',
    clave: 'IronMan',
    edad: 40,
    direccion: {
      calle: 'primera',
      casa: '1'
    }
  };

  valorDepormesa = new Promise( (resolve, reject) => {
    setTimeout( () => resolve('Llego la data'), 3500 );
  } );

  fecha = new Date();

  titelTwo = 'EstO es uN tExTo ExTraÑo';

  video = 'gOQO-mHEV04';

  password = 'contraseña';
  activar = true;
}
