import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShopInfo } from 'src/app/interface/shop-info';
import { ShopInfoService } from 'src/app/service/shop.service';
import { AreaMasterStore } from 'src/app/store/area-master-store';
import { ShopAreaStore } from 'src/app/store/shop-area-store';
import { ShopInfoStore } from 'src/app/store/shop-store';

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
    private readonly areaMasterStore: AreaMasterStore
  ) {}

  ngOnInit(): void {
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
