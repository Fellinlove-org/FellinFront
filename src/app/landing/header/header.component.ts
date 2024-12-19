import { Component, Input, SimpleChanges } from '@angular/core';

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
