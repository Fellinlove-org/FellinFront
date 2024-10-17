import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  deleteCliente(cliente: Cliente){
     return this.http.delete<Cliente>(`http://localhost:8090/cliente/delete/${cliente.id}`);
  }

}
