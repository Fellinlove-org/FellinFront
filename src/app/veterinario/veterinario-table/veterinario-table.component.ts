import { Component } from '@angular/core';
import { Veterinario } from '../veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.scss']
})
export class VeterinarioTableComponent {

  selectedVeterinario!:Veterinario;

  rol : string | null | undefined

  veterinarioList!:Veterinario[];

  constructor(
    private route: ActivatedRoute,
    private veterinarioService : VeterinarioService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rol = params.get('rol');
      const cedula = params.get('cedula');
      if(this.rol== 'veterinario')
      {
        this.veterinarioService.findAll().subscribe(
          (veterinario: Veterinario[]) => {
            this.veterinarioList = veterinario;
            console.log("Lista de clientes: ", this.veterinarioList);
          },
          (error) => {
            console.error('Error al obtener la lista de clientes', error);
          }
        );
      }else if(this.rol== 'administrador')
      {
        this.veterinarioService.findAll().subscribe(
          (veterinario: Veterinario[]) => {
            this.veterinarioList = veterinario;
            console.log("Lista de clientes: ", this.veterinarioList);
          },
          (error) => {
            console.error('Error al obtener la lista de clientes', error);
          }
        );
      }

    })

  }
}
