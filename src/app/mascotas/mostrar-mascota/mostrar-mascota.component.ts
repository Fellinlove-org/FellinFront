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

  id : string | null | undefined

  constructor(private mascotaService: MascotaService, 
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) {
    
  } 


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.mascotaService.findById(this.id!).subscribe(mascota => {
      this.mascota = mascota
      console.log(this.mascota);
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
