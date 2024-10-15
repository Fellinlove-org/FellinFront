import { Injectable } from '@angular/core';
import { Mascota } from '../mascotas/mascota';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mascotaDTO } from '../model/mascotaDTO';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(
    private http: HttpClient
  ) { }

  mascotaList !: Mascota[];

  mascotas$ : Observable<any> = new Observable();

  findAll(){
    return this.http.get<Mascota[]>(`http://localhost:8090/mascotas/all`);
  }

  findById(id: string){
    return this.http.get<Mascota>(`http://localhost:8090/mascotas/find/${id}`)
  }
  
  findByClienteCedula(cedula: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`http://localhost:8090/mascotas/cedula/${cedula}`);
  }

  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>('http://localhost:8090/mascotas/add', mascota);
  }

  deleteMascota(mascota: Mascota): Observable<String> {
    return this.http.get<string>(`http://localhost:8090/mascotas/delete/${mascota.id}`);

  }

  updateMascota(updatedMascota: mascotaDTO): Observable<mascotaDTO> {
    return this.http.post<mascotaDTO>('http://localhost:8090/mascotas/update', updatedMascota);
  }
}
