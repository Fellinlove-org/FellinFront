import { Component } from '@angular/core';
import { DataService } from './service/dataService.cl';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { cliente } from './cliente/cliente';
import { Observable } from 'rxjs';
import { ClienteCL } from './model/cliente-cl';


export const ROOT_URL = 'http://localhost:8090/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  

  constructor(private dataService: DataService, private router: Router, private	http: HttpClient) {}

  

  title = 'FellinFront';

  //cambiar a usuario logueado
  //logueado !: cliente 
  //logueado = "NOMBRE QUE VIENE DEL API"
  cliente_logueado !: cliente 

  cliente$ : Observable<any> = new Observable();


  ngOnInit() {
    this.dataService.currentCedula.subscribe(cedula => {
      console.log(`Cédula desde el componente login: ${cedula}`);
      //llamado al api+
      this.cliente$ = this.http.get<cliente>(ROOT_URL + 'clientes/search/' + cedula);
      this.cliente$.subscribe(clienteInfo => {
        console.log(clienteInfo)
        this.cliente_logueado = clienteInfo
        this.cargarCliente(this.cliente_logueado)
      }
      )
      this.router.navigate(['/']);
    });
  }

  cargarCliente(cliente : cliente) {
    console.log(`cliente logueado ${cliente.cedula}`);
    this.dataService.changeCliente(cliente);
  }


}
