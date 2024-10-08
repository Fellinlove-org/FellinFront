import { Component, Input } from '@angular/core';
import { mascota } from '../mascotas';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.component.html',
  styleUrls: ['./mostrar-mascota.component.scss']
})
export class MostrarMascotaComponent {

  @Input()
    Mascota!:mascota;

  constructor(private mascotaService: MascotaService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    console.log("ngOnInit de detail")
    this.route.paramMap.subscribe(params =>{const id= Number(params.get('id'));
    //this.Mascota = this.mascotaService.findById(id)!;
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
