import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdproductComponent } from './adproduct.component';

describe('AdproductComponent', () => {
  let component: AdproductComponent;
  let fixture: ComponentFixture<AdproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
