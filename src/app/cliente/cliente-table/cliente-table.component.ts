import { Component } from '@angular/core';
import { cliente } from '../cliente';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.scss']
})
export class ClienteTableComponent{

  selectedCliente!: cliente;

  clienteList!: cliente[] 

  constructor(private clienteService : ClienteService){
    
  }
  ngOnInit():void{
    this.clienteList=this.clienteService.findAll();
  }

  MostrarCliente(Cliente: cliente) {
    this.selectedCliente = Cliente;
  }
  agregarCliente(Cliente: cliente) {
    this.clienteList.push(Cliente);
  }

  eliminarCliente(cliente: cliente) {
    const index = this.clienteList.indexOf(cliente);
      this.clienteList.splice(index, 1);
  }
}
