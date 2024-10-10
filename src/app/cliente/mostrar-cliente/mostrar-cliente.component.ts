import { Component, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.scss']
})
export class MostrarClienteComponent {

  @Input()
    Cliente !: Cliente;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    console.log("ngOnInit de detail")
    this.route.paramMap.subscribe(params =>{const id= Number(params.get('id'));
    this.Cliente = this.clienteService.findById(id)!;
    })
  }

  ngOnChanges(): void {
    console.log("ngOnChanges de detail")
  }

  siguiente():void{
    let nextID = this.Cliente.id+1
    this.router.navigate(['/Cliente/find' , nextID])
  }
}
