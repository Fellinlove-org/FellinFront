import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Droga } from '../model/droga';

@Injectable({
  providedIn: 'root',
})
export class DrogaService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Droga[]> {
    return this.http.get<Droga[]>('http://localhost:8090/drogas/all');
  }

  findById(id: number): Observable<Droga> {
    return this.http.get<Droga>('http://localhost:8090/drogas/find/' + id);
  }

  deleteById(id: number) {
    return this.http.delete('http://localhost:8090/drogas/find/' + id);
  }

  updateDroga(droga: Droga) {
    return this.http.put<Droga>('http://localhost:8090/drogas/update', droga);
  }

  getVentasTotales(): Observable<number> {
    return this.http.get<number>(`http://localhost:8090/drogas/ventas-totales`);
  }

  getGananciasTotales(): Observable<number> {
    return this.http.get<number>(`http://localhost:8090/drogas/ganancias-totales`);
  }

  getTopTratamientos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8090/drogas/top3');
  }

}