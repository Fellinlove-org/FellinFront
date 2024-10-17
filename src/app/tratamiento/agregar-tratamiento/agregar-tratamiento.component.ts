import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { Droga } from 'src/app/model/droga';
import { Mascota } from 'src/app/model/mascota';
import { Veterinario } from 'src/app/model/veterinario';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DrogaService } from 'src/app/service/droga.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-add-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.scss'],
})
export class AddTratamientoComponent {
  constructor(
    private mascotaService: MascotaService,
    private drogaService: DrogaService,
    private veterinarioService: VeterinarioService,
    private tratamientoService: TratamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  mascotas!: Mascota[];
  drogas!: Droga[];
  veterinarios!: Veterinario[];
  unidadesDisponibles: number[] = [];

  ngOnInit(): void {
    this.mascotaService.findAll().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });
    this.drogaService.findAll().subscribe((drogas) => {
      this.drogas = drogas;
    });
  }

  formConsulta: Tratamiento = {
    id: 0,
    fechaConsulta: new Date(),
    cantidad: 0,
    veterinario: {
      id: 0,
      nombre: '',
      cedula: '',
      especialidad: '',
      foto: '',
      password: '',
      correo: '',
    },
    mascota: {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      foto: '',
      enfermedad: '',
    },
    droga: {
      id: 0,
      nombre: '',
      precioCompra: 0,
      precioVenta: 0,
      unidadesVendidas: 0,
      unidadesDisponibles: 0,
    },
  };

  onMascotaSeleccionada(event: Event): void {
    const selectedMascotaId = (event.target as HTMLSelectElement).value;
    const mascotaSeleccionada = this.mascotas.find(
      (mascota) => mascota.id === +selectedMascotaId
    );
    if (mascotaSeleccionada) {
      this.formConsulta.mascota = mascotaSeleccionada;
    }
  }

  onDrogaSeleccionada(event: Event): void {
    const selectedDroga = this.formConsulta.droga;

    if (selectedDroga) {
      this.generarOpcionesCantidad();
    }
  }

  generarOpcionesCantidad(): void {
    const maxCantidad = this.formConsulta.droga?.unidadesDisponibles || 0;
    this.unidadesDisponibles = Array.from(
      { length: maxCantidad },
      (_, i) => i + 1
    );
    console.log('Opciones de cantidad generadas:', this.unidadesDisponibles);
  }

  addTratamiento() {
    if (this.formConsulta.droga) {
      // Reducir las unidades disponibles y aumentar las unidades vendidas
      this.formConsulta.droga.unidadesDisponibles -= this.formConsulta.cantidad;
      this.formConsulta.droga.unidadesVendidas += this.formConsulta.cantidad;

      // Llamada al servicio para actualizar la droga en el backend
      this.drogaService.updateDroga(this.formConsulta.droga).subscribe(
        (response) => {
          console.log('Droga actualizada correctamente:', response);
        },
        (error) => {
          console.error('Error al actualizar la droga:', error);
        }
      );
    } else {
      console.log(
        'No hay suficientes unidades disponibles o la cantidad solicitada es incorrecta.'
      );
    }

    this.formConsulta.fechaConsulta = new Date();
    this.tratamientoService.add(this.formConsulta).subscribe({
      complete: () => this.router.navigate(['/tratamientos']),
    });
  }
}