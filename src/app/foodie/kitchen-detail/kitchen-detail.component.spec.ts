import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KitchenDetailComponent } from './kitchen-detail.component';

describe('KitchenDetailComponent', () => {
  let component: KitchenDetailComponent;
  let fixture: ComponentFixture<KitchenDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
