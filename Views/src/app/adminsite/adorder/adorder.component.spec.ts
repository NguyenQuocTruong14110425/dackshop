import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdorderComponent } from './adorder.component';

describe('AdorderComponent', () => {
  let component: AdorderComponent;
  let fixture: ComponentFixture<AdorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
