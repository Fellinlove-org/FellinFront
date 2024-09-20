import { Injectable } from '@angular/core';
import { mascota } from '../mascotas/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor() { }

  mascotaList: mascota[] = [
    {
      id: 1,
      nombre: 'Luna',
      raza: 'Ñero',
      edad: 3,
      enfermedad: 'Mamitis',
      peso: 5,
      foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97',
    },
    {
      id: 2,
      nombre: 'Gaña',
      raza: 'Grillo',
      edad: 5,
      enfermedad: 'Castración',
      peso: 3,
      foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97',
    },
    {
      id: 3,
      nombre: 'Caño',
      raza: 'Fetillo',
      edad: 1,
      enfermedad: 'Gatitis',
      peso: 2,
      foto: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97',
    },
  ];

  findAll(){
    return this.mascotaList;
  }

  findById(id: number): mascota | undefined {
    const mascota = this.mascotaList.find(o => o.id === id);
    return mascota;
  }

  addMascota(mascota: mascota){
    this.mascotaList.push(mascota);
  }

  deleteMascota(mascota: mascota){
    var index = this.mascotaList.indexOf(mascota);
    this.mascotaList.splice(index, 1);
  }

  updateMascota(updatedMascota: mascota): void {
    const index = this.mascotaList.findIndex(mascota => mascota.id === updatedMascota.id);
    if (index !== -1) {
      this.mascotaList[index] = updatedMascota;
    }

  }
}
