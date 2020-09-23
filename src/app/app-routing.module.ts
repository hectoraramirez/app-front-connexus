import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './@pages/home/home.component';
import { SigninComponent } from './@pages/signin/signin.component';
import { LoginComponent } from './@pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
