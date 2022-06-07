import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ShopInfo } from 'src/app/interface/shop-info';
import { InstagramDOMService } from 'src/app/service/instagram-dom.service';
import { PrefectureMasterStore } from 'src/app/store/prefecture-master-store';
import { ShopCategoryMasterStore } from 'src/app/store/shop-category-master-store';
import { ShopFeatureMasterStore } from 'src/app/store/shop-feature-master-store';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit, AfterViewInit {
  @Input()
  shop!: ShopInfo;

  @Input()
  isDisplayImage = false;

  sanitizedHtml: SafeHtml = '';

  constructor(
    private domSanitizer: DomSanitizer,
    private instagram: InstagramDOMService,
    private readonly shopCategoryMasterStore: ShopCategoryMasterStore,
    private readonly prefectureMasterStore: PrefectureMasterStore,
    private readonly shopFeatureMasterStore: ShopFeatureMasterStore
  ) {}

  ngOnInit(): void {
    this.sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.shop?.shopImageHtml
    );
  }

  ngAfterViewInit(): void {
    this.instagram.processEmbeddedInstagramPosts();
  }

  getShopGenreName(shopGenreId: string) {
    const shopCategoryMaster =
      this.shopCategoryMasterStore.shopCategoryMasters.find(
        (x) => x.genreId === shopGenreId
      );
    return shopCategoryMaster?.genreName ?? '';
  }

  getPrefectureName(prefectureCode: string) {
    const prefectureMaster = this.prefectureMasterStore.prefectureMasters.find(
      (x) => x.prefectureCode === prefectureCode
    );
    return prefectureMaster?.prefectureName ?? '';
  }

  getFeatureName(featureId: string) {
    const prefectureMaster =
      this.shopFeatureMasterStore.shopFeatureMasters.find(
        (x) => x.featureId === featureId
      );
    return prefectureMaster?.featureName ?? '';
  }
}
