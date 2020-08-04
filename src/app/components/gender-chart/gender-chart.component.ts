import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GenderInfo } from 'src/app/interfaces/gender-info';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.css']
})
export class GenderChartComponent implements OnInit {

  dataLoaded = false;
  url: string = `${environment.dataUrl}/gender-info.json`;
  genderInfo: GenderInfo[] = [];

  chartOptions: ChartOptions;
  chartLabels: Label[];
  chartData: number[];
  chartType: ChartType;
  chartLegend: boolean;
  chartPlugins: any;
  chartColors: any;

  constructor(private http: HttpClient, private location: Location) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.http.get<GenderInfo[]>(this.url)
    .subscribe(data => {
      this.genderInfo = data.sort((a ,b) => {
        if (a.gender < b.gender) return -1;
        if (a.gender === b.gender) return 0;
        if (a.gender > b.gender) return 1;
      });
      this.chartLabels = this.genderInfo.map(e => e.gender);
      this.chartData = this.genderInfo.map(e => e.count);
      this.dataLoaded = true;
    });
  }

  initChartOptions() {
    const [femaleColor, maleColor, unknownColor] = ['#F5A9B8', '#5BCEFA', '#E5E5E5'];
    this.chartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (val, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    this.chartLabels = [];
    this.chartData = [];
    this.chartType = 'pie';
    this.chartLegend = false;
    this.chartPlugins = [pluginDataLabels];
    this.chartColors = [{
      backgroundColor: [femaleColor, maleColor, unknownColor]
    }];
  }

}
