import { Injectable } from '@angular/core';
import { Veterinario } from '../veterinario/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor() { }

  veterinariosList: Veterinario[] = [
    {
      id: 1,
      cedula: '1234567890',
      nombre: 'Juan',
      correo: 'qCqFP@example.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/men/1.jpg',
},
    {
      id: 2,
      cedula: '2345678901',
      nombre: 'Mariá',
      correo: 'mariá@gmail.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/women/1.jpg',
},
    {
      id: 3,
      cedula: '3456789012',
      nombre: 'Carlos',
      correo: 'carlos@gmail.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/men/4.jpg',
},
    {
      id: 4,
      cedula: '4567890123',
      nombre: 'Laura',
      correo: 'laura@gmail.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/women/4.jpg',
},
    {
      id: 5,
      cedula: '5678901234',
      nombre: 'Pedro',
      correo: 'pedro@gmail.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/men/2.jpg',
},
    {
      id: 6,
      cedula: '6789012345',
      nombre: 'Marta',
      correo: 'marta@gmail.com',
      password: '123456',
      especialidad: 'especialidad',
      foto: 'https://randomuser.me/api/portraits/women/2.jpg',
    }
  ];

  findAll(){
    return this.veterinariosList;
  }
  findById(id: number): Veterinario | undefined {
    const veterinario = this.veterinariosList.find(o => o.id === id);
    return veterinario;
  }
  addVeterinario(veterinario: Veterinario){
    this.veterinariosList.push(veterinario);
  }
  deleteVeterinario(veterinario: Veterinario){
    const index = this.veterinariosList.indexOf(veterinario);
    if (index > -1) {
      this.veterinariosList.splice(index, 1);
    }
  }
  updateVeterinario(veterinario: Veterinario){
    const index = this.veterinariosList.indexOf(veterinario);
    if (index > -1) {
      this.veterinariosList[index] = veterinario;
    }
  }

}
