import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { mascotaDTO } from 'src/app/model/mascotaDTO';
import { ROOT_URL } from 'src/app/app.component';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss']
})
export class ModificarMascotaComponent {

  @Output()
  nuevaMascotaEvent = new EventEmitter<Mascota>();

  sendMascota!: Mascota;

  clienteLogueado !: Cliente

  mascotaDTO !: mascotaDTO

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor( private route: ActivatedRoute, 
    private mascotaService: MascotaService, 
    private router: Router,
    private http: HttpClient)
  {

  }
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    /*
    this.dataService.currentMascota.subscribe(mascota => {
      this.sendMascota = mascota
      console.log(this.sendMascota);
      
    })
    this.dataService.currentCliente.subscribe(cliente => {
      this.clienteLogueado = cliente;
    })
      */
    
    this.formMascota = this.sendMascota;
    // Cargar los datos de la mascota en el formulario
    //const mascota = this.mascotaService.findById(id);
    //if (mascota) {
      // Asignamos todos los valores de la mascota seleccionada al formulario
      //this.formMascota = { ...mascota };
    //}
  }

  modificarMascota() {


    this.mascotaDTO = {
      mascota: this.formMascota,  // Datos del formulario de la mascota
      id: this.clienteLogueado.id  // Cédula del cliente logueado
    };
    console.log("MascotaDTO: "+this.mascotaDTO);
    this.http.post<Mascota>(ROOT_URL + 'mascotas/update', this.mascotaDTO).subscribe(response => {
      console.log("Mascota agregada exitosamente:", response);
      this.router.navigate(['/mascotas/all']);  // Redirigir a la lista de mascotas
    }, error => {
          console.error("Error al agregar la mascota:", error);
    })

    this.router.navigate(['/mascotas/all']);
  }
}

