import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  findTypeUser(cedula : string): Observable<any> {
    return this.http.get<any>(`http://localhost:8090/login/${cedula}`);
  }

  findById(id: string) {
    return this.http.get<Admin>(`http://localhost:8090/admin/${id}`);
  }

  findByCedula(cedula: string) {
    return this.http.get<Admin>(`http://localhost:8090/admin/find/cedula/${cedula}`);
  }

  login(cedula: string, password: string){
    return this.http.get<string>(`http://localhost:8090/admin/login/${cedula}/${password}`);
  }
  
}
