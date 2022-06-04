import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ShopInfo } from 'src/app/interface/shop-info';
import { InstagramDOMService } from 'src/app/service/instagram-dom.service';
import { ShopCategoryMasterStore } from 'src/app/store/shop-category-master-store';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit, AfterViewInit {
  @Input()
  shop!: ShopInfo;

  @Input()
  isDisplayImage = true;

  sanitizedHtml: SafeHtml = '';

  constructor(
    private domSanitizer: DomSanitizer,
    private instagram: InstagramDOMService,
    private readonly shopCategoryMasterStore: ShopCategoryMasterStore
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
}
