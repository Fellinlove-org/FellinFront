import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent {

  @Output()
  nuevaClienteEvent = new EventEmitter<Cliente>();

  sendCliente!: Cliente;

  formCliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    foto: ''
  };

  constructor( private route: ActivatedRoute, private clienteService: ClienteService, private router: Router)
  {

  }
  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    // Cargar los datos del cliente en el formulario
    const cliente = this.clienteService.findById(id);
    if (cliente) {
      // Asignamos todos los valores del cliente seleccionada al formulario
      this.formCliente = { ...cliente };
    }
  }

  modificarCliente() {

    this.clienteService.updateCliente(this.formCliente);
    this.router.navigate(['/ClienteTabla']);
  }
}

