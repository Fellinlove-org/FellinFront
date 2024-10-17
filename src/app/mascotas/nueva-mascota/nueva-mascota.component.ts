import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROOT_URL } from 'src/app/app.component';
import { mergeMap, Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/service/cliente.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})
export class NuevaMascotaComponent {

@Output()
  nuevaMascotaEvent = new EventEmitter<Mascota>();

  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  mascota !: Mascota
  idmascota !: string

  sendMascota !: Mascota

  clientes : Cliente[] = []

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    cliente: {
      id: 0,
      cedula: '',
      nombre: '',
      correo: '',
      celular: '',
      foto: '',
    }
  };

  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private veterinarioService: VeterinarioService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router, 
    private http: HttpClient
  ) {} 


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      this.idmascota = params.get('id')!;
      this.clienteService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            if (this.userType === 'cliente') {
              // Si es cliente, obtenemos la información del cliente y sus mascotas
              return this.clienteService.findByCedula(this.cedula).pipe(
                mergeMap((clienteInfo) => {
                  this.nombre_usuario = clienteInfo.nombre;
                  return this.clienteService.findAll();
                })
              );
            } else if (this.userType === 'veterinario' ) {
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
        ).subscribe(clientes => {
          this.clientes = clientes
        })
    })
    
    
  }

  addMascota() {
    this.sendMascota = Object.assign({}, this.formMascota);
    console.log(this.sendMascota);
    console.log(this.sendMascota.cliente?.correo);
    this.mascotaService.addMascota(this.sendMascota).subscribe(
      (nuevaMascota: Mascota) => {
        console.log('Mascota agregada:', nuevaMascota);
      }
    )
    this.router.navigate(['/mascotas', this.cedula]);
  }

}
