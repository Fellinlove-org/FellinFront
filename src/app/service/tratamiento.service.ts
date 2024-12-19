import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';
import { TratamientoDTO } from '../model/tratamiento-dto';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<TratamientoDTO[]> {
    return this.http.get<TratamientoDTO[]>('http://localhost:8090/tratamiento/find/all');
  }
  findByIdMascota(id : string): Observable<TratamientoDTO[]>{
    return this.http.get<TratamientoDTO[]>('http://localhost:8090/tratamiento/find/mascota/'+ id);
  }

  findById(id: string): Observable<TratamientoDTO> {
    return this.http.get<TratamientoDTO>('http://localhost:8090/tratamiento/find/' + id);
  }

  deleteById(id: number) {
    return this.http.delete('http://localhost:8090/tratamiento/delete/' + id);
  }

  add(tratamientoDTO: TratamientoDTO) {
    console.log(tratamientoDTO);
    return this.http.post('http://localhost:8090/tratamiento/add', tratamientoDTO);
  }

  update(tratamientoDTO: TratamientoDTO) {
    return this.http.put<TratamientoDTO>('http://localhost:8090/tratamiento/update', tratamientoDTO);
  }

  getTratamientosPorDroga(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8090/consultas/tratamiento-por-droga');
  }
  
  getTotalTratamientos(): Observable<number> {
    return this.http.get<number>('http://localhost:8090/tratamiento/count');
  }

}