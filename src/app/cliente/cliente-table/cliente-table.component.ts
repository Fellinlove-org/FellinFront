import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROOT_URL } from 'src/app/app.component';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.scss']
})
export class ClienteTableComponent{

  cliente$ : Observable<any> = new Observable();

  rol : string | null | undefined

  selectedCliente!: Cliente;

  clienteList!: Cliente[] 

  constructor(
    private clienteService : ClienteService, 
    private router : Router,
    private route : ActivatedRoute,
    private http : HttpClient

  ){}

    ngOnInit():void{
      this.route.paramMap.subscribe(params => {
        this.rol = params.get('rol');
        const cedula = params.get('cedula');
        if(this.rol== 'veterinario')
        {
          this.clienteService.findAll().subscribe(
            (cliente: Cliente[]) => {
              this.clienteList = cliente;
              console.log("Lista de clientes: ", this.clienteList);
            },
            (error) => {
              console.error('Error al obtener la lista de clientes', error);
            }
          );
        }else if(this.rol== 'administrador')
        {
          this.clienteService.findAll().subscribe(
            (cliente: Cliente[]) => {
              this.clienteList = cliente;
              console.log("Lista de clientes: ", this.clienteList);
            },
            (error) => {
              console.error('Error al obtener la lista de clientes', error);
            }
          );
        }
  
      })
    }

  MostrarCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.router.navigate(['/clientes/find'+ this.selectedCliente.id])
  }
  agregarCliente(cliente: Cliente) {
    this.clienteService.addCliente(cliente).subscribe(
      (nuevoCliente : Cliente)=> {
        this.clienteList?.push(nuevoCliente);
        console.log('Cliente agregado:', nuevoCliente);
      },
      (error) => {
        console.error('Error al agregar al cliente:', error);
      }

    );
  }

  eliminarCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
    console.log(this.selectedCliente.nombre);
    this.http.get<Cliente>(ROOT_URL + 'clientes/delete/' + this.selectedCliente.id).subscribe()
    this.router.navigate(['/clientes/all']);
  }
}

