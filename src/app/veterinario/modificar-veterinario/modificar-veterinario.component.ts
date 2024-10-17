import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from '../../model/veterinario';


@Component({
  selector: 'app-modificar-veterinario',
  templateUrl: './modificar-veterinario.component.html',
  styleUrls: ['./modificar-veterinario.component.scss']
})
export class ModificarVeterinarioComponent {

  @Output()
  nuevaVeterinarioEvent = new EventEmitter<Veterinario>();

  sendVeterinario!: Veterinario

    formVeterinario:Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    especialidad: '',
    foto: ''
  }

  constructor( private route: ActivatedRoute, private veterinarioService : VeterinarioService, private router: Router  ) {

   }

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Cargar los datos del cliente en el formulario

    
  }

  modificarVeterinario() {
    this.veterinarioService.updateVeterinario(this.formVeterinario);
    this.router.navigate(['/VeterinarioTabla']);
  }

}
