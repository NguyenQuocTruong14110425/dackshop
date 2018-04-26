import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcatalogComponent } from './adcatalog.component';

describe('AdcatalogComponent', () => {
  let component: AdcatalogComponent;
  let fixture: ComponentFixture<AdcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
