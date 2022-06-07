import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ShopInfo } from '../interface/shop-info';

export interface ShopAreaState {
  shops: ShopInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class ShopAreaStore extends ComponentStore<ShopAreaState> {
  readonly shopAreaInfo$: Observable<ShopInfo[]> = this.select(
    (state) => state.shops
  );
  readonly update = this.updater((_, shops: ShopInfo[]) => ({
    shops,
  }));

  constructor() {
    super({ shops: [] });
  }
}
