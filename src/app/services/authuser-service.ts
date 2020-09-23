import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  public url: string;
  public apiKey: string;
  public userToken: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
    this.readToken();
  }

  /**
   * metodo de registro de usuarios
   */
  createUser( nUsuario: UsuarioModel) {
    const userData = {
      ...nUsuario
    };
    return this.http.post(`${this.url}/signup`, userData).pipe(
        map( res => {
          this.saveToken(res[`token`]);
        })
    );
  }

  /**
   * metodo de login de usuario
   */
  loginUser( lUsuario: UsuarioModel ) {
    const userData = {
      ...lUsuario,
    };

    return this.http.post(`${this.url}/login`, userData).pipe(
      map( res => {
        this.saveToken(res[`token`]);
      })
    );
  }

  /**
   * metodo de cierre de sesion del usuario
   */
   logoutUser() {
      localStorage.removeItem('Token');
      this.readToken();
   }

   /**
    * metodo para guardar el token del usuario en local storage
    */
   private saveToken( idToken: string) {
     this.userToken = idToken;
     localStorage.setItem('Token', idToken);
   }

   /**
    * metodo para la lectura del token
    */
   readToken() {
     if ( localStorage.getItem('Token') ) {
        this.userToken = localStorage.getItem('Token');
     } else {
       this.userToken = '';
     }
     return this.userToken;
   }

   /**
    * metodo de autenticacion de token
    */
   stateUser(): boolean {
     return this.userToken.length > 2;
   }
}
