import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasTableComponent } from './mascotas/mascotas-table/mascotas-table.component';
import { HomeComponent } from './landing/home/home.component';
import { MostrarMascotaComponent } from './mascotas/mostrar-mascota/mostrar-mascota.component';
import { NuevaMascotaComponent } from './mascotas/nueva-mascota/nueva-mascota.component';
import { ModificarMascotaComponent } from './mascotas/modificar-mascota/modificar-mascota.component';
import { MostrarClienteComponent } from './cliente/mostrar-cliente/mostrar-cliente.component';
import { ClienteTableComponent } from './cliente/cliente-table/cliente-table.component';
import { ModificarClienteComponent } from './cliente/modificar-cliente/modificar-cliente.component';
import { LoginComponent } from './landing/login/login.component';
import { UrlTestComponent } from './test/url-test/url-test.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: HomeComponent },// Ruta para el inicio
  {path: 'test/:id/:name', component: UrlTestComponent},
  {path: 'home/:cedula', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mascotas/:id', component: MascotasTableComponent},
  {path: 'mascotas/all',component: MascotasTableComponent},
  {path: 'mascota/find/:id',component: MostrarMascotaComponent },
  {path: "mascota/add", component: NuevaMascotaComponent},
  {path: 'mascota/update/:id', component: ModificarMascotaComponent},
  {path: 'clientes/all', component: ClienteTableComponent},
  {path: 'clientes/update/:id', component: ModificarClienteComponent},
  {path: 'cliente/find/:id', component: MostrarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
