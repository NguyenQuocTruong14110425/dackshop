import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpromotionComponent } from './adpromotion.component';

describe('AdpromotionComponent', () => {
  let component: AdpromotionComponent;
  let fixture: ComponentFixture<AdpromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
