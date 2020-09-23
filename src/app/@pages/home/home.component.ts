import { AuthuserService } from './../../services/authuser-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: string;
  constructor( private auth: AuthuserService,private router: Router) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

  cerrarSesion() {
    this.auth.logoutUser();
    this.router.navigateByUrl('/login');
  }
}
