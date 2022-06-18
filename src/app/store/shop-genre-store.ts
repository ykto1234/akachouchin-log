import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ShopInfo } from '../interface/shop-info';

export interface ShopGenreState {
  shops: ShopInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class ShopGenreStore extends ComponentStore<ShopGenreState> {
  readonly shopGnereInfo$: Observable<ShopInfo[]> = this.select(
    (state) => state.shops
  );
  readonly update = this.updater((_, shops: ShopInfo[]) => ({
    shops,
  }));

  constructor() {
    super({ shops: [] });
  }
}
