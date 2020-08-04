import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { MandalInfo} from 'src/app/interfaces/mandal-info'
import { environment } from "src/environments/environment";
import { UtilService } from 'src/app/services/util.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-mandal-chart',
  templateUrl: './mandal-chart.component.html',
  styleUrls: ['./mandal-chart.component.css']
})
export class MandalChartComponent implements OnInit {
  dataLoaded = false;

  url: string = `${environment.dataUrl}/mandal-info.json`;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'GHMC Mandals'
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

  mandalInfo: MandalInfo[] = [];
  chartType: ChartType = 'bar';
  chartLegend = true;
  barChartPlugins = [pluginDataLabels];

  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [];

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private utils: UtilService) {
   }

  ngOnInit(): void {
    Chart.defaults.global.plugins.datalabels.anchor = 'end';
    Chart.defaults.global.plugins.datalabels.align = 'end';
    this.http.get<MandalInfo[]>(this.url)
    .subscribe(data => {
      this.mandalInfo = data;
      this.chartLabels = this.mandalInfo.map(e => this.utils.capitalize(e.mandal));
      const counts = this.mandalInfo.map(e => e.count);
      const bgColors = this.mandalInfo.map(e => this.config.barBgColor);
      const hoverBgColors = this.mandalInfo.map(e => this.config.barHoverBgColor);
      const borderColors = this.mandalInfo.map(e => this.config.barBorderColor);
      // // remove ghmc...
      // this.chartLabels.pop();
      // arr.pop();

      this.chartData.push({
        data: counts,
        label: 'Number Infected',
        backgroundColor: bgColors,
        hoverBackgroundColor: hoverBgColors,
        borderColor: borderColors,
        borderWidth: 1
      });
      this.utils.ensureBarHeightSufficient(counts, this.chartOptions)
      this.dataLoaded = true;
    });
  }

}
