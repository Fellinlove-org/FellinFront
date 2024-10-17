import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>('http://localhost:8090/tratamiento/find/all');
  }

  findById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>('http://localhost:8090/tratamiento/find/' + id);
  }

  deleteById(id: number) {
    return this.http.delete('http://localhost:8090/tratamiento/delete/' + id);
  }

  add(tratamiento: Tratamiento) {
    console.log(tratamiento);
    return this.http.post('http://localhost:8090/tratamiento/add/', tratamiento);
  }

  update(tratamiento: Tratamiento) {
    return this.http.put('http://localhost:8090/tratamiento/update/', tratamiento);
  }

  getTratamientosUltimoMes(): Observable<number> {
    return this.http.get<number>('http://localhost:8090/tratamiento/ultimoMes');
  }

  getTratamientosPorDroga(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8090/consultas/tratamiento-por-droga');
  }  
}