import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypopmodalComponent } from './mypopmodal.component';

describe('MypopmodalComponent', () => {
  let component: MypopmodalComponent;
  let fixture: ComponentFixture<MypopmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypopmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypopmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
