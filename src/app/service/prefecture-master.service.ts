import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { PrefectureConstants } from '../constants/prefrcture-constants';
import { PrefectureMasterStore } from '../store/prefecture-master-store';

@Injectable({
  providedIn: 'root',
})
export class PrefectureMasterService {
  constructor(
    private prefectureMasterStore: PrefectureMasterStore
  ) {}

  getPrefectureMasters(): void {
    this.prefectureMasterStore.prefectureMasters = cloneDeep(
      PrefectureConstants.prefectureMasters
    );
  }
}
