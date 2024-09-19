import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing/header/header.component';
import { FooterComponent } from './landing/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { ClienteTableComponent } from './cliente/cliente-table/cliente-table.component';
import { DrogaTableComponent } from './droga/droga-table/droga-table.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';

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
    VeterinarioTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
