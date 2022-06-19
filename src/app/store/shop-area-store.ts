import { Injectable } from '@angular/core';
import {
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ShopInfo } from '../interface/shop-info';

export interface ShopAreaState {
  shops?: ShopInfo[];
  docSnapshots?: QueryDocumentSnapshot<DocumentData>[];
  pageIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShopAreaStore extends ComponentStore<ShopAreaState> {
  readonly shopAreaInfo$: Observable<{
    shops?: ShopInfo[];
    docSnapshots?: QueryDocumentSnapshot<DocumentData>[];
    pageIndex?: number;
  }> = this.select((state) => {
    return {
      shops: state.shops,
      docSnapshots: state.docSnapshots,
      pageIndex: state.pageIndex,
    };
  });
  readonly update = this.updater(
    (
      _,
      value: {
        shops: ShopInfo[];
        docSnapshots: QueryDocumentSnapshot<DocumentData>[];
        pageIndex: number;
      }
    ) => ({
      shops: value.shops,
      docSnapshots: value.docSnapshots,
      pageIndex: value.pageIndex,
    })
  );

  readonly pageUpdate = this.updater(
    (
      _,
      value: {
        pageIndex: number;
      }
    ) => ({
      shops: _.shops,
      docSnapshots: _.docSnapshots,
      pageIndex: value.pageIndex,
    })
  );

  constructor() {
    super({ shops: [], docSnapshots: [], pageIndex: 0 });
  }
}
