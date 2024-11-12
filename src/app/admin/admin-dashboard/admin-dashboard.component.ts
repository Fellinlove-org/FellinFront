import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { interval, Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { DrogaService } from 'src/app/service/droga.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { AdminService } from 'src/app/service/admin.service';
import { DrogaDTO } from 'src/app/model/droga-dto';
import { TratamientoDTO } from 'src/app/model/tratamiento-dto';
import { Droga } from 'src/app/model/droga';
import { Veterinario } from 'src/app/model/veterinario';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {

  cedula !: string;

  nombre_usuario !: string;

  userType !: string;

  kpis: { title: string; value: number | string }[] = [];
  cant_tratamientos: { nombre: string; cantidad: number }[] = [];
  private subscription: Subscription = new Subscription();

  totalTratamientos: number = 0;
  mascotasActivas: number = 0;

  gananciasTotal: number = 0;
  ventasTotal: number = 0;

  chartInstance: Chart | null = null;

  drogas_escasas : DrogaDTO[] = []

  empleadoMes : Veterinario = {
    id : 0,
    cedula: "",
    nombre: "",
    correo: "",
    password: "",
    especialidad: "",
    foto: ""
  };

  constructor(
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService,
    private drogaService: DrogaService,
    private tratamientoService: TratamientoService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    
  this.adminService.adminHome()
    .pipe(
      mergeMap((admin) => {
        this.userType = 'administrador';
        this.nombre_usuario = admin.nombre;
        this.cedula = admin.cedula.toString();
        return this.tratamientoService.getTotalTratamientos()
          .pipe(
            mergeMap((total: number) => {
              this.totalTratamientos = total;
              return this.drogaService.getVentasTotales()
            }),
            mergeMap((ventasTotales: number) => {
              this.ventasTotal = ventasTotales;
              return this.drogaService.getGananciasTotales();
            }),
            mergeMap((gananciasTotales: number) => {
              this.gananciasTotal = gananciasTotales;
              return this.drogaService.getTopTratamientos()
            }),
            mergeMap((data) => {
              const labels = data.map((item) => item[0]); // Nombres de los tratamientos
              const values = data.map((item) => item[1]); // Unidades vendidas
                
              const ctx = document.getElementById('top3_tratamientos') as HTMLCanvasElement;
                
              // Destruir el gráfico existente si ya existe
              if (this.chartInstance) {
                this.chartInstance.destroy();
              }
                
              // Crear un nuevo gráfico y asignarlo a la variable chartInstance
              this.chartInstance = new Chart(ctx, {
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
                  animation: false, 
                  scales: { y: { beginAtZero: true } },
                },
              });
              return this.drogaService.getDrogasEscasas();
            }),
            mergeMap((drogas_escasas) => {
              this.drogas_escasas = drogas_escasas;
              return this.veterinarioService.getEmpleadoMes();
              
            }),
            mergeMap((vet) => {
              console.log(vet)
              this.empleadoMes.nombre = vet.nombre
              this.empleadoMes.foto = vet.foto
              return this.mascotaService.getMascotasEnTratamiento();
            })
          );
        })
    ).subscribe(mascotas => {
      this.mascotasActivas = mascotas;
    });
  }

}