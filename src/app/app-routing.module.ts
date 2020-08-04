import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { ZoneChartComponent } from './components/zone-chart/zone-chart.component';
import { WardChartComponent } from './components/ward-chart/ward-chart.component';
import { CircleChartComponent } from './components/circle-chart/circle-chart.component';
import { TableComponent } from './components/table/table.component';
import { MandalChartComponent } from './components/mandal-chart/mandal-chart.component';
import { TimeChartComponent } from './components/time-chart/time-chart.component';


const routes: Routes = [
  { path: 'zone', component: ZoneChartComponent},
  { path: 'circle', component: CircleChartComponent},
  { path: 'ward', component: WardChartComponent},
  { path: 'gender', component: GenderChartComponent},
  { path: 'table', component: TableComponent},
  { path: 'mandal', component: MandalChartComponent},
  { path: 'time', component: TimeChartComponent},
  { path: '**', component: ZoneChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
