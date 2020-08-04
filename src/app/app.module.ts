import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';

import { TableComponent } from 'src/app/components/table/table.component';
import { MandalChartComponent } from 'src/app/components/mandal-chart/mandal-chart.component';
import { UtilService } from 'src/app/services/util.service';
import { ZoneChartComponent } from 'src/app/components/zone-chart/zone-chart.component';
import { ConfigService } from './services/config.service';
import { CircleChartComponent } from 'src/app/components/circle-chart/circle-chart.component';
import { WardChartComponent } from './components/ward-chart/ward-chart.component';
import { GenderChartComponent } from './components/gender-chart/gender-chart.component';
import { TimeChartComponent } from './components/time-chart/time-chart.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    MandalChartComponent,
    ZoneChartComponent,
    CircleChartComponent,
    WardChartComponent,
    GenderChartComponent,
    TimeChartComponent,
    DisclaimerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    ChartsModule,
    TabsModule.forRoot(),
    SelectButtonModule,
    DropdownModule,
    ButtonModule

  ],
  providers: [UtilService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
