import { Component } from '@angular/core';
import { Tratamiento } from 'src/app/model/tratamiento';

@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.scss']
})
export class TratamientoTableComponent {

  cedula!: string;
  userType!: string;
  nombre_usuario !: string;

  tratamientoList: Tratamiento[] = [];


  eliminarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }
  modificarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }
  mostrarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }

}
