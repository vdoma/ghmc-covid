import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  capitalize(word: string): string {
    if (!word) return word;
    if (word.length === 1) {
      return word.toUpperCase();
    } else {
      return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    }
  }

  ensureBarHeightSufficient(coll: number[], chartOptions: ChartOptions) {
    // ensure max value is visible on vertical bar chart
    const max = Math.max(...coll);
    const length = max.toString().length;
    if (length > 2) {
      chartOptions.scales.yAxes[0].ticks.max = max + (10 ** (length - 2));
    }
  }


}
