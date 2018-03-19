import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdbranchComponent } from './adbranch.component';

describe('AdbranchComponent', () => {
  let component: AdbranchComponent;
  let fixture: ComponentFixture<AdbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
