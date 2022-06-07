import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { ShopFeatureMaster } from '../interface/shop-feature-master';
import { ShopFeatureMasterStore } from '../store/shop-feature-master-store';

@Injectable({
  providedIn: 'root',
})
export class ShopFeatureMasterService {
  private version = environment.firestore.version;
  private versionDoc = this.afsCompact.collection('version').doc(this.version);

  constructor(
    private afsCompact: AngularFirestore,
    private shopFeatureMasterStore: ShopFeatureMasterStore
  ) {}

  getShopFeatureMasters(limit: number = 1000): void {
    const query = this.versionDoc.collection('shopFeatureMaster', (ref: any) =>
      ref.limit(limit)
    );
    query.get().subscribe((querySnapshot) => {
      const shopFeatureMasters = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const shopFeatureMaster: ShopFeatureMaster = { id: id, ...data };
        return shopFeatureMaster;
      });
      this.shopFeatureMasterStore.shopFeatureMasters =
        cloneDeep(shopFeatureMasters);
    });
  }
}
