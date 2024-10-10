import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/cliente/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL} from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {

  mascotas$ : Observable<any> = new Observable();

  clienteLogueado !: Cliente

  selectedMascota!: Mascota;

  mascotaList!: Mascota[] 

  constructor(
    private mascotaService : MascotaService, 
    private router: Router , 
    private	http: HttpClient
  ){ }
  ngOnInit():void{
    /*
    this.dataService.currentCliente.subscribe(cliente => {
      this.clienteLogueado = cliente;
    });
    console.log(`Cliente desde el componente app: ${this.clienteLogueado.correo}`)
    console.log(`Id para buscar mascota ${this.clienteLogueado.id}`);

    this.mascotas$ = this.http.get<mascota>(ROOT_URL + 'mascotas/search/' + this.clienteLogueado.cedula)
    this.mascotas$.subscribe(mascotasInfo => {
        console.log(mascotasInfo)
        this.mascotaList = mascotasInfo
    })
        */
  }

  MostrarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/find/' + this.selectedMascota.id]);
  }

  agregarMascota(mascota: Mascota) {
    this.mascotaList.push(mascota);
  }

  modificarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    this.router.navigate(['/mascota/update/' + this.selectedMascota.id]);
  }

  eliminarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
    console.log(this.selectedMascota.nombre);
    this.http.get<Mascota>(ROOT_URL + 'mascotas/delete/' + this.selectedMascota.id).subscribe()
    this.mascotaList = this.mascotaList.filter(mascota => mascota !== this.selectedMascota);
    this.router.navigate(['/mascotas/all']);
  }
  ngOnChanges(): void {
    this.mascotas$ = this.http.get<Mascota>(ROOT_URL + 'mascotas/search/' + this.clienteLogueado.cedula)
    this.mascotas$.subscribe(mascotasInfo => {
        console.log(mascotasInfo)
        this.mascotaList = mascotasInfo
    })
  }
}
