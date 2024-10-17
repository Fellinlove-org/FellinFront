import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(){
    return this.http.get<Veterinario[]>(`http://localhost:8090/veterinario/find/all`);
  }

  login(cedula: string, password: string){
    return this.http.get<string>(`http://localhost:8090/veterinario/login/${cedula}/${password}`);
  }

  findById(id: string) {
    return this.http.get<Veterinario>(`http://localhost:8090/veterinario/find/${id}`);
  }

  findByCedula(cedula: string) {
    return this.http.get<Veterinario>(`http://localhost:8090/veterinario/find/cedula/${cedula}`);
  }
  findTypeUser(cedula: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8090/login/${cedula}`);
  }
  addVeterinario(veterinario: Veterinario){
    return this.http.post<Veterinario>('http://localhost:8090/veterinario/add', veterinario);
  }
  deleteVeterinario(veterinario: Veterinario){
    return this.http.delete<Veterinario>(`http://localhost:8090/veterinario/delete/${veterinario.id}`);
  }
  updateVeterinario(veterinario: Veterinario){
    return this.http.put<Veterinario>(`http://localhost:8090/veterinario/update`, veterinario);
  }

}
