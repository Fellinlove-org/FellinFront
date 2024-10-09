import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';
import { ROOT_URL } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/dataService.cl';
import { cliente } from 'src/app/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { mascotaDTO } from 'src/app/model/mascotaDTO';

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
  mascotaDTO !: mascotaDTO

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
    this.dataService.currentCliente.subscribe(cliente => {
      this.clienteLogueado = cliente;
    })
    console.log("formMascota: " + this.formMascota);
    console.log("id cliente: " + this.clienteLogueado.id);
    this.mascotaDTO = {
      mascota: this.formMascota,  // Datos del formulario de la mascota
      id: this.clienteLogueado.id  // Cédula del cliente logueado
    };
    console.log("MascotaDTO: "+this.mascotaDTO);
    this.http.post<mascota>(ROOT_URL + 'mascotas/add', this.mascotaDTO).subscribe(response => {
      console.log("Mascota agregada exitosamente:", response);
      this.router.navigate(['/mascotas/all']);  // Redirigir a la lista de mascotas
    }, error => {
          console.error("Error al agregar la mascota:", error);
    })
    
    
  }

  sendMascota!: mascota;

  

  nuevaMascotaform() {
    console.log(this.formMascota);
   this.sendMascota = Object.assign({}, this.formMascota);
    this.nuevaMascotaEvent.emit(this.sendMascota);
  }
}
