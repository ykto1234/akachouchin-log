import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaShopListComponent } from './area-shop-list.component';

describe('AreaShopListComponent', () => {
  let component: AreaShopListComponent;
  let fixture: ComponentFixture<AreaShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaShopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
