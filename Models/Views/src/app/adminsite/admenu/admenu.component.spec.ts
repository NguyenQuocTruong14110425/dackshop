import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmenuComponent } from './admenu.component';

describe('AdmenuComponent', () => {
  let component: AdmenuComponent;
  let fixture: ComponentFixture<AdmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
