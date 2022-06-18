import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  areaName: string = '';

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
        const areaCode = params['areaCode'];
        this.shopInfoService.getShopsByAreaCode(areaCode);
        this.areaName = this.getAreaName(areaCode);
      }
    });
  }

  getAreaName(areaCode: string) {
    const areaMaster = this.areaMasterStore.areaMasters.find(
      (x) => x.areaCode === areaCode
    );
    return areaMaster?.areaName ?? '';
  }
}
