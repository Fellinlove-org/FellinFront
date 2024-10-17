import { Component } from '@angular/core';
import { Veterinario } from '../../model/veterinario';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.scss']
})
export class VeterinarioTableComponent {

  selectedVeterinario!: Veterinario;

  cedula !: string

  userType !: string

  nombre_usuario !: string

  veterinarioList : Veterinario[] = []
  listaFiltrada: Veterinario[] = [];
  searchTerm: string = '';


  constructor(
    private route: ActivatedRoute,
    private adminService : AdminService,
    private veterinarioService : VeterinarioService,
    private router: Router,
    private http: HttpClient
    
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      console.log(this.cedula);
      this.veterinarioService.findTypeUser(this.cedula)
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
        )
        .subscribe(
          (veterinarios: Veterinario[]) => {
            this.veterinarioList = veterinarios;
            this.listaFiltrada = veterinarios;
            console.log("Lista de clientes: ", this.veterinarioList);
          },
          (error) => {
            console.error('Error al obtener la lista de clientes', error);
          }
        );
    });
  }


  
  modificarVeterinario(veterinario: Veterinario) {
    this.selectedVeterinario = veterinario;
    this.router.navigate(['/veterinario/'+ this.cedula +'/update/' + this.selectedVeterinario.id]);
  }

  eliminarVeterinario(veterinario: Veterinario) {
    this.selectedVeterinario = veterinario;
    console.log(this.selectedVeterinario.nombre);
    this.veterinarioService.deleteVeterinario(this.selectedVeterinario).subscribe()
    this.listaFiltrada = this.listaFiltrada.filter(v => v.id !== this.selectedVeterinario.id)
    this.veterinarioList = this.veterinarioList.filter(v => v.id !== this.selectedVeterinario.id)
  }

  buscarVeterinario(): void {
    const term = this.searchTerm.toLowerCase();
  
    this.listaFiltrada = this.veterinarioList.filter((veterinario) =>
      veterinario.nombre.toLowerCase().includes(term) ||
      veterinario.especialidad.toLowerCase().includes(term)
    );
  }
}
