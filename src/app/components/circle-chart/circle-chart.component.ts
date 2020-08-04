import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CircleInfo} from 'src/app/interfaces/circle-info'
import { environment } from "src/environments/environment";
import { ConfigService } from 'src/app/services/config.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.css']
})
export class CircleChartComponent implements OnInit {

  dataLoaded = false;
  url: string = `${environment.dataUrl}/circle-info.json`;
  circleInfo: CircleInfo[] = [];

  chartOptions: ChartOptions;
  chartType: ChartType;
  chartLegend: boolean;
  chartLabels: Label[];
  chartData: ChartDataSets[];

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private utils: UtilService
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    // Chart.defaults.global.defaultFontSize = 14;
    this.http.get<CircleInfo[]>(this.url)
    .subscribe(data => {
      this.circleInfo = data;
      this.chartLabels = this.circleInfo.map(e => e.circle);
      const counts = this.circleInfo.map(e => e.count);
      const bgColors = this.circleInfo.map(e => this.config.barBgColor);
      const hoverBgColors = this.circleInfo.map(e => this.config.barHoverBgColor);
      const borderColors = this.circleInfo.map(e => this.config.barBorderColor);

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
            labelString: 'GHMC Circles'
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
