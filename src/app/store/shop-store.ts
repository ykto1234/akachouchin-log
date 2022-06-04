import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopInfo } from '../interface/shop-info';

@Injectable({
  providedIn: 'root',
})
export class ShopInfoStore {
  private _shops = new BehaviorSubject<ShopInfo[]>([]);

  constructor() {}

  shops$ = this._shops.asObservable();

  get shops(): ShopInfo[] {
    return this._shops.getValue();
  }
  set shops(value: ShopInfo[]) {
    this._shops.next(value);
  }
}
