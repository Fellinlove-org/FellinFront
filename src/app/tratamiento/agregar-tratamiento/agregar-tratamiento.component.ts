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
import { TratamientoDTO } from 'src/app/model/tratamiento-dto';

@Component({
  selector: 'app-add-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.scss'],
})
export class AddTratamientoComponent {
  id: string | null | undefined;
  cedula!: string;

  mascotas!: Mascota[];
  drogas!: Droga[];
  veterinarios!: Veterinario[];
  unidadesDisponibles: number[] = [];
  mascotaSeleccionada!: Mascota;
  DrogaSeleccionada!: Droga;
  VeterinarioSeleccionado!: Veterinario;

  formConsulta: TratamientoDTO = {
    id: 0,
    nombreVeterinario: '',
    nombreMascota: '',
    nombreDroga: '',
    cantidad: 0,
    fechaConsulta: new Date(),
    unidadesDisponibles: 0,
    idVeterinario: 0,
    idMascota: 0,
    idDroga: 0,
  };

  constructor(
    private mascotaService: MascotaService,
    private drogaService: DrogaService,
    private veterinarioService: VeterinarioService,
    private tratamientoService: TratamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.cedula = params.get('cedula')!;
      console.log(this.id);
      this.mascotaService.findById(this.id!).subscribe((mascota) => {
        console.log('tratamientoDTO', mascota);
        this.mascotaSeleccionada = mascota;
        this.formConsulta.nombreMascota = mascota.nombre;
        this.formConsulta.idMascota = mascota.id; // Asigna el nombre de la mascota
      });
    });

    this.drogaService.findAll().subscribe((drogas) => {
      this.drogas = drogas;
    });

    this.veterinarioService.findByCedula(this.cedula!).subscribe((veterinario) => {
      this.VeterinarioSeleccionado = veterinario;
      this.formConsulta.nombreVeterinario = veterinario.nombre;
      this.formConsulta.idVeterinario = veterinario.id; // Asigna el nombre del veterinario
    });
  }

  onDrogaSeleccionada(event: Event): void {
    const selectedDrogaId = Number((event.target as HTMLSelectElement).value);
    const selectedDroga = this.drogas.find((droga) => droga.id === selectedDrogaId);
    if (selectedDroga) {
      this.DrogaSeleccionada = selectedDroga;
      this.formConsulta.nombreDroga = selectedDroga.nombre;
      this.formConsulta.idDroga = selectedDroga .id; // Asigna el nombre de la droga seleccionada
      this.generarOpcionesCantidad();
    }
  }

  generarOpcionesCantidad(): void {
    const maxCantidad = this.DrogaSeleccionada?.unidadesDisponibles || 0;
    this.unidadesDisponibles = Array.from({ length: maxCantidad }, (_, i) => i + 1);
    console.log('Opciones de cantidad generadas:', this.unidadesDisponibles);
  }

  addTratamiento() {
    // Aquí se procesará el objeto formConsulta para agregar el tratamiento
    console.log('Tratamiento a agregar:', this.formConsulta);
    // Llama al servicio para agregar el tratamiento
    this.formConsulta.unidadesDisponibles = this.DrogaSeleccionada?.unidadesDisponibles - this.formConsulta.cantidad;
    this.tratamientoService.add(this.formConsulta).subscribe((nuevoTratamiento) => {
      console.log('Tratamiento agregado correctamente:', nuevoTratamiento);
      this.router.navigate(['/tratamientos', this.cedula]);
    });
    
  }
}
