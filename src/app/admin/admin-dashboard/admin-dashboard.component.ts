import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  kpis: { title: string; value: number | string }[] = [];
  cant_tratamientos: { nombre: string; cantidad: number }[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService,
    private drogaService: DrogaService,
    private tratamientoService: TratamientoService
  ) {}

  ngOnInit(): void {
    // Configuración del intervalo para recargar datos cada 60 segundos
    this.subscription = interval(1000) // Cada 60 segundos
      .pipe(
        switchMap(() => this.cargarDatos())
      )
      .subscribe(
        () => console.log('Datos del dashboard actualizados.'),
        (error) => console.error('Error al actualizar datos del dashboard:', error)
      );

    // Cargar los datos iniciales al iniciar el componente
    this.cargarDatos();
    this.createBarChart();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subscription.unsubscribe();
  }

  cargarDatos() {
    // Llamada a todas las funciones de carga de datos
    this.cargarTratamientosUltimoMes();
    this.cargarMascotasKPIs();
    this.cargarVentasGanancias();
    this.cargarTratamientosPorDroga();
    return this.tratamientoService.getTratamientosUltimoMes(); // Retorno para switchMap
  }

  cargarVentasGanancias(): void {
    this.drogaService.getGananciasTotales().subscribe(
      (ganancias) => this.actualizarKPI('Ganancias Totales', ganancias),
      (error) => console.error('Error al cargar ganancias totales:', error)
    );

    this.drogaService.getVentasTotales().subscribe(
      (ventas) => this.actualizarKPI('Ventas Totales', ventas),
      (error) => console.error('Error al cargar ventas totales:', error)
    );
  }


  cargarMascotasKPIs(): void {
    this.mascotaService.getTotalMascotas().subscribe(
      (total) => this.actualizarKPI('Total de Mascotas', total),
      (error) => console.error('Error al cargar el total de mascotas:', error)
    );

    this.mascotaService.getMascotasEnTratamiento().subscribe(
      (enTratamiento) => this.actualizarKPI('Mascotas en Tratamiento', enTratamiento),
      (error) => console.error('Error al cargar mascotas en tratamiento:', error)
    );
  }

  cargarTratamientosPorDroga(): void {
    this.tratamientoService.getTratamientosPorDroga().subscribe(
      (data: [string, number][]) => {
        this.cant_tratamientos = data.map(([nombre, cantidad]) => ({
          nombre,
          cantidad,
        }));
      },
      (error) =>
        console.error('Error al cargar tratamientos por droga:', error)
    );
  }

  cargarTratamientosUltimoMes(): void {
    this.tratamientoService.getTratamientosUltimoMes().subscribe(
      (total: number) =>
        this.actualizarKPI('Tratamientos Administrados Último Mes', total),
      (error) =>
        console.error('Error al cargar tratamientos del último mes:', error)
    );
  }

  actualizarKPI(title: string, value: number | string): void {
    const kpi = this.kpis.find((k) => k.title === title);
    if (kpi) {
      kpi.value = value;
    } else {
      this.kpis.push({ title, value });
    }
  }

  createBarChart(): void {
    this.drogaService.getTopTratamientos().subscribe(
      (data) => {
        const labels = data.map((item) => item[0]); // Nombres de los tratamientos
        const values = data.map((item) => item[1]); // Unidades vendidas

        const ctx = document.getElementById(
          'top3_tratamientos'
        ) as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Unidades Vendidas',
                data: values,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
          },
        });
      },
      (error) => console.error('Error al cargar el top 3 de tratamientos:', error)
    );
  }
}