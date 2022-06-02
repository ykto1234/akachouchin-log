import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShopInfo } from 'src/app/interface/shop-info';
import { ShopInfoService } from 'src/app/service/shop.service';
import { ShopInfoStore } from 'src/app/store/shop-store';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  shops: ShopInfo[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly shopInfoStore: ShopInfoStore,
    private shopInfoService: ShopInfoService
  ) {}

  ngOnInit(): void {
    this.shopInfoStore.shops$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((shops) => {
        console.log(shops);
        this.shops = shops;
      });
    this.shopInfoService.getShops();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }
}
