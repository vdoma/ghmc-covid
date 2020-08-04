import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Record } from 'src/app/interfaces/record';
import { WardInfo } from 'src/app/interfaces/ward-info';
import { CircleInfo } from 'src/app/interfaces/circle-info';
import { ZoneInfo } from 'src/app/interfaces/zone-info';
import { SelectItem } from 'primeng/api';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {

  types: SelectItem[] = [
    { label: 'Ward', value: 'Ward' },
    { label: 'Circle', value: 'Circle' },
    { label: 'Zone', value: 'Zone' }
  ];

  wards: SelectItem[] = [];
  circles: SelectItem[] = [];
  zones: SelectItem[] = [];
  values: SelectItem[] = [];

  selectedType: string;
  selectedValue: string;

  showValuesControl = false;
  showChart = false;

  ghmcJson: Record[] = null;

  public chartData: ChartDataSets[];
  public chartLabels: Label[];

  public chartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
          label: (tooltipItems, data) => {
              return null;
          },
          title: (tooltipItems, data) => {
            const index = tooltipItems[0].index;
            const value = tooltipItems[0].value;
            if (index === 0) {
              return `${value} infected in ${this.selectedValue}`;
            } else {
              const prevIndex = index - 1;
              return `When ${prevIndex}000-${index}000 cases were recorded in GHMC, ${value} people were infected in ${this.selectedValue}`;
            }
          },
          afterLabel: (tooltipItems, data) => {
          return null;
          }
      }
  },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Total Number of Cases in GHMC in Thousands'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number Infected'
        }
      }]
    },
    annotation: {
      annotations: [],
    },
  };
  public chartColors: Color[] = [
    { // grey
      backgroundColor: '#FFFFFF',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public chartLegend = false;
  public chartType = 'line';
  public chartPlugins = []; // [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    forkJoin([
      this.http.get<WardInfo[]>(`${environment.dataUrl}/ward-info.json`),
      this.http.get<CircleInfo[]>(`${environment.dataUrl}/circle-info.json`),
      this.http.get<ZoneInfo[]>(`${environment.dataUrl}/zone-info.json`)
    ]).subscribe(res => {
      const wardInfo: WardInfo[] = this.sortByType('ward', res[0]);
      const circleInfo: CircleInfo[] = this.sortByType('circle', res[1]);
      const zoneInfo: ZoneInfo[] = this.sortByType('zone', res[2]);

      this.wards = wardInfo.map(e => {
        return { label: e.ward, value: e.ward };
      });
      this.circles = circleInfo.map(e => {
        return { label: e.circle, value: e.circle };
      });
      this.zones = zoneInfo.map(e => {
        return { label: e.zone, value: e.zone };
      });
    });
  }

  sortByType(type: string, coll: any[]) {
    return coll.sort((a,b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] === b[type]) return 0;
      if (a[type] > b[type]) return 1;
    });
  }

  onChangeType(event) {
    const type = event.value;
    if (this.selectedType === type) {
      return;
    } else {
      this.selectedType = type;
      this.selectedValue = null;
      this.showValuesControl = false;
      this.showChart = false;
    }

    switch (this.selectedType) {
      case 'Ward': this.values = this.wards; break;
      case 'Circle': this.values = this.circles; break;
      case 'Zone': this.values = this.zones; break;
    }
    this.showValuesControl = true;
  }

  onGenerateChart(event) {
    if (!this.ghmcJson) {
      this.http.get<Record[]>(`${environment.dataUrl}/ghmc.json`).subscribe(res => {
        this.ghmcJson = res;
        this.generateChart();
      });
    } else {
      this.generateChart();
    }
  }

  generateChart() {
    const frequency = 1000;
    const type = this.selectedType.toLowerCase();
    // make first item the default value
    if (!this.selectedValue) {
      this.selectedValue = this.values[0].value;
    }
    const value = this.selectedValue
    const records = this.ghmcJson.filter(e => e[type] === value);
    let res = {};

    let patientIds = this.ghmcJson.map(e => e.patientId);
    patientIds = patientIds.sort((a,b) => a - b);
    let lastPatientId = patientIds[patientIds.length - 1];
    const intervals = Math.ceil(lastPatientId / 1000);
    for (let i = 0; i < intervals; i++ ) {
      res[i] = 0;
    }
    records.forEach(e => {
      // gets floor 1000 or 0. so P5 will be in 0th bucket. P1100 will be in 1000 bucket
      // its js, so need to floor the number
      const bucket = Math.floor(e.patientId / 1000);
      // get current val
      let val:number = res[bucket];
      if (!val) val = 0;
      // incr current val
      val = val + 1;
      res[bucket] = val;
    })
    this.chartData = [{
      data: Object.values<number>(res),
      label: 'Number Infected'
    }];
    const labels = [];
    Object.keys(res).forEach(prop => {
      labels.push(`${prop}K`);
    });
    this.chartLabels = labels;
    this.showChart = true;
  }

  // line chart events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
