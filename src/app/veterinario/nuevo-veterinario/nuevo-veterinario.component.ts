import { Component } from '@angular/core';
import { Veterinario } from '../veterinario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-veterinario',
  templateUrl: './nuevo-veterinario.component.html',
  styleUrls: ['./nuevo-veterinario.component.scss']
})
export class NuevoVeterinarioComponent {

  constructor(
    private router: Router
  ){}

  formVeterinario: Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    especialidad: '',
    foto: ''
  };

  addVeterinario() {
    this.router.navigate(['/veterinario/all']);
  }
}
