import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ShopInfo } from '../interface/shop-info';
import { ShopAreaStore } from '../store/shop-area-store';
import { ShopGenreStore } from '../store/shop-genre-store';
import { ShopInfoStore } from '../store/shop-store';

@Injectable({
  providedIn: 'root',
})
export class ShopInfoService {
  private version = environment.firestore.version;
  private versionDoc = this.afsCompact.collection('version').doc(this.version);

  constructor(
    private afsCompact: AngularFirestore,
    private shopInfoStore: ShopInfoStore,
    private readonly shopAreaStore: ShopAreaStore,
    private readonly shopGenreStore: ShopGenreStore
  ) {}

  getShops(limit: number = 1000): void {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref.limit(limit)
    );
    query.get().subscribe((querySnapshot) => {
      const shops = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shop: ShopInfo = { id: id, ...data };
        return shop;
      });
      this.shopInfoStore.shops = cloneDeep(shops);
    });
  }

  async getShopsByAreaCode(
    areaCode: string,
    limit: number = 100
  ): Promise<ShopInfo[]> {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref
        .where('areaCode', '==', areaCode)
        .orderBy('valuationRates', 'desc')
        .limit(limit)
    );

    const snapShots = await query.get();
    if (!snapShots) {
      return [];
    }
    let shops: ShopInfo[] = [];
    let docSnapshots: QueryDocumentSnapshot<DocumentData>[] = [];
    await snapShots.forEach((snapShot) => {
      docSnapshots = cloneDeep(snapShot.docs);
      shops = snapShot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shop: ShopInfo = { id: id, ...data };
        return shop;
      });
    });
    this.shopAreaStore.update({
      shops: cloneDeep(shops),
      docSnapshots: docSnapshots,
      pageIndex: 0,
    });
    return shops;
  }

  async getNextShopsByAreaCode(
    areaCode: string,
    startAfter: QueryDocumentSnapshot<DocumentData> | null,
    pageIndex: number,
    shops: ShopInfo[],
    docSnapshots: QueryDocumentSnapshot<DocumentData>[],
    limit: number = 10
  ): Promise<ShopInfo[]> {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref
        .where('areaCode', '==', areaCode)
        .orderBy('valuationRates', 'desc')
        .startAfter(startAfter)
        .limit(limit + 1)
    );

    const snapShots = await query.get();
    if (!snapShots) {
      return [];
    }
    await snapShots.forEach((snapShot) => {
      docSnapshots.concat(cloneDeep(snapShot.docs));
      shops.concat(
        snapShot.docs.map((doc) => {
          const id = doc.id;
          const data: any = doc.data();
          const shop: ShopInfo = { id: id, ...data };
          return shop;
        })
      );
    });

    this.shopAreaStore.update({
      shops: cloneDeep(shops),
      docSnapshots: cloneDeep(docSnapshots),
      pageIndex: pageIndex,
    });
    return shops;
  }

  getPrevShopsByAreaCode(pageIndex: number): void {
    this.shopAreaStore.pageUpdate({
      pageIndex: pageIndex,
    });
    return;
  }

  getShopsByGenreId(genreId: string, limit: number = 1000): void {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref
        .where('genreIds', 'array-contains', genreId)
        .orderBy('valuationRates', 'desc')
        .limit(limit)
    );
    query.get().subscribe((querySnapshot) => {
      const shops = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shop: ShopInfo = { id: id, ...data };
        return shop;
      });
      this.shopGenreStore.update(cloneDeep(shops));
    });
  }

  getNewShops(limit: number = 1000): void {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref
        .where('isNewShop', '==', true)
        .orderBy('valuationRates', 'desc')
        .limit(limit)
    );
    query.get().subscribe((querySnapshot) => {
      const shops = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shop: ShopInfo = { id: id, ...data };
        return shop;
      });
      this.shopInfoStore.newShops = cloneDeep(shops);
    });
  }
}
