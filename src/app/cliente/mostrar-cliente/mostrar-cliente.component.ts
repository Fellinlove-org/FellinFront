import { Component, Input } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { AdminService } from 'src/app/service/admin.service';
import { Veterinario } from 'src/app/model/veterinario';


@Component({
  selector: 'app-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.scss']
})
export class MostrarClienteComponent {

  @Input()
  cliente!: Cliente;

  idcliente !: string;

  cedula!: string;
  nombre_usuario!: string;
  userType!: string;

  veterinarioLogueado !: Veterinario

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      this.idcliente = params.get('id')!;
      this.veterinarioService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            if (this.userType === 'cliente') {
              // Si es cliente, obtenemos la información del cliente
              return this.clienteService.findById(this.idcliente);
            } else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.clienteService.findById(this.idcliente);
                })
              );
            } else if (this.userType === 'veterinario') {
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.clienteService.findById(this.idcliente);
                })
              );
            } else {
              return new Observable<Cliente>();
            }
          })
        ).subscribe(cliente => {
          this.cliente = cliente;
          console.log(this.cliente);
        });
    });
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente():void{
    let nextID = this.cliente.id+1
    this.router.navigate(['/Cliente/find' , nextID])
  }
}
