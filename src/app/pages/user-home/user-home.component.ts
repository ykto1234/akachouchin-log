import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShopInfo } from 'src/app/interface/shop-info';
import { AreaMasterService } from 'src/app/service/area-master.service';
import { PrefectureMasterService } from 'src/app/service/prefecture-master.service';
import { ShopCategoryMasterService } from 'src/app/service/shop-category-master.service';
import { ShopFeatureMasterService } from 'src/app/service/shop-feature-master.service';
import { ShopInfoService } from 'src/app/service/shop.service';
import { ShopInfoStore } from 'src/app/store/shop-store';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  newShops: ShopInfo[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly shopInfoStore: ShopInfoStore,
    private readonly shopInfoService: ShopInfoService,
    private readonly shopCategoryMasterService: ShopCategoryMasterService,
    private readonly prefectureMasterService: PrefectureMasterService,
    private readonly shopFeatureMasterService: ShopFeatureMasterService,
    private readonly areaMasterService: AreaMasterService
  ) {}

  ngOnInit(): void {
    this.shopInfoStore.newShops$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((shops) => {
        this.newShops = shops;
      });
    this.shopInfoService.getNewShops();
    this.shopCategoryMasterService.getShopCategoryMasters();
    this.prefectureMasterService.getPrefectureMasters();
    this.shopFeatureMasterService.getShopFeatureMasters();
    this.areaMasterService.getAreaMasters();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }
}
