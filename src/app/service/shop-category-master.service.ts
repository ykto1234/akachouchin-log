import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ShopCategoryMaster } from '../interface/shop-category-master';
import { ShopCategoryMasterStore } from '../store/shop-category-master-store';

@Injectable({
  providedIn: 'root',
})
export class ShopCategoryMasterService {
  private version = environment.firestore.version;
  private versionDoc = this.afsCompact.collection('version').doc(this.version);

  constructor(
    private afsCompact: AngularFirestore,
    private shopCategoryMasterStore: ShopCategoryMasterStore
  ) {}

  async getShopCategoryMasters(
    limit: number = 1000
  ): Promise<ShopCategoryMaster[]> {
    const query = this.versionDoc.collection('shopCategoryMaster', (ref: any) =>
      ref.limit(limit)
    );
    const snapShots = await query.get();
    if (!snapShots) {
      return [];
    }
    let shopCategoryMasters: ShopCategoryMaster[] = [];
    await snapShots.forEach((snapShot) => {
      shopCategoryMasters = snapShot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shopCategoryMaster: ShopCategoryMaster = { id: id, ...data };
        return shopCategoryMaster;
      });
    });

    this.shopCategoryMasterStore.shopCategoryMasters =
      cloneDeep(shopCategoryMasters);
    return shopCategoryMasters;
  }
}
