import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-mostrar-tratamiento',
  templateUrl: './mostrar-tratamiento.component.html',
  styleUrls: ['./mostrar-tratamiento.component.scss'],
})
export class MostrarTratamientoComponent {
  listaTratamiento!: Tratamiento[];
  consulta!: Tratamiento;

  cedula !: string

  constructor(
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  

    this.tratamientoService.findAll().subscribe((tratamiento) => {
      this.listaTratamiento = tratamiento;
    });
  }

  mostrarTratamiento(tratamiento: Tratamiento) {}

  eliminarTratamiento(tratamiento: Tratamiento) {}

  modificarTratamiento(tratamiento: Tratamiento) {}
}