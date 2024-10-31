import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoDTO } from 'src/app/model/tratamiento-dto';
import { AdminService } from 'src/app/service/admin.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.scss']
})
export class TratamientoTableComponent {


  tratamientoDTOSeleccionado!: TratamientoDTO;
  cedula!: string;
  userType!: string;
  nombre_usuario !: string;

  tratamientoDTOList: TratamientoDTO[] = [];
  listaFiltrada: TratamientoDTO[] = [];
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
            return new Observable<TratamientoDTO[]>();;
          }
        })
      )
      .subscribe(
        (tratamientoDTO: TratamientoDTO[]) => {
        this.tratamientoDTOList = tratamientoDTO;
        this.listaFiltrada = tratamientoDTO;
        console.log("Lista de tratamientos",this.tratamientoDTOList);
      },
      (error) => {
        console.error('Error al cargar los tratamientos:', error);
      })
    });
  }

  eliminarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }
  modificarTratamiento(tratamiento: TratamientoDTO) {
    this.tratamientoDTOSeleccionado = tratamiento;
    this.router.navigate(['/tratamiento/'+ this.cedula +'/update/' + this.tratamientoDTOSeleccionado.id]);
  }
  mostrarTratamiento(tratamiento: Tratamiento) {
    throw new Error('Method not implemented.');
  }

}
