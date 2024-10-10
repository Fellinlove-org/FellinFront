import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing/header/header.component';
import { FooterComponent } from './landing/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import {HttpClientModule} from '@angular/common/http';

import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { ClienteTableComponent } from './cliente/cliente-table/cliente-table.component';
import { DrogaTableComponent } from './droga/droga-table/droga-table.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';

import { MascotasTableComponent } from './mascotas/mascotas-table/mascotas-table.component';
import { MostrarMascotaComponent } from './mascotas/mostrar-mascota/mostrar-mascota.component';
import { NuevaMascotaComponent } from './mascotas/nueva-mascota/nueva-mascota.component';
import { FormsModule } from '@angular/forms';
import { EmoticonPipe } from './pipes/emoticon.pipe';
import { ModificarMascotaComponent } from './mascotas/modificar-mascota/modificar-mascota.component';
import { ModificarClienteComponent } from './cliente/modificar-cliente/modificar-cliente.component';
import { MostrarClienteComponent } from './cliente/mostrar-cliente/mostrar-cliente.component';
import {NuevoClienteComponent} from './cliente/nuevo-cliente/nuevo-cliente.component';
import { LoginComponent } from './landing/login/login.component';
import { UrlTestComponent } from './test/url-test/url-test.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminTableComponent,
    ClienteTableComponent,
    DrogaTableComponent,
    TratamientoTableComponent,
    VeterinarioTableComponent,

    MascotasTableComponent,
    MostrarMascotaComponent,
    NuevaMascotaComponent,
    EmoticonPipe,
    ModificarMascotaComponent,
    ModificarClienteComponent,
    MostrarClienteComponent,
    NuevoClienteComponent,
    LoginComponent,
    UrlTestComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
