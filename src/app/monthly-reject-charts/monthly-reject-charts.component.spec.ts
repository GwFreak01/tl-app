import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRejectChartsComponent } from './monthly-reject-charts.component';

describe('MonthlyRejectChartsComponent', () => {
  let component: MonthlyRejectChartsComponent;
  let fixture: ComponentFixture<MonthlyRejectChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyRejectChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRejectChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
