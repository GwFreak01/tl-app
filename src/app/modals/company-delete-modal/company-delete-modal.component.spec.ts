import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDeleteModalComponent } from './company-delete-modal.component';

describe('CompanyDeleteModalComponent', () => {
  let component: CompanyDeleteModalComponent;
  let fixture: ComponentFixture<CompanyDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
