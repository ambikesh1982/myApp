import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KitchenListComponent } from './kitchen-list.component';

describe('KitchenListComponent', () => {
  let component: KitchenListComponent;
  let fixture: ComponentFixture<KitchenListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
