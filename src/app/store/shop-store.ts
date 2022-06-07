import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopInfo } from '../interface/shop-info';

@Injectable({
  providedIn: 'root',
})
export class ShopInfoStore {
  private _shops = new BehaviorSubject<ShopInfo[]>([]);
  private _newShops = new BehaviorSubject<ShopInfo[]>([]);
  private _areaShops = new BehaviorSubject<ShopInfo[]>([]);

  constructor() {}

  shops$ = this._shops.asObservable();
  newShops$ = this._newShops.asObservable();
  areaShops$ = this._areaShops.asObservable();

  get shops(): ShopInfo[] {
    return this._shops.getValue();
  }
  set shops(value: ShopInfo[]) {
    this._shops.next(value);
  }

  get newShops(): ShopInfo[] {
    return this._newShops.getValue();
  }
  set newShops(value: ShopInfo[]) {
    this._newShops.next(value);
  }

  get areaShops(): ShopInfo[] {
    return this._areaShops.getValue();
  }
  set areaShops(value: ShopInfo[]) {
    this._areaShops.next(value);
  }
}
