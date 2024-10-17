import { Component, EventEmitter, Output } from '@angular/core';
import { Veterinario} from '../../model/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';


@Component({
  selector: 'app-nuevo-veterinario',
  templateUrl: './nuevo-veterinario.component.html',
  styleUrls: ['./nuevo-veterinario.component.scss']
})
export class NuevoVeterinarioComponent {

  @Output()
  nuevoVeterinarioEvent = new EventEmitter<Veterinario>();

  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  veterinario !: Veterinario
  idveterinario !: string

  sendVeterinario !: Veterinario


  formVeterinario: Veterinario = {
    id: 0,
    cedula: '',
    nombre: '',
    correo: '',
    password: '',
    especialidad: '',
    foto: ''
  };


  constructor(private veterinarioService: VeterinarioService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { 

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      this.idveterinario = params.get('id')!;
      this.adminService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.veterinarioService.findAll();
                })
              );
            } else {
              return new Observable<Veterinario[]>();
            }
          })
        ).subscribe()
    })
    
    
  }


  addVeterinario() {
    this.sendVeterinario = Object.assign({}, this.formVeterinario);
    console.log(this.sendVeterinario);
    this.veterinarioService.addVeterinario(this.veterinario).subscribe(
      (nuevoVeterinario: Veterinario) => {
        console.log('Mascota agregada:', nuevoVeterinario);
      }
    )
    this.router.navigate(['/mascotas', this.cedula]);
  }
}
