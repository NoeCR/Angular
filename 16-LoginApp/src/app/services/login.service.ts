import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  public userToken: string;
  // Create new user
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient ) {
    this.readToken();
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  login( user: IUser ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${environment.apiKeyFirebase}`,
      authData
    ).pipe(
      map( ( resp: any ) => {
        this.saveToken( resp.idToken );
        return resp;
      })
    );
  }

  register( user: IUser ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signUp?key=${environment.apiKeyFirebase}`,
      authData
    ).pipe(
      map( ( resp: any ) => {
        this.saveToken( resp.idToken );
        return resp;
      })
    );
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem( 'userToken', idToken );

    const today = new Date();
    today.setSeconds( 3600 );

    localStorage.setItem('expire', today.getTime.toString() );
  }

  public readToken() {
    const TOKEN = localStorage.getItem('userToken') || '';
    if ( TOKEN.length > 0 ) {
      this.userToken = TOKEN;
    }
  }

  public authUser(): boolean {

    if ( this.userToken !== undefined ) { return false; }

    const expire = Number( localStorage.getItem('expire') );
    const expireDate = new Date();
    expireDate.setTime( expire );

    if ( expireDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}
