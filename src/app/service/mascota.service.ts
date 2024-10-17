import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  addMascota(mascota: Mascota) {
    return this.http.post<Mascota>('http://localhost:8090/mascota/add', mascota);
  }

  updateMascota(mascota: Mascota) {
    return this.http.post<Mascota>('http://localhost:8090/mascota/update', mascota);
  }

  deleteMascota(mascota: Mascota) {
    return this.http.get<string>(`http://localhost:8090/mascota/delete/${mascota.id}`);

  }

  
}
