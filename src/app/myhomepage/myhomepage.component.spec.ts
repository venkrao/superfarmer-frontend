import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhomepageComponent } from './myhomepage.component';

describe('MyhomepageComponent', () => {
  let component: MyhomepageComponent;
  let fixture: ComponentFixture<MyhomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
