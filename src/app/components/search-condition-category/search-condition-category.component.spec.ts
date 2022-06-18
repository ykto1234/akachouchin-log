import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConditionCategoryComponent } from './search-condition-category.component';

describe('SearchConditionCategoryComponent', () => {
  let component: SearchConditionCategoryComponent;
  let fixture: ComponentFixture<SearchConditionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchConditionCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConditionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
