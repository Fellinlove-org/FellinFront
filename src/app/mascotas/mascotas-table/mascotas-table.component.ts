import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/cliente/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL} from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {

  mascotas$ : Observable<any> = new Observable();

  clienteLogueado !: Cliente

  selectedMascota!: Mascota;

  rol : string | null | undefined
  cedula : string | null | undefined

  mascotaList : Mascota[] | undefined = []

  constructor(
    private mascotaService : MascotaService, 
    private router: Router ,
    private route: ActivatedRoute,
    private	http: HttpClient
  ){ }
  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.rol = params.get('rol');
      this.cedula = params.get('cedula');
      if(this.rol == 'cliente'){
        this.mascotaService.findByClienteCedula(this.cedula!).subscribe(
          (mascotas: Mascota[]) => {
            this.mascotaList = mascotas;
            console.log("Lista de mascotas: ", this.mascotaList);
          },
          (error) => {
            console.error('Error al obtener la lista de mascotas', error);
          }
        );
      }else if(this.rol== 'veterinario')
      {
        this.mascotaService.findAll().subscribe(
          (mascotas: Mascota[]) => {
            this.mascotaList = mascotas;
            console.log("Lista de mascotas: ", this.mascotaList);
          },
          (error) => {
            console.error('Error al obtener la lista de mascotas', error);
          }
        );
      }else if(this.rol== 'veterinario')
      {
        this.mascotaService.findAll().subscribe(
          (mascotas: Mascota[]) => {
            this.mascotaList = mascotas;
            console.log("Lista de mascotas: ", this.mascotaList);
          },
          (error) => {
            console.error('Error al obtener la lista de mascotas', error);
          }
        );
      }
      else if(this.rol== 'administrador')
        {
          this.mascotaService.findAll().subscribe(
            (mascotas: Mascota[]) => {
              this.mascotaList = mascotas;
              console.log("Lista de mascotas: ", this.mascotaList);
            },
            (error) => {
              console.error('Error al obtener la lista de mascotas', error);
            }
          );
        }

    })
  }

  MostrarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/find/' + this.selectedMascota.id]);
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
    this.router.navigate(['/mascota/update/' + this.selectedMascota.id]);
  }

  eliminarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    console.log(this.selectedMascota.nombre);
    this.http.get<Mascota>(ROOT_URL + 'mascotas/delete/' + this.selectedMascota.id).subscribe()
    this.mascotaList = this.mascotaList?.filter(mascota => mascota !== this.selectedMascota);
    this.router.navigate(['/mascotas/veterinario/'+this.cedula]);
  }
  ngOnChanges(): void {
    this.mascotas$ = this.http.get<Mascota>(ROOT_URL + 'mascotas/search/' + this.clienteLogueado.cedula)
    this.mascotas$.subscribe(mascotasInfo => {
        console.log(mascotasInfo)
        this.mascotaList = mascotasInfo
    })
  }
}
