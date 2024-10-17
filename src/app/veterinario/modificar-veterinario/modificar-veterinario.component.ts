import { Component, EventEmitter, Output } from '@angular/core';
import { Veterinario } from '../../model/veterinario';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { Admin } from 'src/app/model/admin';
import { HttpClient } from '@angular/common/http';
import { VeterinarioService } from 'src/app/service/veterinario.service';


@Component({
  selector: 'app-modificar-veterinario',
  templateUrl: './modificar-veterinario.component.html',
  styleUrls: ['./modificar-veterinario.component.scss']
})
export class ModificarVeterinarioComponent {

  @Output()
  nuevoVeterinarioEvent = new EventEmitter<Veterinario>();

  sendVeterinario!: Veterinario;

  adminLogueado !: Admin

  id : string | null | undefined 

  cedula!: string;
  nombre_usuario!: string;
  userType!: string;


  formVeterinario: Veterinario = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    password: '',
    especialidad: '',
    foto: ''
  };


  constructor( private route: ActivatedRoute,
     private veterinarioService: VeterinarioService,
      private router: Router,
      private http: HttpClient)
  {}
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cedula = params.get('cedula')!
      this.veterinarioService.findById(this.id!).subscribe(cliente => {
        this.sendVeterinario = cliente
        this.formVeterinario = cliente;
        console.log(this.sendVeterinario);
      })
    });
  }
  modificarVeterinario() {
    
    this.sendVeterinario = Object.assign({}, this.formVeterinario);
    console.log(this.sendVeterinario);
    this.veterinarioService.updateVeterinario(this.sendVeterinario).subscribe(
      (nuevoVeterinario: Veterinario) => {
        console.log('Veterinario agregado', nuevoVeterinario);
      }
    )
    this.router.navigate(['/veterinarios/', this.cedula]);
    
  }
}
