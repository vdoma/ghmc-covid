import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, ThemeService } from 'ng2-charts';
import { ZoneInfo} from 'src/app/interfaces/zone-info'
import { environment } from "src/environments/environment";
import { ConfigService } from 'src/app/services/config.service';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-zone-chart',
  templateUrl: './zone-chart.component.html',
  styleUrls: ['./zone-chart.component.css']
})
export class ZoneChartComponent implements OnInit {

  dataLoaded = false;
  url: string = `${environment.dataUrl}/zone-info.json`;
  zoneInfo: ZoneInfo[] = [];

  chartOptions: ChartOptions;
  chartType: ChartType;
  chartLegend: boolean;
  chartLabels: Label[];
  chartData: ChartDataSets[];

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private utils: UtilService,
    // private location: Location
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    // this.location.go('/zone');
    // Chart.defaults.global.defaultFontSize = 14;
    this.http.get<ZoneInfo[]>(this.url)
    .subscribe(data => {
      this.zoneInfo = data;
      this.chartLabels = this.zoneInfo.map(e => e.zone);
      const counts = this.zoneInfo.map(e => e.count);
      const bgColors = this.zoneInfo.map(e => this.config.barBgColor);
      const hoverBgColors = this.zoneInfo.map(e => this.config.barHoverBgColor);
      const borderColors = this.zoneInfo.map(e => this.config.barBorderColor);
      this.chartData.push({
        data: counts,
        label: 'Infected',
        backgroundColor: bgColors,
        hoverBackgroundColor: hoverBgColors,
        borderColor: borderColors,
        borderWidth: 1
      });

      this.utils.ensureBarHeightSufficient(counts, this.chartOptions)
      this.dataLoaded = true;
    });
  }

  initChartOptions() {
    this.chartType = 'bar';
    this.chartLegend = false;
    this.chartLabels= [];
    this.chartData = [];
    this.chartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'GHMC Wards'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number Infected'
          },
          ticks: {
          }
        }]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
  }
}
