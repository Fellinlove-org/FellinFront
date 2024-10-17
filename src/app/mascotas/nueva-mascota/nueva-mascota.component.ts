import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
import { ROOT_URL } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})
export class NuevaMascotaComponent {

@Output()
  nuevaMascotaEvent = new EventEmitter<Mascota>();

  mascotas$ : Observable<any> = new Observable();
  clienteLogueado !: Cliente
  sendMascota!: Mascota;

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor(private mascotaService: MascotaService,private router: Router, private http: HttpClient) {} 


  addMascota() {
    
  }

  

  

  nuevaMascotaform() {
    console.log(this.formMascota);
   this.sendMascota = Object.assign({}, this.formMascota);
    this.nuevaMascotaEvent.emit(this.sendMascota);
  }
}
