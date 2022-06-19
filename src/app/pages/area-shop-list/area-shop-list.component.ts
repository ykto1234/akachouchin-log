import { Component, OnInit } from '@angular/core';
import {
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { ShopListConstants } from 'src/app/constants/shop-list-constants';
import { ShopInfo } from 'src/app/interface/shop-info';
import { AreaMasterService } from 'src/app/service/area-master.service';
import { PrefectureMasterService } from 'src/app/service/prefecture-master.service';
import { ShopCategoryMasterService } from 'src/app/service/shop-category-master.service';
import { ShopFeatureMasterService } from 'src/app/service/shop-feature-master.service';
import { ShopInfoService } from 'src/app/service/shop.service';
import { AreaMasterStore } from 'src/app/store/area-master-store';
import { ShopAreaStore } from 'src/app/store/shop-area-store';

@Component({
  selector: 'app-area-shop-list',
  templateUrl: './area-shop-list.component.html',
  styleUrls: ['./area-shop-list.component.scss'],
})
export class AreaShopListComponent implements OnInit {
  shops$ = this.shopAreaStore.shopAreaInfo$;
  shops: ShopInfo[] = [];

  shopListConstants = ShopListConstants;

  pageIndex = 0;

  docSnapshots: QueryDocumentSnapshot<DocumentData>[] = [];
  firstVisibleSnapshot: QueryDocumentSnapshot<DocumentData> | null = null;
  lastVisibleSnapshot: QueryDocumentSnapshot<DocumentData> | null = null;

  areaName: string = '';
  areaCode: string = '';

  constructor(
    private _route: ActivatedRoute,
    private readonly shopInfoService: ShopInfoService,
    private readonly shopAreaStore: ShopAreaStore,
    private readonly areaMasterStore: AreaMasterStore,
    private readonly shopCategoryMasterService: ShopCategoryMasterService,
    private readonly prefectureMasterService: PrefectureMasterService,
    private readonly shopFeatureMasterService: ShopFeatureMasterService,
    private readonly areaMasterService: AreaMasterService
  ) {}

  ngOnInit(): void {
    this.shopCategoryMasterService.getShopCategoryMasters();
    this.prefectureMasterService.getPrefectureMasters();
    this.shopFeatureMasterService.getShopFeatureMasters();
    this.areaMasterService.getAreaMasters();

    this._route.queryParams.subscribe((params: Params) => {
      if (params['areaCode']) {
        this.areaCode = params['areaCode'];
        this.shopInfoService.getShopsByAreaCode(this.areaCode);
        this.areaName = this.getAreaName(this.areaCode);
      }
    });

    this.shopAreaStore.shopAreaInfo$.subscribe((x) => {
      console.log(x);
      if (x?.docSnapshots?.length ?? 0 > 0) {
        this.shops = x.shops ?? [];
        this.pageIndex = x.pageIndex ?? 0;
        this.docSnapshots = x.docSnapshots ?? [];
        this.firstVisibleSnapshot = this.docSnapshots[0];
        if (this.docSnapshots.length < ShopListConstants.pageCountLimit) {
          // 1ページ表示上限数より少ない表示の場合
          this.lastVisibleSnapshot =
            this.docSnapshots[this.docSnapshots.length - 1];
        } else {
          // 1ページ表示上限数より表示の場合
          this.lastVisibleSnapshot =
            this.docSnapshots[ShopListConstants.pageCountLimit - 1];
        }
      }
    });
  }

  getAreaName(areaCode: string) {
    const areaMaster = this.areaMasterStore.areaMasters.find(
      (x) => x.areaCode === areaCode
    );
    return areaMaster?.areaName ?? '';
  }

  prevPage(): void {
    this.pageIndex--;
    this.shopInfoService.getPrevShopsByAreaCode(this.pageIndex);
  }

  nextPage(): void {
    this.pageIndex++;
    this.shopInfoService.getNextShopsByAreaCode(
      this.areaCode,
      this.lastVisibleSnapshot,
      this.pageIndex,
      this.shops,
      this.docSnapshots,
      ShopListConstants.pageCountLimit
    );
  }

  disablesPrevPage(): boolean {
    if (!this.docSnapshots?.length) {
      return true;
    }
    return this.pageIndex === 0;
  }

  disablesNextPage(): boolean {
    if (!this.docSnapshots?.length) {
      return true;
    }
    return (
      this.docSnapshots.length <=
      ShopListConstants.pageCountLimit * (this.pageIndex + 1)
    );
  }
}
