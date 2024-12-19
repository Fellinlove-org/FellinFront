import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.scss']
})
export class VeterinarioComponent {
  
  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  constructor(
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!
      console.log(this.cedula)

      this.veterinarioService.findByCedula(this.cedula).subscribe(vet => {
        console.log(vet);
        this.userType = 'veterinario';
        this.nombre_usuario = vet.nombre
        this.cedula = vet.cedula.toString()
        
      })
    })
  }

}
