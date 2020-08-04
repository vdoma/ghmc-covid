import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  private barBgColor_: string = "#AAAAAA";
  private barHoverBgColor_: string = "#09B0BB";
  private barBorderColor_: string = "#AAAAAA";

  get barBgColor(): string { return this.barBgColor_; }
  get barHoverBgColor(): string { return this.barHoverBgColor_; }
  get barBorderColor(): string { return this.barBorderColor_; }
}
