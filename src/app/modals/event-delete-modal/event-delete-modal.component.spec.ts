import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDeleteModalComponent } from './event-delete-modal.component';

describe('EventDeleteModalComponent', () => {
  let component: EventDeleteModalComponent;
  let fixture: ComponentFixture<EventDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
