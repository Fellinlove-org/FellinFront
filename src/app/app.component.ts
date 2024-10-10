import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente/cliente';
import { Observable } from 'rxjs';
import { ClienteCL } from './model/cliente-cl';
import { UserService } from './service/user.service';
import { Veterinario } from './veterinario/veterinario';
import { Admin } from './admin/admin';


export const ROOT_URL = 'http://localhost:8090/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  

  constructor(private router: Router, private	http: HttpClient, private userService: UserService) {}

  

  title = 'FellinFront';

  userType !: string
  userName !: string
  cedula !: string

  cliente_logueado !: Cliente 
  veterinario_logueado !: Veterinario
  admin_logueado !: Admin

  cliente$ : Observable<any> = new Observable();


  ngOnInit() {
    this.userService.currentCliente.subscribe((cliente) => {
      this.cliente_logueado = cliente
      this.userName = this.cliente_logueado.nombre
      this.cedula = this.cliente_logueado.cedula
    })
    this.userService.currentVeterinario.subscribe((veterinario) => {
      this.veterinario_logueado = veterinario
      this.userName = this.veterinario_logueado.nombre
      this.cedula = this.veterinario_logueado.cedula
    })
    this.userService.currentAdmin.subscribe((admin) => {
      this.admin_logueado = admin
      this.userName = this.admin_logueado.nombre
      this.cedula = this.admin_logueado.cedula
    })
    this.userService.currentUserType.subscribe(userType => this.userType = userType)
  }




}
