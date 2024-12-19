import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './model/cliente';
import { Observable } from 'rxjs';
import { Veterinario } from './model/veterinario';
import { Admin } from './model/admin';


export const ROOT_URL = 'http://localhost:8090/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  


}
