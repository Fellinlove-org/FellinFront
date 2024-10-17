import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Datoslogin } from 'src/app/model/datosLogin';
import { AdminService } from 'src/app/service/admin.service';
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
    private amdinService : AdminService
  ) {}


  datosLogin : Datoslogin = {
    cedula: '',
    password: ''
  }

  sendDatos!: Datoslogin;



  login() {
    console.log(this.datosLogin);
    this.sendDatos = Object.assign({}, this.datosLogin);
    if (this.userType == 'veterinario') {
      //verificar si la contraseña esta bien
      this.veterinarioService.login(this.datosLogin.cedula, this.datosLogin.password).subscribe(
        (data : any) => {
          console.log(data.msg);
          if (data.msg == 'ok'){
            this.router.navigate(['/veterinario/' + this.datosLogin.cedula]);
          }else{
            alert("Credenciales incorrectas");
          }
        },
        (error) => {
          console.log(error);
          alert("Credenciales incorrectas");
        }
      )
    } else if (this.userType == 'Admin') {
      this.router.navigate(['/admin/ + this.datosLogin.cedula']);
    } else if (this.userType == 'cliente') {
      this.router.navigate(['/cliente/' + this.datosLogin.cedula]);
    }
  }

  cambiarTipo(tipo: string) {
    this.userType = tipo
  }
}
