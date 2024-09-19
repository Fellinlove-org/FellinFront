import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasTableComponent } from './mascotas/mascotas-table/mascotas-table.component';
import { HomeComponent } from './landing/home/home.component';
import { MostrarMascotaComponent } from './mascotas/mostrar-mascota/mostrar-mascota.component';
import { NuevaMascotaComponent } from './mascotas/nueva-mascota/nueva-mascota.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el inicio
  {path: 'MascotaTabla',component: MascotasTableComponent},
  {path: 'Mascota/find/:id',component: MostrarMascotaComponent },
  {path: "NuevaMascota", component: NuevaMascotaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
