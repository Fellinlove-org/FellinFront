import { Component, Input } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROOT_URL } from 'src/app/app.component';

@Component({
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.component.html',
  styleUrls: ['./mostrar-mascota.component.scss']
})
export class MostrarMascotaComponent {

  mascota$ : Observable<any> = new Observable();
  mascota!: Mascota;

  clienteLogueado !: Cliente

  constructor(private mascotaService: MascotaService, 
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) {
    
  } 


  ngOnInit(): void {
    /*
    console.log("ngOnInit de detail")
    this.dataService.currentCliente.subscribe(cliente => {
      this.clienteLogueado = cliente;
    });
    this.dataService.currentMascota.subscribe(mascota => {
      this.mascota = mascota
      console.log(mascota);
      
    })
    this.mascota$ = this.http.get<mascota>(ROOT_URL + 'mascotas/find/' + this.mascota.id)
    this.mascota$.subscribe(mascotaInfo => {
        console.log(mascotaInfo)
        this.mascota = mascotaInfo
    })
    */
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente():void{
    //let nextID = this.Mascota.id+1
    //this.router.navigate(['/mascota/find' , nextID])
  }
}
