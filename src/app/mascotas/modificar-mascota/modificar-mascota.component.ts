import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss']
})
export class ModificarMascotaComponent {
  
  @Output()
  nuevaMascotaEvent = new EventEmitter<Mascota>();

  sendMascota!: Mascota;

  clienteLogueado !: Cliente;

  cedula!: string;
  nombre_usuario!: string;
  userType!: string;

  id: string | null | undefined;

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cedula = params.get('cedula')!;
      this.mascotaService.findClienteCedulaById(this.id!).subscribe(cliente => {
        this.clienteLogueado = cliente;
      });
      this.mascotaService.findById(this.id!).subscribe(mascota => {
        this.sendMascota = mascota;
        this.formMascota = mascota; // Asignar mascota recibida al formulario
        console.log(this.sendMascota);
      });
    });
  }

  modificarMascota() {
    this.sendMascota = { ...this.formMascota }; // Copiar los datos del formulario
    console.log('Enviando mascota para modificación:', this.sendMascota);
    this.mascotaService.updateMascota(this.sendMascota, this.clienteLogueado.cedula).subscribe(
      (nuevaMascota: Mascota) => {
        console.log('Mascota modificada:', nuevaMascota);
        this.router.navigate(['/mascotas/', this.cedula]);
      },
      error => {
        console.error('Error al modificar la mascota:', error);
      }
    );
  }
}
