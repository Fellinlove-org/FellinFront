import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss']
})
export class ModificarMascotaComponent {

  @Output()
  nuevaMascotaEvent = new EventEmitter<Mascota>();

  sendMascota!: Mascota;

  clienteLogueado !: Cliente

 

  id : string | null | undefined

  formMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: ''
  };

  constructor( private route: ActivatedRoute, 
    private mascotaService: MascotaService, 
    private router: Router,
    private http: HttpClient)
  {

  }
  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.mascotaService.findById(this.id!).subscribe(mascota => {
        this.sendMascota = mascota
        this.formMascota = mascota;
        console.log(this.sendMascota);
      })
    });
  }

  modificarMascota() {
    
    
  }
}

