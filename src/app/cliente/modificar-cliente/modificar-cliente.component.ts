import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { Veterinario } from 'src/app/model/veterinario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent {

  @Output()
  nuevaClienteEvent = new EventEmitter<Cliente>();

  sendCliente!: Cliente;

  veterinarioLogueado !: Veterinario

  id : string | null | undefined 

  cedula!: string;
  nombre_usuario!: string;
  userType!: string;


  formCliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    foto: ''
  };

  constructor( private route: ActivatedRoute,
     private clienteService: ClienteService,
      private router: Router,
      private http: HttpClient)
  {}
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cedula = params.get('cedula')!;
      this.clienteService.findById(this.id!).subscribe(mascota => {
        this.sendCliente = mascota
        this.formCliente = mascota;
        console.log(this.sendCliente);
      })
    });
  }
  modificarCliente() {
    
    this.sendCliente = Object.assign({}, this.formCliente);
    console.log(this.sendCliente);
    this.clienteService.updateCliente(this.sendCliente).subscribe(
      (NuevoCliente: Cliente) => {
        console.log('Cliente agregado', NuevoCliente);
      }
    )
    this.router.navigate(['/clientes/', this.cedula]);
    
  }
}

