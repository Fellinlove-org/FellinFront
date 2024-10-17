import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.scss']
})
export class VeterinarioComponent {
  id !: string;

  nombre_usuario !: string;

  userType !: string;

  constructor(
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('cedula')!
      console.log(this.id)

      this.veterinarioService.findByCedula(this.id).subscribe(vet => {
        console.log(vet);
        this.userType = 'veterinario';
        this.nombre_usuario = vet.nombre
        this.id = vet.id.toString()
      })
    })
  }

}
