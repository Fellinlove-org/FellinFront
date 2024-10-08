import { Component } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { DataService } from 'src/app/service/dataService.cl';
import { cliente } from 'src/app/cliente/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOT_URL} from 'src/app/app.component';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {

  mascotas$ : Observable<any> = new Observable();

  clienteLogueado !: cliente

  selectedMascota!: mascota;

  mascotaList!: mascota[] 

  constructor(private mascotaService : MascotaService, private dataService: DataService, private	http: HttpClient){
    
  }
  ngOnInit():void{
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
  }

  MostrarMascota(Mascota: mascota) {
    this.selectedMascota = Mascota;
  }
  agregarMascota(Mascota: mascota) {
    this.mascotaList.push(Mascota);
  }

  eliminarMascota(mascota: mascota) {
    const index = this.mascotaList.indexOf(mascota);
      this.mascotaList.splice(index, 1);
  }
}
