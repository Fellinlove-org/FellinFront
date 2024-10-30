import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { Tratamiento } from 'src/app/model/tratamiento';
import { AdminService } from 'src/app/service/admin.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.scss']
})
export class TratamientoTableComponent {


  tratamientoSeleccionado!: Tratamiento;
  cedula!: string;
  userType!: string;
  nombre_usuario !: string;

  tratamientoList: Tratamiento[] = [];
  listaFiltrada: Tratamiento[] = [];
  searchTerm: string = '';


  constructor(
    private route: ActivatedRoute,
    private tratamientoService: TratamientoService,
    private veterinariaService: VeterinarioService,
    private http: HttpClient,
    private router: Router,
    private adminService : AdminService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cedula = params['cedula'];
      console.log(this.cedula);

      this.veterinariaService.findTypeUser(this.cedula)
      .pipe(
        mergeMap((userType) => {
          this.userType = userType.userType;
          console.log(this.userType);
          if (this.userType === 'veterinario') {
       // Si es veterinario, obtenemos la información de los clientes asociados
            return this.veterinariaService.findByCedula(this.cedula).pipe(
              mergeMap((vetInfo) => {
                this.nombre_usuario = vetInfo.nombre;
                return this.tratamientoService.findAll();
              })
            );
          } else{
            return new Observable<Tratamiento[]>();;
          }
        })
      )
      .subscribe(
        (tratamiento: Tratamiento[]) => {
        this.tratamientoList = tratamiento;
        this.listaFiltrada = tratamiento;
        console.log("Lista de tratamientos",this.tratamientoList);
      },
      (error) => {
        console.error('Error al cargar los tratamientos:', error);
      })
    });
  }

  eliminarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }
  modificarTratamiento(tratamiento: Tratamiento) {
    this.tratamientoSeleccionado = tratamiento;
    this.router.navigate(['/tratamiento/'+ this.cedula +'/update/' + this.tratamientoSeleccionado.id]);
  }
  mostrarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }

}
