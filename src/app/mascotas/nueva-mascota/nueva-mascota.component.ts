import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})
export class NuevaMascotaComponent {

@Output()
  nuevaMascotaEvent = new EventEmitter<mascota>();

  constructor(private mascotaService: MascotaService,private router: Router) { 

  }

  addMascota() {
    console.log(this.formMascota); // Agrega esta línea para depurar
    this.mascotaService.addMascota(this.formMascota);
    this.router.navigate(['/MascotaTabla']);
  }

  sendMascota!: mascota;

  formMascota: mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  nuevaMascotaform() {
    console.log(this.formMascota);
   this.sendMascota = Object.assign({}, this.formMascota);
    this.nuevaMascotaEvent.emit(this.sendMascota);
  }
}
