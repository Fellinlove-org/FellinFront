import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/service/cliente.service';
import { mergeMap, Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

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

  idmascota !: string;

  mascota!: Mascota;

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
    foto: '',
    estado : false
  };

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private router: Router,
    private http: HttpClient,
    private clienteService: ClienteService,
    private adminService: AdminService,
    private veterinarioService: VeterinarioService,
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
      })
      this.clienteService.findTypeUser(this.cedula)
      .pipe(
        mergeMap((userType) => {
          this.userType = userType.userType;
          console.log(this.userType);
          if (this.userType === 'cliente') {
            // Si es cliente, obtenemos la información del cliente y sus mascotas
            return this.clienteService.findByCedula(this.cedula).pipe(
              mergeMap((clienteInfo) => {
                this.nombre_usuario = clienteInfo.nombre;
                return this.mascotaService.findById(this.idmascota);
              })
            );
          } else if (this.userType === 'veterinario' ) {
            return this.veterinarioService.findByCedula(this.cedula).pipe(
              mergeMap((vetInfo) => {
                this.nombre_usuario = vetInfo.nombre;
                return this.mascotaService.findById(this.idmascota);
              })
            );
          }else if (this.userType === 'administrador') {
            return this.adminService.findByCedula(this.cedula).pipe(
              mergeMap((adminInfo) => {
                this.nombre_usuario = adminInfo.nombre;
                return this.mascotaService.findById(this.idmascota);
              })
            );
          } else {
            return new Observable<Mascota>();
          }
        })
      ).subscribe(mascota => {
        this.mascota = mascota
        console.log(this.mascota);
      })
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
