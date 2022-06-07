import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopFeatureMaster } from '../interface/shop-feature-master';

@Injectable({
  providedIn: 'root',
})
export class ShopFeatureMasterStore {
  private _shopFeatureMasterMasters = new BehaviorSubject<ShopFeatureMaster[]>([]);

  constructor() {}

  shopFeatureMaster$ = this._shopFeatureMasterMasters.asObservable();

  get shopFeatureMasters(): ShopFeatureMaster[] {
    return this._shopFeatureMasterMasters.getValue();
  }
  set shopFeatureMasters(value: ShopFeatureMaster[]) {
    this._shopFeatureMasterMasters.next(value);
  }
}
