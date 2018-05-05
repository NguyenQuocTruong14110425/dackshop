import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalechartComponent } from './salechart.component';

describe('SalechartComponent', () => {
  let component: SalechartComponent;
  let fixture: ComponentFixture<SalechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
