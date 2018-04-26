import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepromotionComponent } from './createpromotion.component';

describe('CreatepromotionComponent', () => {
  let component: CreatepromotionComponent;
  let fixture: ComponentFixture<CreatepromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
