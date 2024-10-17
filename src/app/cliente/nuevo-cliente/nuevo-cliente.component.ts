import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent {

@Output()
  nuevoClienteEvent = new EventEmitter<Cliente>();

  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  cliente !: Cliente
  idcliente !: string

  sendCliente !: Cliente


  formCliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    foto: ''
  };


  constructor(private clienteService: ClienteService,
    private veterinarioService: VeterinarioService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { 

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      this.idcliente = params.get('id')!;
      this.veterinarioService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            
             if (this.userType === 'veterinario' ) {
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.clienteService.findAll();
                })
              );
            }else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.clienteService.findAll();
                })
              );
            } else {
              return new Observable<Cliente[]>();
            }
          })
        ).subscribe()
    })
    
    
  }


  addCliente() {
    this.sendCliente = Object.assign({}, this.formCliente);
    console.log(this.sendCliente);
    this.clienteService.addCliente(this.cliente).subscribe(
      (nuevoCliente: Cliente) => {
        console.log('Mascota agregada:', nuevoCliente);
      }
    )
    this.router.navigate(['/mascotas', this.cedula]);
  }
}
