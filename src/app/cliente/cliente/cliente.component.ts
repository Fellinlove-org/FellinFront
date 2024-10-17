import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('id')!
      console.log(this.cedula)

      this.clienteService.findByCedula(this.cedula).subscribe(cliente => {
        console.log(cliente);
        this.userType = 'cliente';
        this.nombre_usuario = cliente.nombre
        this.cedula = cliente.cedula.toString()
      })
    })
  }
}
