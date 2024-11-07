import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Datoslogin } from 'src/app/model/datosLogin';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  userType : string = 'cliente';

  constructor(
    private router: Router,
    private veterinarioService : VeterinarioService,
    private clienteService : ClienteService,
    private amdinService : AdminService
  ) {}


  datosLogin : User = {
    cedula: '',
    password: ''
  }

  sendDatos!: User;



  login() {
    console.log(this.datosLogin);
    this.sendDatos = Object.assign({}, this.datosLogin);
    if (this.userType == 'veterinario') {
      //verificar si la contraseña esta bien
      
      this.veterinarioService.login(this.datosLogin).subscribe(
        (data : any) => {
          localStorage.setItem('token', String(data));
          this.router.navigate(['/veterinario/' + this.datosLogin.cedula]);
        },
        (error) => {
          console.log(error);
        }
      )
    } else if (this.userType == 'Admin') {
      this.amdinService.login(this.datosLogin).subscribe(
        (data : any) => {
          localStorage.setItem('token', String(data));
          this.router.navigate(['/admin/' + this.datosLogin.cedula]);
        },
        (error) => {
          console.log(error);
        }
      )
    } else if (this.userType == 'cliente') {
      this.clienteService.login(this.datosLogin).subscribe(
        (data : any) => {
          localStorage.setItem('token', String(data));
          this.router.navigate(['/cliente/' + this.datosLogin.cedula]);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  cambiarTipo(tipo: string) {
    this.userType = tipo
  }
}
