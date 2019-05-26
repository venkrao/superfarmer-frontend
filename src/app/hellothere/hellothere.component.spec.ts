import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HellothereComponent } from './hellothere.component';

describe('HellothereComponent', () => {
  let component: HellothereComponent;
  let fixture: ComponentFixture<HellothereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HellothereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HellothereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
