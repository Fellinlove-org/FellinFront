import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from '../../model/veterinario';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/service/cliente.service';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-mostrar-veterinario',
  templateUrl: './mostrar-veterinario.component.html',
  styleUrls: ['./mostrar-veterinario.component.scss']
})
export class MostrarVeterinarioComponent {

  veterinario! : Veterinario;

  adminLogueado !: Admin

  cedula !: string;
  idveterinario !: string;

  userType !: string;

  nombre_usuario !: string;

  constructor( private route: ActivatedRoute, 
    private veterinarioService : VeterinarioService,
    private clienteService: ClienteService, 
    private adminService: AdminService,
    private http: HttpClient, 
    private router: Router  ) {

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
                return this.veterinarioService.findById(this.idveterinario);
              })
            );
          } else {
            return new Observable<Veterinario>();
          }
        })
      ).subscribe(veterinario => {
        this.veterinario = veterinario;
        console.log(this.veterinario);
      });
  });
}

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente(): void {
    let nextID = this.veterinario.id+1
    this.router.navigate(['/Veterinario/find' , nextID])
  }
}
