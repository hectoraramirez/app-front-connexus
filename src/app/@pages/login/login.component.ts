import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthuserService } from '../../services/authuser-service';
import { UsuarioModel } from './../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  mensageError: string = '';

  constructor(private auth: AuthuserService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
  }

  /**
   *
   * @param loginUsuario
   * @description consumo el api de login
   */

  login( loginUsuario: NgForm) {
    if (loginUsuario.invalid) {
      return;
    }

    this.auth.loginUser(this.usuario).subscribe(res => {
      this.mensageError = '';
      console.log(res);
      localStorage.setItem('usuario', this.usuario.username);
      this.router.navigateByUrl('/home');
    }, er => {
      this.mensageError = er.error;
    });
  }

}
