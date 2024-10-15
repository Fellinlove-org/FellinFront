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

  id : string | null | undefined

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
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.mascotaService.findById(this.id!).subscribe(mascota => {
        this.sendMascota = mascota
        this.formMascota = mascota;
        console.log(this.sendMascota);
      })
    });
  }

  modificarMascota() {
    this.mascotaDTO = {
      mascota: this.formMascota,  // Datos del formulario de la mascota
      id: this.clienteLogueado.id  // Cédula del cliente logueado
    };
    this.mascotaService.updateMascota(this.mascotaDTO).subscribe(
      () => {
        console.log('Mascota agregada:', this.mascotaDTO);
      },
      (error) => {
        console.error('Error al agregar la mascota:', error);
      }
    );
  }
}

