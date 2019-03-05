import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLeadsComponent } from './sales-leads.component';

describe('SalesLeadsComponent', () => {
  let component: SalesLeadsComponent;
  let fixture: ComponentFixture<SalesLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
