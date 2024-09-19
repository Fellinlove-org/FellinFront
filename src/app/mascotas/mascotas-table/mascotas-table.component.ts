import { Component } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascotas-table',
  templateUrl: './mascotas-table.component.html',
  styleUrls: ['./mascotas-table.component.scss']
})
export class MascotasTableComponent {

  selectedMascota!: mascota;

  mascotaList!: mascota[] 

  constructor(private mascotaService : MascotaService){
    
  }
  ngOnInit():void{
    this.mascotaList=this.mascotaService.findAll();
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
