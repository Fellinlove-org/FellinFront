import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private userService: UserService) {}

  cedula: string = '';


  login() {
    console.log(`cedula en el form ${this.cedula}`);
    this.userService.login(this.cedula);
    this.router.navigate(['/home/' + this.cedula]);
  }
}
