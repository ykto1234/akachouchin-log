import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PrefectureMasterService } from 'src/app/service/prefecture-master.service';
import { ShopCategoryMasterService } from 'src/app/service/shop-category-master.service';
import { ShopFeatureMasterService } from 'src/app/service/shop-feature-master.service';
import { ShopInfoService } from 'src/app/service/shop.service';
import { ShopCategoryMasterStore } from 'src/app/store/shop-category-master-store';
import { ShopGenreStore } from 'src/app/store/shop-genre-store';

@Component({
  selector: 'app-genre-shop-list',
  templateUrl: './genre-shop-list.component.html',
  styleUrls: ['./genre-shop-list.component.scss'],
})
export class GenreShopListComponent implements OnInit {
  shops$ = this.shopGenreStore.shopGnereInfo$;

  genreId: string = '';
  genreName: string = '';

  constructor(
    private _route: ActivatedRoute,
    private readonly shopInfoService: ShopInfoService,
    private readonly shopGenreStore: ShopGenreStore,
    private readonly shopCategoryMasterStore: ShopCategoryMasterStore,
    private readonly shopCategoryMasterService: ShopCategoryMasterService,
    private readonly prefectureMasterService: PrefectureMasterService,
    private readonly shopFeatureMasterService: ShopFeatureMasterService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.shopCategoryMasterService.getShopCategoryMasters();
    this.prefectureMasterService.getPrefectureMasters();
    this.shopFeatureMasterService.getShopFeatureMasters();

    this._route.queryParams.subscribe((params: Params) => {
      if (params['genreId']) {
        this.genreId = params['genreId'];
        this.shopInfoService.getShopsByGenreId(this.genreId);
        this.genreName = this.getGenreName(this.genreId);
      }
    });
  }

  getGenreName(genreId: string) {
    const shopCategoryMaster =
      this.shopCategoryMasterStore.shopCategoryMasters.find(
        (x) => x.genreId === genreId
      );
    return shopCategoryMaster?.genreName ?? '';
  }
}
