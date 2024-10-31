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
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { NuevoClienteComponent } from './cliente/nuevo-cliente/nuevo-cliente.component';
import { NuevoVeterinarioComponent } from './veterinario/nuevo-veterinario/nuevo-veterinario.component';
import { ModificarTratamientoComponent } from './tratamiento/modificar-tratamiento/modificar-tratamiento.component';
import { AddTratamientoComponent} from './tratamiento/agregar-tratamiento/agregar-tratamiento.component';

const routes: Routes = [
  {path: '', component: HomeComponent },// Ruta para el inicio
  {path: 'login', component: LoginComponent},
  {path: 'cliente/:id', component: ClienteComponent},
  {path: 'veterinario/:cedula', component: VeterinarioComponent},
  {path: 'admin/:cedula', component: AdminComponent},
  {path: 'mascotas/:cedula', component: MascotasTableComponent},
  {path: 'mascotas/:rol/:cedula', component: MascotasTableComponent},
  {path: 'mascota/:cedula/update/:id', component: ModificarMascotaComponent},
  {path: 'mascotas/all',component: MascotasTableComponent},
  {path: 'mascota/:cedula/find/:id',component: MostrarMascotaComponent },
  {path: "mascota/:cedula/add", component: NuevaMascotaComponent},
  {path: 'mascota/:cedula/update/:id', component: ModificarMascotaComponent},
  {path: 'clientes/:cedula', component: ClienteTableComponent},
  {path: 'clientes/:cedula/update/:id', component: ModificarClienteComponent},
  {path: 'cliente/:cedula/find/:id', component: MostrarClienteComponent},
  {path: 'cliente/:cedula/add', component: NuevoClienteComponent},
  {path: 'veterinarios/:cedula', component: VeterinarioTableComponent},
  {path: 'veterinarios/:rol/:cedula', component: VeterinarioTableComponent},
  {path: 'veterinarios/update/:id', component: ModificarVeterinarioComponent},
  {path: 'veterinario/:cedula/find/:id', component: MostrarVeterinarioComponent},
  {path: 'veterinario/:cedula/update/:id', component: ModificarVeterinarioComponent},
  {path: 'veterinario/:cedula/add', component: NuevoVeterinarioComponent},
  {path: 'tratamiento/:cedula/find/:id', component: MostrarTratamientoComponent},
  {path: 'tratamientos/:cedula', component: TratamientoTableComponent},
  {path: 'tratamiento/:cedula/update/:id', component: ModificarTratamientoComponent},
  {path: 'tratamiento/:cedula/add/:id', component: AddTratamientoComponent },

  { path: 'admin/:cedula/negocio', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
