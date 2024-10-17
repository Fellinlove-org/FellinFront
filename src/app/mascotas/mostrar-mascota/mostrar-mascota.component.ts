import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable, pipe } from 'rxjs';
import { ROOT_URL } from 'src/app/app.component';
import { ClienteService } from 'src/app/service/cliente.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.component.html',
  styleUrls: ['./mostrar-mascota.component.scss']
})
export class MostrarMascotaComponent {

  
  cedula !: string;
  idmascota !: string;

  nombre_usuario !: string;

  userType !: string;


  mascota!: Mascota;

  clienteLogueado !: Cliente


  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService, 
    private veterinarioService: VeterinarioService,
    private adminService: AdminService,
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) {
    
  } 


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
                  return this.mascotaService.findById(this.idmascota);
                })
              );
            } else if (this.userType === 'veterinario' ) {
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.mascotaService.findById(this.idmascota);
                })
              );
            }else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.mascotaService.findById(this.idmascota);
                })
              );
            } else {
              return new Observable<Mascota>();
            }
          })
        ).subscribe(mascota => {
          this.mascota = mascota
          console.log(this.mascota);
        })
    })
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente():void{
    //let nextID = this.Mascota.id+1
    //this.router.navigate(['/mascota/find' , nextID])
  }
}
