import { Component } from '@angular/core';
import { Veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.scss']
})
export class VeterinarioTableComponent {

  selectedVeterinario!:Veterinario;

  veterinarioList!:Veterinario[];

  constructor(private veterinarioService : VeterinarioService){
   }

  ngOnInit(): void {
    this.veterinarioList=this.veterinarioService.findAll();

  }
}
