import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findTypeUser(cedula : string){
    return this.http.get<any>(`http://localhost:8090/login/${cedula}`);
  }

  findAll(){
    return this.http.get<Cliente[]>(`http://localhost:8090/cliente/find/all`);
  }

  findById(id: string) {
    return this.http.get<Cliente>(`http://localhost:8090/cliente/find/${id}`);
  }

  findByCedula(cedula : string) {
    return this.http.get<Cliente>(`http://localhost:8090/cliente/find/cedula/${cedula}`);
  }
  findByVeterinarioId(veterinarioId: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`http://localhost:8090/cliente/findByVeterinario/${veterinarioId}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8090/cliente/add', cliente);
  }

  updateCliente(cliente: Cliente) {
    return this.http.put<Cliente>(`http://localhost:8090/cliente/update`, cliente);
  }

  deleteCliente(id: string){
     return this.http.delete<String>(`http://localhost:8090/cliente/delete/${id}`);
  }

  login(user : User): Observable<string> {
    return this.http.post(`http://localhost:8090/cliente/login`, user,
    {
      responseType: 'text'
    });
  }

  clienteHome(): Observable<Cliente> {
    return this.http.get<Cliente>('http://localhost:8090/cliente/details');
  }

}
