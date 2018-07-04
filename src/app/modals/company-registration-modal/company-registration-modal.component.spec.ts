import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationModalComponent } from './company-registration-modal.component';

describe('CompanyRegistrationModalComponent', () => {
  let component: CompanyRegistrationModalComponent;
  let fixture: ComponentFixture<CompanyRegistrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
