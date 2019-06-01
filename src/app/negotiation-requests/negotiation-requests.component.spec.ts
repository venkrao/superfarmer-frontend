import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationRequestsComponent } from './negotiation-requests.component';

describe('NegotiationRequestsComponent', () => {
  let component: NegotiationRequestsComponent;
  let fixture: ComponentFixture<NegotiationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegotiationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegotiationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
