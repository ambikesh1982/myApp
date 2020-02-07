import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactCardComponent } from './dialog-contact-card.component';

describe('DialogContactCardComponent', () => {
  let component: DialogContactCardComponent;
  let fixture: ComponentFixture<DialogContactCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContactCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
