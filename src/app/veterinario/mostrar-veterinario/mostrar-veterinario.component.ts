import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from '../../model/veterinario';

@Component({
  selector: 'app-mostrar-veterinario',
  templateUrl: './mostrar-veterinario.component.html',
  styleUrls: ['./mostrar-veterinario.component.scss']
})
export class MostrarVeterinarioComponent {

  @Input()
  veterinario! : Veterinario;

  constructor( private route: ActivatedRoute, private veterinarioService : VeterinarioService, private router: Router  ) {

  }

  ngOnInit(): void {

    console.log("ngOnInit de detail")
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
    })
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente(): void {
    let nextID = this.veterinario.id+1
    this.router.navigate(['/Veterinario/find' , nextID])
  }
}
