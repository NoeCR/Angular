import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHeroe } from '../models/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesUrl: string = 'https://heroesapp-2263b.firebaseio.com/heroes.json';
  heroeUrl: string = 'https://heroesapp-2263b.firebaseio.com/heroes/';

  constructor(private http: HttpClient) { }

  getHeroe( key$: string ) {
    const url = `${this.heroeUrl}/${key$}.json`;

    return this.http.get( url ).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getAllHeroes() {
    return this.http.get( this.heroesUrl ).pipe(
      map( ( res: any ) => {
        return res;
      })
    );
  }
  nuevoHeroe( heroe: IHeroe ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(heroe);
    return this.http.post( this.heroesUrl, body , { headers }).pipe(
      map( (res: any ) => {
        return res;
      })
    );
  }

  actualizarHeroe( heroe: IHeroe, key$: string ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(heroe);

    const url = `${ this.heroeUrl }/${ key$ }.json`;
    return this.http.put( url, body , { headers }).pipe(
      map( (res: any ) => {
        return res;
      })
    );
  }
  eliminarHeroe(  key$: string ) {
    const url = `${ this.heroeUrl }/${ key$ }.json`;

    return this.http.delete( url ).pipe(
      map( (res: any ) => {
        return res;
      }));
  }
}
