import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { Veterinario } from 'src/app/model/veterinario';
import { HttpClient } from '@angular/common/http';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent {

  @Output()
  nuevaClienteEvent = new EventEmitter<Cliente>();

  sendCliente!: Cliente;

  cliente!: Cliente;

  veterinarioLogueado !: Veterinario

  id : string | null | undefined 

  cedula!: string;
  nombre_usuario!: string;
  userType!: string;

  idcliente !: string;


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
      private veterinarioService: VeterinarioService,
      private adminService: AdminService,
      private router: Router,
      private http: HttpClient)
  {}
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.idcliente = params.get('id')!;
      this.cedula = params.get('cedula')!;
      this.clienteService.findById(this.id!).subscribe(mascota => {
        this.sendCliente = mascota
        this.formCliente = mascota;
        console.log(this.sendCliente);
      })
      this.veterinarioService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            if (this.userType === 'cliente') {
              // Si es cliente, obtenemos la información del cliente
              return this.clienteService.findById(this.idcliente);
            } else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.clienteService.findById(this.idcliente);
                })
              );
            } else if (this.userType === 'veterinario') {
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.clienteService.findById(this.idcliente);
                })
              );
            } else {
              return new Observable<Cliente>();
            }
          })
        ).subscribe(cliente => {
          this.cliente = cliente;
          console.log(this.cliente);
        });
    });
  }
  modificarCliente() {
    
    this.sendCliente = Object.assign({}, this.formCliente);
    console.log(this.sendCliente);
    this.clienteService.updateCliente(this.sendCliente).subscribe(
      (NuevoCliente: Cliente) => {
        console.log('Cliente agregado', NuevoCliente);
        this.router.navigate(['/clientes/', this.cedula]);
      }
    )
    
    
  }
}

