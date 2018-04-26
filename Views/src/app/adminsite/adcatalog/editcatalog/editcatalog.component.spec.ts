import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatalogComponent } from './editcatalog.component';

describe('EditcatalogComponent', () => {
  let component: EditcatalogComponent;
  let fixture: ComponentFixture<EditcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
