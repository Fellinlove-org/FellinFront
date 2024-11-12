import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
import { User } from '../model/user';

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

  login(user : User): Observable<string> {
    return this.http.post(`http://localhost:8090/admin/login`, user,
    {
      responseType: 'text'
    });
  }

  adminHome(): Observable<Admin> {
    return this.http.get<Admin>('http://localhost:8090/admin/details');
  }
  

}
