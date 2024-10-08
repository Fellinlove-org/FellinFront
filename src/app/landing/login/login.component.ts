import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/service/dataService.cl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private dataService: DataService) {}

  cedula: string = '';


  login() {
    console.log(`cedula en el form ${this.cedula}`);
    this.dataService.changeCedula(this.cedula);
  }
}
