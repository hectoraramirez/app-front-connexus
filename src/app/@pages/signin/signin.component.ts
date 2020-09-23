import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthuserService } from '../../services/authuser-service';
import { UsuarioModel } from './../../models/usuario.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usuario: UsuarioModel;
  passwordRep: string;
  mensageError: string = '';

  constructor(private auth: AuthuserService , private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
  }

  /**
   * funcion para registrar al nuevo usuario
   * @param nuevoUsuario
   */
  registrarUsuario( nuevoUsuario: NgForm ) {

    if ( nuevoUsuario.invalid && this.validatePassword()) {
      return;
    }

    this.auth.createUser( this.usuario ).subscribe( res => {
      console.log(res);
      localStorage.setItem('usuario', this.usuario.username);
      this.router.navigateByUrl('/home');
    }, er => {
      this.mensageError = er.error;
    });
  }

  /**
   * funcion para validar que ambas contraseñas sean iguales
   *
   */
  validatePassword(): boolean {
    return this.passwordRep === this.usuario.password;
  }

}
