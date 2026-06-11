import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHistory } from './company-history';

describe('CompanyHistory', () => {
  let component: CompanyHistory;
  let fixture: ComponentFixture<CompanyHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
