export class MascotaCL {
   public id: number;
   public nombre: string;
   public raza: string;
   public edad: number;
   public peso: number;
   public enfermedad: string;
   public foto: string;

    

   constructor(id: number,nombre: string,raza: string,edad: number,peso: number,enfermedad: string,foto: string){
    this.id= id
    this.nombre=nombre
    this.raza=raza
    this.edad=edad
    this.peso=peso
    this.enfermedad=enfermedad
    this.foto=foto
   }
}
