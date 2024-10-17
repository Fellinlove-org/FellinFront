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
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';
import { ModificarVeterinarioComponent } from './veterinario/modificar-veterinario/modificar-veterinario.component';
import { MostrarVeterinarioComponent } from './veterinario/mostrar-veterinario/mostrar-veterinario.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { VeterinarioComponent } from './veterinario/veterinario/veterinario.component';
import { MostrarTratamientoComponent } from './tratamiento/mostrar-tratamiento/mostrar-tratamiento.component';


import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin/admin.component';
const routes: Routes = [
  {path: '', component: HomeComponent },// Ruta para el inicio
  {path: 'login', component: LoginComponent},
  {path: 'cliente/:id', component: ClienteComponent},
  {path: 'veterinario/:cedula', component: VeterinarioComponent},
  {path: 'admin/:cedula', component: AdminComponent},
  {path: 'mascotas/:cedula', component: MascotasTableComponent},
  {path: 'mascotas/:rol/:cedula', component: MascotasTableComponent},
  {path: 'mascotas/all',component: MascotasTableComponent},
  {path: 'mascota/:cedula/find/:id',component: MostrarMascotaComponent },
  {path: "mascota/:cedula/add", component: NuevaMascotaComponent},
  {path: 'mascota/:cedula/update/:id', component: ModificarMascotaComponent},
  {path: 'clientes/:cedula', component: ClienteTableComponent},
  {path: 'clientes/:cedula/update/:id', component: ModificarClienteComponent},
  {path: 'cliente/:cedula/find/:id', component: MostrarClienteComponent},
  {path: 'veterinarios/:cedula', component: VeterinarioTableComponent},
  {path: 'veterinarios/:rol/:cedula', component: VeterinarioTableComponent},
  {path: 'veterinarios/update/:id', component: ModificarVeterinarioComponent},
  {path: 'veterinario/:cedula/find/:id', component: MostrarVeterinarioComponent},
  {path: 'veterinario/:cedula/update/:id', component: ModificarVeterinarioComponent},
  {path: 'tratamiento/:cedula', component: MostrarTratamientoComponent},
  {path: 'tratamiento/:cedula/update/:id', component: MostrarTratamientoComponent},
  

  { path: 'admin/negocio', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
