import { Injectable } from '@angular/core';
import { cliente } from '../cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  clienteList: cliente[] = [
    {
      id: 1,
      cedula: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      celular: '3123456789',
      foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      cedula: '987654321',
      nombre: 'María López',
      correo: 'maria.lopez@example.com',
      celular: '3198765432',
      foto: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      cedula: '456789123',
      nombre: 'Carlos Martínez',
      correo: 'carlos.martinez@example.com',
      celular: '3145678912',
      foto: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: 4,
      cedula: '789123456',
      nombre: 'Laura Gómez',
      correo: 'laura.gomez@example.com',
      celular: '3112345678',
      foto: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      cedula: '321654987',
      nombre: 'Ana Torres',
      correo: 'ana.torres@example.com',
      celular: '3165432198',
      foto: 'https://randomuser.me/api/portraits/women/6.jpg',
    }
  ];

  findAll(){
    return this.clienteList;
  }

  findById(id: number): cliente | undefined {
    const cliente = this.clienteList.find(o => o.id === id);
    return cliente;
  }

  addCliente(cliente: cliente){
    this.clienteList.push(cliente);
  }

  deleteCliente(cliente: cliente){
    var index = this.clienteList.indexOf(cliente);
    this.clienteList.splice(index, 1);
  }

  updateCliente(updatedCliente: cliente): void {
    const index = this.clienteList.findIndex(cliente => cliente.id === updatedCliente.id);
    if (index !== -1) {
      this.clienteList[index] = updatedCliente;
    }

  }
}
