import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
import { ROOT_URL } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/dataService.cl';
import { cliente } from 'src/app/cliente/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html',
  styleUrls: ['./nueva-mascota.component.scss']
})
export class NuevaMascotaComponent {

@Output()
  nuevaMascotaEvent = new EventEmitter<mascota>();

  mascotas$ : Observable<any> = new Observable();
  clienteLogueado !: cliente

  formMascota: mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor(private mascotaService: MascotaService,private router: Router, private dataService: DataService, private http: HttpClient) {} 


  addMascota() {
    console.log(this.formMascota); // Agrega esta línea para depurar
    this.dataService.currentCliente.subscribe(cliente => {
      this.clienteLogueado = cliente;
      this.http.post<any>(ROOT_URL + 'mascotas/agregar', this.formMascota).subscribe(response => {
          console.log("Mascota agregada exitosamente:", response);
          this.router.navigate(['/mascotas/all']);  // Redirigir a la lista de mascotas
      }, error => {
          console.error("Error al agregar la mascota:", error);
      })
    });
    
  }

  sendMascota!: mascota;

  

  nuevaMascotaform() {
    console.log(this.formMascota);
   this.sendMascota = Object.assign({}, this.formMascota);
    this.nuevaMascotaEvent.emit(this.sendMascota);
  }
}
