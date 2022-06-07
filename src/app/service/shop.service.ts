import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ShopInfo } from '../interface/shop-info';
import { ShopInfoStore } from '../store/shop-store';

@Injectable({
  providedIn: 'root',
})
export class ShopInfoService {
  private version = environment.firestore.version;
  private versionDoc = this.afsCompact.collection('version').doc(this.version);

  constructor(
    private afsCompact: AngularFirestore,
    private shopInfoStore: ShopInfoStore
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

  getShopsByAreaCode(areaCode: string, limit: number = 1000): void {
    const query = this.versionDoc.collection('shops', (ref: any) =>
      ref
        .where('areaCode', '==', areaCode)
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
      this.shopInfoStore.areaShops = cloneDeep(shops);
    });
  }

  getNweShops(limit: number = 1000): void {
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
