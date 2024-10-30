import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DrogaService } from 'src/app/service/droga.service';
import { Droga } from 'src/app/model/droga';

@Component({
  selector: 'app-modificar-tratamiento',
  templateUrl: './modificar-tratamiento.component.html',
  styleUrls: ['./modificar-tratamiento.component.scss'],
})
export class ModificarTratamientoComponent {

  id : string | null | undefined 

  droga!: Droga;

  cedula!: string;

  formConsulta: Tratamiento= {
    id: 0,
    veterinario: {
      id: 0,
      cedula: '',
      nombre: '',
      correo: '',
      password: '',
      especialidad: '',
      foto: '',
    },
    mascota: {
      id: 0,
      nombre: '',
      raza: '',
      edad: 0,
      peso: 0,
      enfermedad: '',
      foto: '',
      estado: false,
    },
    droga: {
      id: 0,
      nombre: '',
      precioCompra: 0,
      precioVenta: 0,
      unidadesVendidas: 0,
      unidadesDisponibles: 0,
    },
    fechaConsulta: new Date(),
    cantidad: 0,
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
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cedula = params.get('cedula')!;
      console.log(this.id);
      this.tratamientoService.findById(this.id!).subscribe((tratamiento) => {
        this.formConsulta = tratamiento;
        console.log(this.formConsulta);
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

      this.droga = Object.assign({}, this.formConsulta.droga);
      
      const nuevaCantidad = Number(this.formConsulta.cantidad);

      console.log('Cantidad original:', this.cantidadOriginal);
      console.log('Cantidad nueva ingresada:', nuevaCantidad);

      // Sumar la nueva cantidad a la cantidad original
      const cantidadTotal = this.cantidadOriginal + nuevaCantidad;
      console.log('Cantidad total del tratamiento:', cantidadTotal);

      // Actualizar las unidades vendidas
      this.droga.unidadesVendidas += nuevaCantidad;
      console.log('Unidades vendidas actualizadas:', this.droga.unidadesVendidas);

      // Reducir las unidades disponibles
      this.droga.unidadesDisponibles -= nuevaCantidad;

      // Actualizar la droga en el backend
      this.drogaService.updateDroga(this.droga).subscribe(
        (NuevaDroga: Droga) => {
          console.log('Droga actualizada correctamente:', NuevaDroga);
        }
      )
      this.formConsulta.droga = this.droga;
      // Actualizar la consulta
      this.formConsulta.cantidad = cantidadTotal;
      this.formConsulta.fechaConsulta = new Date();
      console.log(this.formConsulta);
      this.tratamientoService.update(this.formConsulta).subscribe(
        (nuevoTratamiento: Tratamiento) => {
        console.log('Tratamiento actualizado correctamente:', nuevoTratamiento);
        }
      )
      this.router.navigate(['/tratamientos/', this.cedula]);
  }
}
