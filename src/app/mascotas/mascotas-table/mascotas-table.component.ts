import { Component } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/model/cliente';
import { merge, mergeMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL} from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {


  selectedMascota!: Mascota;

  cedula !: string

  userType !: string

  nombre_usuario !: string

  mascotaList : Mascota[] = []
  listaFiltrada: Mascota[] = [];
  searchTerm: string = '';

  constructor(
    private mascotaService : MascotaService,
    private clienteService : ClienteService, 
    private veterinarioService : VeterinarioService,
    private adminService : AdminService,
    private router: Router ,
    private route: ActivatedRoute,
    private	http: HttpClient
  ){ }
  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
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
                  return this.mascotaService.findByClienteId(clienteInfo.id.toString());
                })
              );
            } else if (this.userType === 'veterinario' ) {
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.mascotaService.findAll();
                })
              );
            }else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.mascotaService.findAll();
                })
              );
            } else {
              return new Observable<Mascota[]>();
            }
          })
        )
        .subscribe(
          (mascotas: Mascota[]) => {
            this.mascotaList = mascotas;
            this.listaFiltrada = mascotas;
            console.log("Lista de mascotas: ", this.mascotaList);
          },
          (error) => {
            console.error('Error al obtener la lista de mascotas', error);
          }
        );

    })
  }

  MostrarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/'+ this.cedula +'/find/' + this.selectedMascota.id]);
  }

  agregarMascota(mascota: Mascota) {
    this.mascotaService.addMascota(mascota).subscribe(
      (nuevaMascota: Mascota) => {
        this.mascotaList?.push(nuevaMascota);
        console.log('Mascota agregada:', nuevaMascota);
      },
      (error) => {
        console.error('Error al agregar la mascota:', error);
      }
    );
  }

  modificarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/'+ this.cedula +'/update/' + this.selectedMascota.id]);
  }

  eliminarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    console.log(this.selectedMascota.nombre);
    this.mascotaService.deleteMascota(this.selectedMascota).subscribe()
    this.listaFiltrada = this.listaFiltrada.filter(m => m.id !== this.selectedMascota.id);
  }

  buscarMascota(): void {
    const term = this.searchTerm.toLowerCase();
  
    this.listaFiltrada = this.mascotaList.filter((mascota) =>
      mascota.nombre.toLowerCase().includes(term) ||
      mascota.raza.toLowerCase().includes(term)
    );
  }
  

}
