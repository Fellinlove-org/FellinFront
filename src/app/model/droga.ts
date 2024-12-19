import { Tratamiento } from './tratamiento';

export interface Droga {
  id: number;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  unidadesVendidas: number;
  unidadesDisponibles: number;
  tratamiento?: Tratamiento[]; // Lista opcional de consultas asociadas a la droga
}