import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardChartComponent } from './ward-chart.component';

describe('WardChartComponent', () => {
  let component: WardChartComponent;
  let fixture: ComponentFixture<WardChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
