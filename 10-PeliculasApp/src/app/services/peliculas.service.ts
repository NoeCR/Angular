import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey: string = environment.MOVIES_KEY;
  private urlMoviedb: string = 'https://api.themoviedb.org/3';

  constructor(private http:HttpClient) { }

  getPopulares(): Observable<object> {
    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }
  getPelicula( titulo: string ) {
    // tslint:disable-next-line: max-line-length
    const url = `${ this.urlMoviedb }/search/movie?query=${ titulo }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }
}
