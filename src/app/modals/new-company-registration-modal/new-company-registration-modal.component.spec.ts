import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyRegistrationModalComponent } from './new-company-registration-modal.component';

describe('NewCompanyRegistrationModalComponent', () => {
  let component: NewCompanyRegistrationModalComponent;
  let fixture: ComponentFixture<NewCompanyRegistrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyRegistrationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
