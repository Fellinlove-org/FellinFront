import { Injectable } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  clienteList !: Cliente[];

  cliente$ : Observable<any> = new Observable();


  findAll(){
    return this.http.get<Cliente[]>(`http://localhost:8090/clientes/all`);
  }

  findById(id: number): Cliente | undefined {
    const cliente = this.clienteList.find(o => o.id === id);
    return cliente;
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8090/clientes/add', cliente);
  }

  deleteCliente(cliente: Cliente){
     
  }

  updateCliente(updatedCliente: Cliente): void {
    const index = this.clienteList.findIndex(cliente => cliente.id === updatedCliente.id);
    if (index !== -1) {
      this.clienteList[index] = updatedCliente;
    }

  }
}
