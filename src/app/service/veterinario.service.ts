import { Injectable } from '@angular/core';
import { Veterinario } from '../model/veterinario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor(
    private http: HttpClient
  ) { }

  veterinariosList !: Veterinario[] 

  findAll(){
    return this.http.get<Veterinario[]>(`http://localhost:8090/veterinario/all`);
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

  addVeterinario(veterinario: Veterinario){
    this.veterinariosList.push(veterinario);
  }
  deleteVeterinario(veterinario: Veterinario){
    const index = this.veterinariosList.indexOf(veterinario);
    if (index > -1) {
      this.veterinariosList.splice(index, 1);
    }
  }
  updateVeterinario(veterinario: Veterinario){
    const index = this.veterinariosList.indexOf(veterinario);
    if (index > -1) {
      this.veterinariosList[index] = veterinario;
    }
  }

}
