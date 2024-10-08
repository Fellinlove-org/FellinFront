import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cliente } from '../cliente/cliente';
import { ClienteCL } from '../model/cliente-cl';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cedulaSource = new BehaviorSubject<string>('');
  currentCedula = this.cedulaSource.asObservable();

  private clienteSource = new BehaviorSubject<cliente>(new ClienteCL(0,'','','','', ''));
  currentCliente = this.clienteSource.asObservable();

  constructor() { }

  changeCedula(cedula: string) {
    this.cedulaSource.next(cedula);
  }

  changeCliente(cliente: cliente) {
    this.clienteSource.next(cliente);
  }
}
