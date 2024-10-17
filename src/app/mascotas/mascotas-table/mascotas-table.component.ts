import { Component } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/model/cliente';
import { merge, mergeMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL} from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {


  selectedMascota!: Mascota;

  id !: string

  userType !: string

  nombre_usuario !: string

  mascotaList : Mascota[] = []
  listaFiltrada: Mascota[] = [];
  searchTerm: string = '';

  constructor(
    private mascotaService : MascotaService,
    private clienteService : ClienteService, 
    private router: Router ,
    private route: ActivatedRoute,
    private	http: HttpClient
  ){ }
  ngOnInit():void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      if(this.id == 'all'){
        this.mascotaService.findAll().subscribe(
          (mascotas: Mascota[]) => {
            this.mascotaList = mascotas;
            this.listaFiltrada = mascotas; 
            console.log("Lista de mascotas: ", this.mascotaList);
          },
          (error) => {
            console.error('Error al obtener la lista de mascotas', error);
          }
        );
      }else{
        this.clienteService.findById(this.id)
          .pipe(
            mergeMap((clienteInfo) =>{
              this.userType = 'cliente'
              this.nombre_usuario = clienteInfo.nombre
              return this.mascotaService.findByClienteId(clienteInfo.id.toString())
            })
          ).subscribe(
            (mascotas: Mascota[]) => {
              this.mascotaList = mascotas;
              console.log("Lista de mascotas: ", this.mascotaList);
            },
            (error) => {
              console.error('Error al obtener la lista de mascotas', error);
            }
          )
      }
    })
  }

  MostrarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/'+ this.id +'/find/' + this.selectedMascota.id]);
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
    //this.router.navigate(['/mascotas/veterinario/'+this.cedula]);
  }

  buscarMascota(): void {
    const term = this.searchTerm.toLowerCase();
  
    this.listaFiltrada = this.mascotaList.filter((mascota) =>
      mascota.nombre.toLowerCase().includes(term) ||
      mascota.raza.toLowerCase().includes(term)
    );
  }
  

}
