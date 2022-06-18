import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreShopListComponent } from './genre-shop-list.component';

describe('GenreShopListComponent', () => {
  let component: GenreShopListComponent;
  let fixture: ComponentFixture<GenreShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreShopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
