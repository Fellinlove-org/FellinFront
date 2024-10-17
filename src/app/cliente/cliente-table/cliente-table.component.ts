import { Component } from '@angular/core';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';
import { ROOT_URL } from 'src/app/app.component';
import { Cliente } from 'src/app/model/cliente';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.scss']
})
export class ClienteTableComponent {

  selectedCliente!: Cliente;
  cedula!: string;
  userType!: string;
  nombre_usuario !: string;

  clienteList: Cliente[] = [];
  listaFiltrada: Cliente[] = [];
  searchTerm: string = '';

  constructor(
    private veterinarioService: VeterinarioService,
    private clienteService: ClienteService,
    private router: Router,
    private adminService : AdminService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!;
      console.log(this.cedula);
      
      this.veterinarioService.findTypeUser(this.cedula)
        .pipe(
          mergeMap((userType) => {
            this.userType = userType.userType;
            console.log(this.userType);
            if (this.userType === 'veterinario') {
              // Si es veterinario, obtenemos la información de los clientes asociados
              return this.veterinarioService.findByCedula(this.cedula).pipe(
                mergeMap((vetInfo) => {
                  this.nombre_usuario = vetInfo.nombre;
                  return this.clienteService.findAll();
                })
              );
            } else if (this.userType === 'administrador') {
              return this.adminService.findByCedula(this.cedula).pipe(
                mergeMap((adminInfo) => {
                  this.nombre_usuario = adminInfo.nombre;
                  return this.clienteService.findAll();
                })
              );
            } else {
              return new Observable<Cliente[]>();
            }
          })
        )
        .subscribe(
          (clientes: Cliente[]) => {
            this.clienteList = clientes;
            this.listaFiltrada = clientes;
            console.log("Lista de clientes: ", this.clienteList);
          },
          (error) => {
            console.error('Error al obtener la lista de clientes', error);
          }
        );
    });
  }

  mostrarCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.router.navigate(['/cliente/'+ this.cedula+'/find/' + this.selectedCliente.id]);
  }

  agregarCliente(cliente: Cliente) {
    this.clienteService.addCliente(cliente).subscribe(
      (nuevoCliente: Cliente) => {
        this.clienteList?.push(nuevoCliente);
        console.log('Cliente agregado:', nuevoCliente);
      },
      (error) => {
        console.error('Error al agregar el cliente:', error);
      }
    );
  }

  eliminarCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
    console.log(this.selectedCliente.nombre);
    this.http.get<Cliente>(ROOT_URL + 'clientes/delete/' + this.selectedCliente.id).subscribe();
    this.clienteList = this.clienteList.filter(c => c !== this.selectedCliente);
  }

  buscarCliente(): void {
    const term = this.searchTerm.toLowerCase();
    this.listaFiltrada = this.clienteList.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(term) ||
      cliente.cedula.toLowerCase().includes(term)
    );
  }
  modificarCliente(cliente: Cliente){
    this.selectedCliente = cliente;
    this.router.navigate(['/clientes/'+ this.cedula +'/update/' + this.selectedCliente.id]);
  }

  
}
