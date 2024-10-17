import { Component, Input } from '@angular/core';
import { Mascota } from '../../model/mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable, pipe } from 'rxjs';
import { ROOT_URL } from 'src/app/app.component';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.component.html',
  styleUrls: ['./mostrar-mascota.component.scss']
})
export class MostrarMascotaComponent {

  
  id !: string;
  idmascota !: string;

  nombre_usuario !: string;

  userType !: string;


  mascota!: Mascota;

  clienteLogueado !: Cliente


  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService, 
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) {
    
  } 


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('idcliente')!;
      this.clienteService.findById(this.id)
        .pipe(
          mergeMap((clienteInfo) => {
            this.userType = 'cliente'
            this.nombre_usuario = clienteInfo.nombre
            return this.mascotaService.findById(params.get('id')!)
          })
        ).subscribe(mascota => {
          this.mascota = mascota
          console.log(this.mascota);
        })
    })
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente():void{
    //let nextID = this.Mascota.id+1
    //this.router.navigate(['/mascota/find' , nextID])
  }
}
