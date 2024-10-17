import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DrogaService } from 'src/app/service/droga.service';

@Component({
  selector: 'app-modificar-tratamiento',
  templateUrl: './modificar-tratamiento.component.html',
  styleUrls: ['./modificar-tratamiento.component.css'],
})
export class ModificarTratamientoComponent implements OnInit {
  formConsulta: Tratamiento= {
    id: 0,
    fechaConsulta: new Date(),
    cantidad: 0,
    veterinario: {
      id: 0,
      nombre: '',
      cedula: '',
      correo: '',
      especialidad: '',
      foto: '',
      password: '',
    },
    mascota: {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      foto: '',
      enfermedad: '',
      peso: 0,
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

  unidadesDisponibles: number[] = [];
  cantidadOriginal: number = 0; // Nueva variable para almacenar la cantidad original

  constructor(
    private router: Router,
    private tratamientoService: TratamientoService,
    private drogaService: DrogaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.tratamientoService.findById(id).subscribe((tratamiento) => {
        this.formConsulta = { ...tratamiento };
        this.cantidadOriginal = this.formConsulta.cantidad; // Guardamos la cantidad original
        this.generarOpcionesCantidad();
      });
    });
  }

  generarOpcionesCantidad(): void {
    const maxCantidad = this.formConsulta.droga?.unidadesDisponibles || 0;
    this.unidadesDisponibles = Array.from(
      { length: maxCantidad },
      (_, i) => i + 1
    );
  }

  modificarTratamiento() {
    if (this.formConsulta.droga) {
      const nuevaCantidad = Number(this.formConsulta.cantidad) || 0;

      console.log('Cantidad original:', this.cantidadOriginal);
      console.log('Cantidad nueva ingresada:', nuevaCantidad);

      // Sumar la nueva cantidad a la cantidad original
      const cantidadTotal = this.cantidadOriginal + nuevaCantidad;
      console.log('Cantidad total del tratamiento:', cantidadTotal);

      // Actualizar las unidades vendidas
      this.formConsulta.droga.unidadesVendidas += nuevaCantidad;
      console.log('Unidades vendidas actualizadas:', this.formConsulta.droga.unidadesVendidas);

      // Reducir las unidades disponibles
      this.formConsulta.droga.unidadesDisponibles -= nuevaCantidad;

      // Actualizar la droga en el backend
      this.drogaService.updateDroga(this.formConsulta.droga).subscribe(
        (response) => console.log('Droga actualizada:', response),
        (error) => console.error('Error al actualizar la droga:', error)
      );

      // Actualizar la consulta
      this.formConsulta.cantidad = cantidadTotal;
      this.formConsulta.fechaConsulta = new Date();
      this.tratamientoService.update(this.formConsulta).subscribe({
        complete: () => this.router.navigate(['/tratamientos']),
      });
    } else {
      console.log('No hay suficientes unidades disponibles o la cantidad es incorrecta.');
    }
  }
}