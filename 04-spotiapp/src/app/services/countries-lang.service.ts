import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesLangService {

  countries: any[] = [];
  constructor( private http: HttpClient) { }

  getCountriesLanguage() {
    const userLang = navigator.language || 'es';
    this.http.get(`https://restcountries.eu/rest/v2/lang/${userLang}`)
    .subscribe( ( resp: any ) => {
      console.log(resp);
      this.countries = resp;
    });
  }
}
