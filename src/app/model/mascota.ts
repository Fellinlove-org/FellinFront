import { Cliente } from "./cliente";

export interface Mascota{
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    peso: number;
    enfermedad: string;
    foto: string;
    cliente?: Cliente;
}