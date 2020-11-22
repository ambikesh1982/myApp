import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KitchenFormComponent } from './kitchen-form.component';

describe('KitchenFormComponent', () => {
  let component: KitchenFormComponent;
  let fixture: ComponentFixture<KitchenFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
