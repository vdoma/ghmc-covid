import { Component, ViewEncapsulation, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ghmc-covid';
  navbarOpen = false;

  constructor( private router: Router ) {
  }

  ngOnInit() {
    Chart.defaults.global.defaultFontSize = 14;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
