import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsSellerComponent } from './register-as-seller.component';

describe('RegisterAsSellerComponent', () => {
  let component: RegisterAsSellerComponent;
  let fixture: ComponentFixture<RegisterAsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
