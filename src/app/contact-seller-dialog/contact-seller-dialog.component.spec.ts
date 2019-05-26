import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSellerDialogComponent } from './contact-seller-dialog.component';

describe('ContactSellerDialogComponent', () => {
  let component: ContactSellerDialogComponent;
  let fixture: ComponentFixture<ContactSellerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSellerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
