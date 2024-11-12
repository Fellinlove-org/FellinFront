import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(
    private http: HttpClient
  ) { }


  findAll(){
    return this.http.get<Mascota[]>(`http://localhost:8090/mascota/find/all`);
  }

  findById(id: string) {
    return this.http.get<Mascota>(`http://localhost:8090/mascota/find/${id}`)
  }
  
  findByClienteCedula(cedula: string) {
    return this.http.get<Mascota[]>(`http://localhost:8090/mascota/cedula/${cedula}`);
  }

  findByClienteId(id: string) {
    return this.http.get<Mascota[]>(`http://localhost:8090/mascota/cliente/${id}`);
  }

  addMascota(mascota: Mascota, id: number) {
    return this.http.post<Mascota>(`http://localhost:8090/mascota/add/${id}`, mascota);
  }

  updateMascota(mascota: Mascota, cedula: string) {
    return this.http.put<Mascota>(`http://localhost:8090/mascota/update/${cedula}`, mascota);
  }
  findClienteCedulaById(id: string) {
    return this.http.get<Cliente>(`http://localhost:8090/mascota/find/cliente/${id}`);
  }
  
  deleteMascota(id: string) {
    return this.http.delete<string>(`http://localhost:8090/mascota/delete/${id}`);

  }

  getTotalMascotas(): Observable<number> {
    return this.http.get<number>(`http://localhost:8090/mascota/total`);
  }

  getMascotasEnTratamiento(): Observable<number> {
    return this.http.get<number>(`http://localhost:8090/mascota/count/active`);
  }
  
}
