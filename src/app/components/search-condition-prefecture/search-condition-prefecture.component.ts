import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaMasterStore } from 'src/app/store/area-master-store';
import { PrefectureMasterStore } from 'src/app/store/prefecture-master-store';

@Component({
  selector: 'app-search-condition-prefecture',
  templateUrl: './search-condition-prefecture.component.html',
  styleUrls: ['./search-condition-prefecture.component.scss'],
})
export class SearchConditionPrefectureComponent implements OnInit {
  prefectureAreas: {
    prefectureName: string;
    areas: { areaCode: string; areaName: string }[];
  }[] = [];

  constructor(
    private readonly prefectureMasterStore: PrefectureMasterStore,
    private readonly areaMasterStore: AreaMasterStore,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.areaMasterStore.areaMasters.map((areaMaster) => {
      const prefectureName = this.getPrefectureName(areaMaster.prefectureCode);
      const index = this.prefectureAreas.findIndex(
        (x) => x.prefectureName === prefectureName
      );
      if (index === -1) {
        this.prefectureAreas.push({
          prefectureName: prefectureName,
          areas: [
            { areaCode: areaMaster.areaCode, areaName: areaMaster.areaName },
          ],
        });
      } else {
        this.prefectureAreas[index].areas.push({
          areaCode: areaMaster.areaCode,
          areaName: areaMaster.areaName,
        });
      }
    });
  }

  getPrefectureName(prefectureCode: string) {
    const prefectureMaster = this.prefectureMasterStore.prefectureMasters.find(
      (x) => x.prefectureCode === prefectureCode
    );
    return prefectureMaster?.prefectureName ?? '';
  }

  searchByArea(areaCode: string | undefined) {
    if (!areaCode) {
      return;
    }
    const queryParams = {
      areaCode: areaCode,
    };
    this._router.navigate(['area-list'], {
      queryParams: queryParams,
    });
  }
}
