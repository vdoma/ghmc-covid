import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalChartComponent } from './mandal-chart.component';

describe('MandalChartComponent', () => {
  let component: MandalChartComponent;
  let fixture: ComponentFixture<MandalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
