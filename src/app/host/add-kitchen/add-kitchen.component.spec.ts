import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitchenComponent } from './add-kitchen.component';

describe('AddKitchenComponent', () => {
  let component: AddKitchenComponent;
  let fixture: ComponentFixture<AddKitchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKitchenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
