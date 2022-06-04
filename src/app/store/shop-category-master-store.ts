import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopCategoryMaster } from '../interface/shop-category-master';

@Injectable({
  providedIn: 'root',
})
export class ShopCategoryMasterStore {
  private _shopCategoryMasters = new BehaviorSubject<ShopCategoryMaster[]>([]);

  constructor() {}

  shops$ = this._shopCategoryMasters.asObservable();

  get shopCategoryMasters(): ShopCategoryMaster[] {
    return this._shopCategoryMasters.getValue();
  }
  set shopCategoryMasters(value: ShopCategoryMaster[]) {
    this._shopCategoryMasters.next(value);
  }
}
