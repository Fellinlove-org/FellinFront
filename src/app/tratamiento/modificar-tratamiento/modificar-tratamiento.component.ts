import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { DrogaService } from 'src/app/service/droga.service';
import { Droga } from 'src/app/model/droga';
import { TratamientoDTO } from 'src/app/model/tratamiento-dto';

@Component({
  selector: 'app-modificar-tratamiento',
  templateUrl: './modificar-tratamiento.component.html',
  styleUrls: ['./modificar-tratamiento.component.scss'],
})
export class ModificarTratamientoComponent {

  id : string | null | undefined 

  cedula!: string;

  cantidadSelected !: number

  formConsulta: TratamientoDTO= {
    id: 0,
    nombreVeterinario: '',
    nombreMascota:'',
    nombreDroga:'',
    cantidad: 0,
    fechaConsulta: new Date(),
    unidadesDisponibles: 0,
    idVeterinario: 0,
    idMascota: 0,
    idDroga: 0
    
  };

  unidadesDisponibles: number[] = [];
  cantidadOriginal: number = 0; // Nueva variable para almacenar la cantidad original
  unidadesDisponiblesOriginal: number = 0;

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
      this.tratamientoService.findById(this.id!).subscribe((tratamientoDTO) => {
        console.log("tratamientoDTO", tratamientoDTO);
        
        this.formConsulta = tratamientoDTO;
        this.cantidadOriginal = this.formConsulta.cantidad; // Guardamos la cantidad original
        this.unidadesDisponiblesOriginal = this.formConsulta.unidadesDisponibles;
        
        this.generarOpcionesCantidad();
      });
    });
  }

  generarOpcionesCantidad(): void {
    const maxCantidad = this.formConsulta.unidadesDisponibles || 0;
    this.unidadesDisponibles = Array.from(
      { length: maxCantidad },
      (_, i) => i + 1
    );
  }

  modificarTratamiento() {
      const nuevaCantidad = Number(this.formConsulta.cantidad);
      this.formConsulta.cantidad = nuevaCantidad + this.cantidadOriginal;
      this.formConsulta.unidadesDisponibles = this.unidadesDisponiblesOriginal - nuevaCantidad;
      console.log("Modificando el tratamiento:", this.formConsulta);
      
      this.tratamientoService.update(this.formConsulta).subscribe((tratamiento) => {
        console.log('Tratamiento modificado:', tratamiento);
        this.router.navigate(['/tratamientos/' + this.cedula]);
      });
  }
}
