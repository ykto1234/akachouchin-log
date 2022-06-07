import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConditionPrefectureComponent } from './search-condition-prefecture.component';

describe('SearchConditionPrefectureComponent', () => {
  let component: SearchConditionPrefectureComponent;
  let fixture: ComponentFixture<SearchConditionPrefectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchConditionPrefectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConditionPrefectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
