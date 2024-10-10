import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.scss']
})
export class ClienteTableComponent{

  selectedCliente!: Cliente;

  clienteList!: Cliente[] 

  constructor(private clienteService : ClienteService){
    
  }
  ngOnInit():void{
    this.clienteList=this.clienteService.findAll();
  }

  MostrarCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
  }
  agregarCliente(cliente: Cliente) {
    this.clienteList.push(cliente);
  }

  eliminarCliente(cliente: Cliente) {
    const index = this.clienteList.indexOf(cliente);
      this.clienteList.splice(index, 1);
  }
}
