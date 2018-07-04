import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReportModalComponent } from './company-report-modal.component';

describe('CompanyReportModalComponent', () => {
  let component: CompanyReportModalComponent;
  let fixture: ComponentFixture<CompanyReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
