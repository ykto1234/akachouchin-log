import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { ShopCategoryMaster } from 'src/app/interface/shop-category-master';
import { ShopCategoryMasterStore } from 'src/app/store/shop-category-master-store';

@Component({
  selector: 'app-search-condition-category',
  templateUrl: './search-condition-category.component.html',
  styleUrls: ['./search-condition-category.component.scss'],
})
export class SearchConditionCategoryComponent implements OnInit {
  shopCategoryMasters$ = this.shopCategoryMasterStore.shopCategoryMasters$;

  constructor(
    private readonly shopCategoryMasterStore: ShopCategoryMasterStore,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  searchByGenre(genreId: string | undefined) {
    if (!genreId) {
      return;
    }
    const queryParams = {
      genreId: genreId,
    };
    this._router.navigate(['genre-list'], {
      queryParams: queryParams,
    });
  }
}
