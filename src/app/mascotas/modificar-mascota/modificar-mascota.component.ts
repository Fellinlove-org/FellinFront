import { Component, EventEmitter, Output } from '@angular/core';
import { mascota } from '../mascotas';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss']
})
export class ModificarMascotaComponent {

  @Output()
  nuevaMascotaEvent = new EventEmitter<mascota>();

  sendMascota!: mascota;

  formMascota: mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor( private route: ActivatedRoute, private mascotaService: MascotaService, private router: Router)
  {

  }
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    // Cargar los datos de la mascota en el formulario
    const mascota = this.mascotaService.findById(id);
    if (mascota) {
      // Asignamos todos los valores de la mascota seleccionada al formulario
      this.formMascota = { ...mascota };
    }
  }

  modificarMascota() {

    this.mascotaService.updateMascota(this.formMascota);
    this.router.navigate(['/MascotaTabla']);
  }
}

