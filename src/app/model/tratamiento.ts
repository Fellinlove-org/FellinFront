import { Veterinario } from './veterinario';
import { Mascota } from './mascota';
import { Droga } from './droga';

export interface Tratamiento {
  id: number;
  veterinario?: Veterinario; // Relación opcional con Veterinario
  mascota?: Mascota; // Relación opcional con Mascota
  droga?: Droga; // Relación opcional con Droga
  fechaConsulta: Date; // Fecha de la consulta
  cantidad: number; // Cantidad de droga
}