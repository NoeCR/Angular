import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditComponent } from './mapa-edit.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  title: string = 'GoogleMap test';
  description: string = 'Pruebas de API de Google';

  lat: number = 39.980154008126014;
  lng: number = -0.047325157878276514;

  marcadores: Marcador[] = [];

  durationInSeconds = 5000; // 5 segundos

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) 
  { 
    if( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores') );
    } else {
      const MARCADOR = new Marcador( 
                            this.lat, 
                            this.lng, 
                            this.title, 
                            this.description);
      this.marcadores.push( MARCADOR );
      console.log('Marcadores predefinidos.\n', this.marcadores);
    }
  }

  ngOnInit() {}

  agregarMarcador( evnt ) {
    console.log(evnt);
    const coords: { lat: number, lng: number } = evnt.coords;

    const MARCADOR = new Marcador( 
      coords.lat, 
      coords.lng, 
      'Nuevo Marcador', 
      'Descripción del nuevo marcador');
    
    console.log(MARCADOR);
    console.log('Marcadores predefinidos.\n', this.marcadores);
    this.marcadores.push( MARCADOR );
    this.guardarStorage();
    this.snackBar.open('Marcado agregado', 
                        'Cerrar', 
                        { duration: this.durationInSeconds });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador( i: number ){
    console.log(i);
    this.marcadores.splice(i, 1);
    this. guardarStorage();
    this.snackBar.open('Marcado borrado', 
                        'Cerrar',
                        { duration: this.durationInSeconds });
  }
  editarMarcador( marcador: Marcador ) {
    const dialogRef = this.dialog.open( MapaEditComponent, {
      width: '450px',
      data: { title: 'Titulo', description: 'Descripción' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        console.log('The dialog was closed', result);
        marcador.title = result.title;
        marcador.desc = result.description;
        this.snackBar.open('Marcado actualizado', 
                        'Cerrar', 
                        { duration: this.durationInSeconds });
      }
    });
  }
}
