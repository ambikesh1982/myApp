import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppToolbarComponent } from './app-toolbar.component';

describe('AppToolbarComponent', () => {
  let component: AppToolbarComponent;
  let fixture: ComponentFixture<AppToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
