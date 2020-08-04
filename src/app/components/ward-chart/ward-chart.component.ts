import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { WardInfo} from 'src/app/interfaces/ward-info'
import { environment } from "src/environments/environment";
import { ConfigService } from 'src/app/services/config.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-ward-chart',
  templateUrl: './ward-chart.component.html',
  styleUrls: ['./ward-chart.component.css']
})
export class WardChartComponent implements OnInit {

  dataLoaded = false;
  url: string = `${environment.dataUrl}/ward-info.json`;
  wardInfo: WardInfo[] = [];
  sortByCountLabel = 'Sort by Count';
  sortByWardLabel = 'Sort by Ward';
  sortBtnLabel: string;

  chartOptions: ChartOptions;
  chartType: ChartType;
  chartLegend: boolean;

  chartLabels1: Label[];
  chartData1: ChartDataSets[];

  chartLabels2: Label[];
  chartData2: ChartDataSets[];

  chartLabels3: Label[];
  chartData3: ChartDataSets[];

  chartLabels4: Label[];
  chartData4: ChartDataSets[];

  chartLabels5: Label[];
  chartData5: ChartDataSets[];


  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private utils: UtilService
  ) {
    this.initChartOptions();
  }

  ngOnInit(): void {
    this.sortBtnLabel = this.sortByCountLabel; // add option to sort by count
    this.http.get<WardInfo[]>(this.url).subscribe(data => {
      this.wardInfo = data;
      this.wardInfo = this.wardInfo.sort(this.sortByProp('ward')); // by default, sort by ward
      this.populateData();
      //this.utils.ensureBarHeightSufficient(counts, this.chartOptions)
      this.dataLoaded = true;
    });
  }

  populateData() {

    this.chartLabels1 = this.wardInfo.slice(0, 30).map(e => e.ward);
    this.addChartData(this.chartData1, this.wardInfo.slice(0, 30));

    this.chartLabels2 = this.wardInfo.slice(30, 60).map(e => e.ward);
    this.addChartData(this.chartData2, this.wardInfo.slice(30, 60));

    this.chartLabels3 = this.wardInfo.slice(60, 90).map(e => e.ward);
    this.addChartData(this.chartData3, this.wardInfo.slice(60, 90));

    this.chartLabels4 = this.wardInfo.slice(90, 120).map(e => e.ward);
    this.addChartData(this.chartData4, this.wardInfo.slice(90, 120));

    this.chartLabels5 = this.wardInfo.slice(120).map(e => e.ward);
    this.addChartData(this.chartData5, this.wardInfo.slice(120));
  }

  onSort() {
    if (this.sortBtnLabel === this.sortByWardLabel) {
      this.wardInfo = this.wardInfo.sort(this.sortByProp('count'));
      this.populateData();
      this.sortBtnLabel = this.sortByCountLabel;
    } else {
      this.wardInfo = this.wardInfo.sort(this.sortByProp('ward'));
      this.populateData();
      this.sortBtnLabel = this.sortByWardLabel;
    }
  }

  sortByProp(prop: any) {
    return (a, b) => {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] === b[prop]) return 0;
      if (a[prop] > b[prop]) return 1;
    }
  }

  // addChartLabels(labels: Label[], info: WardInfo[]) {
  //   info.forEach(e => { labels.push(e.ward); })
  // }

  addChartData(dataset: ChartDataSets[], info: WardInfo[]) {
    const bgColors = info.map(e => this.config.barBgColor);
    const hoverBgColors = info.map(e => this.config.barHoverBgColor);
    const borderColors = info.map(e => this.config.barBorderColor);
    dataset.length = 0;
    dataset.push({
      data: info.map(e => e.count),
      label: 'Infected',
      backgroundColor: bgColors,
      hoverBackgroundColor: hoverBgColors,
      borderColor: borderColors,
      borderWidth: 1
    });
  }

  initChartOptions() {
    this.chartType = 'bar';
    this.chartLegend = false;
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

    this.chartLabels1= [];
    this.chartData1 = [];

    this.chartLabels2= [];
    this.chartData2 = [];

    this.chartLabels3= [];
    this.chartData3 = [];

    this.chartLabels4= [];
    this.chartData4 = [];

    this.chartLabels5= [];
    this.chartData5 = [];

  }
}
