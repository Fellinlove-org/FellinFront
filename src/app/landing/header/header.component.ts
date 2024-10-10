import { Component, Input, SimpleChanges } from '@angular/core';
import { Cliente } from 'src/app/cliente/cliente';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  nombre_usuario : string | undefined;

  @Input()
  cedula : string | undefined;

  @Input()
  userType : string | undefined;
}
