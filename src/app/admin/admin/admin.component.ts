import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula')!
      console.log(this.cedula)

      this.adminService.findByCedula(this.cedula).subscribe(vet => {
        console.log(vet);
        this.userType = 'administrador';
        this.nombre_usuario = vet.nombre
        this.cedula = vet.cedula.toString()
        
      })
    })
  }
}
