import { Component, ViewChild, OnInit } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Record } from 'src/app/interfaces/record';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {
  // @ViewChild(DataTableDirective, {static: false})
  // datatableElement: DataTableDirective;
  // dataLoaded = false;
  // url: string = `${environment.dataUrl}/ghmc.json`;
  // dtOptions: DataTables.Settings = {
  //   pagingType: 'full_numbers',
  //   pageLength: 100,
  //   columns: [{
  //     title: 'Mandal',
  //     data: 'mandal'
  //   }, {
  //     title: 'PatientID',
  //     data: 'patientId'
  //   }, {
  //     title: 'Gender',
  //     data: 'gender'
  //   }, {
  //     title: 'Ward',
  //     data: 'ward'
  //   }, {
  //     title: 'Circle',
  //     data: 'circle'
  //   }, {
  //     title: 'Zone',
  //     data: 'zone'
  //   }]
  // };
  // records: Record[] = [];
  // dtTrigger: Subject<any> = new Subject();

  constructor() { //private http: HttpClient) {

  }

  ngOnInit(): void {
    // this.http.get<Record[]>(this.url)
    //   .subscribe(data => {
    //     this.records = data;
    //     this.dtTrigger.next();

    //     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //       console.log(dtInstance);
    //       dtInstance.on('preDraw', () => {
    //         console.log('redrawn...')
    //       });
    //       this.dataLoaded = true;
    //     });
    //   });
  }
}
