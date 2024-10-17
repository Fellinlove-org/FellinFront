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
    return this.http.get<Droga[]>('http://localhost:8080/drogas/ver');
  }

  findById(id: number): Observable<Droga> {
    return this.http.get<Droga>('http://localhost:8080/drogas/ver/' + id);
  }

  deleteById(id: number) {
    return this.http.delete('http://localhost:8080/drogas/ver/' + id);
  }

  updateDroga(droga: Droga) {
    return this.http.put('http://localhost:8080/drogas/modificar', droga);
  }

  getVentasTotales(): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/drogas/ventas-totales`);
  }

  getGananciasTotales(): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/drogas/ganancias-totales`);
  }

  getTopTratamientos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/drogas/top3');
  }

}