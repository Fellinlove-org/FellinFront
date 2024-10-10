import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent {

@Output()
  nuevoClienteEvent = new EventEmitter<Cliente>();

  constructor(private clienteService: ClienteService,private router: Router) { 

  }

  addCliente() {
    console.log(this.formCliente); // Agrega esta línea para depurar
    this.clienteService.addCliente(this.formCliente);
    this.router.navigate(['/ClienteTabla']);
  }

  sendCliente!: Cliente;

  formCliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    foto: ''
  };

  nuevoClienteform() {
    console.log(this.formCliente);
   this.sendCliente = Object.assign({}, this.formCliente);
    this.nuevoClienteEvent.emit(this.sendCliente);
  }
}
