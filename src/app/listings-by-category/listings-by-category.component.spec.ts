import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsByCategoryComponent } from './listings-by-category.component';

describe('ListingsByCategoryComponent', () => {
  let component: ListingsByCategoryComponent;
  let fixture: ComponentFixture<ListingsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
