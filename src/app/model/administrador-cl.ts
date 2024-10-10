export class AdministradorCL {
    public id: number;
    public cedula: string;
    public nombre: string;
    public correo: string;
    public password: string;

    constructor(id: number,cedula: string,nombre: string,correo: string,password: string){
        this.id= id
        this.cedula=cedula
        this.nombre=nombre
        this.correo=correo
        this.password=password
    }
}
