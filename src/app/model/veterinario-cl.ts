export class VeterinarioCL {
    public id: number;
    public cedula: string;
    public nombre: string;
    public correo: string;
    public password: string;
    public especialidad: string;
    public foto: string;

    constructor(id: number,cedula: string,nombre: string,correo: string,password: string,especialidad: string,foto: string){
        this.id= id
        this.cedula=cedula
        this.nombre=nombre
        this.correo=correo
        this.password=password
        this.especialidad=especialidad
        this.foto=foto
    }
}
