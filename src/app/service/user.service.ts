import { Injectable } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { Admin } from '../admin/admin';
import { Veterinario } from '../veterinario/veterinario';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteCL } from '../model/cliente-cl';
import { AdministradorCL } from '../model/administrador-cl';
import { VeterinarioCL } from '../model/veterinario-cl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //obtener tipo de usuario
  userType$ : Observable<any> = new Observable();
  private userType = new BehaviorSubject<string>('');
  currentUserType = this.userType.asObservable();

  //login cliente
  cliente$ : Observable<any> = new Observable();
  private clienteSource = new BehaviorSubject<Cliente>(new ClienteCL(0,'','','','', ''));
  currentCliente = this.clienteSource.asObservable();

  //login admin
  admin$ : Observable<any> = new Observable();
  private adminSource = new BehaviorSubject<Admin>(new AdministradorCL(0,'','','',''));
  currentAdmin = this.adminSource.asObservable();


  //login veterinario
  veterinario$ : Observable<any> = new Observable();
  private veterinarioSource = new BehaviorSubject<Veterinario>(new VeterinarioCL(0,'','','', '','', ''));
  currentVeterinario = this.veterinarioSource.asObservable();

  constructor(private http: HttpClient) { }

  changeCliente(cliente: Cliente) {
    this.clienteSource.next(cliente);
  }

  changeUserType(userType: string) {
    this.userType.next(userType);
  }

  changeAdmin(admin: Admin) {
    this.adminSource.next(admin);
  }

  changeVeterinario(veterinario: Veterinario) {
    this.veterinarioSource.next(veterinario);
  }


  login(cedula: string) {
    this.userType$ = this.http.get<string>(`http://localhost:8090/login/${cedula}`);
    this.userType$.subscribe(userType => {
      this.changeUserType(userType.userType);
      this.logUser(userType.userType, cedula);
    })
  }

  logUser(userType: string, cedula: string) {
    switch (userType) {
      case 'veterinario':
        console.log('veterinario logueado');
        this.veterinario$ = this.http.get<Veterinario>(`http://localhost:8090/veterinario/search/${cedula}`);
        this.veterinario$.subscribe(veterinario => {
          this.changeVeterinario(veterinario);
        })
        break;
      case 'administrador':
        console.log('admin logueado');
        this.admin$ = this.http.get<Admin>(`http://localhost:8090/admin/search/${cedula}`);
        this.admin$.subscribe(admin => {
          this.changeAdmin(admin);
        })
        break;
      case 'cliente':
        console.log('cliente logueado');
        this.cliente$ = this.http.get<Cliente>(`http://localhost:8090/cliente/search/${cedula}`);
        this.cliente$.subscribe(cliente => {
          this.changeCliente(cliente);
        })
        break;
      default:
        break;
    }
  }
}
