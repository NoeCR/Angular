// tslint:disable: no-string-literal
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQC4v4qejwbg-ESSCw5zETVMD83a_FyY1pJbhqgSA1cAETooP5By4H5lROp1DFb-tWkfwzBYqZVJuuWynIc'
    });

    return this.http.get(url, { headers });
  }
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data['albums'].items));
  }

  getArtists( term: string ) {
    return this.getQuery(`search?q=${term}&type=artist`)
                .pipe( map( data =>  data['artists'].items));
  }

  getArtist( id: string ) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string, location?: string ) {
    const country = location || 'es';
    return this.getQuery(`artists/${id}/top-tracks?country=${country}`)
                .pipe( map( data => data['tracks']) );
  }
}
