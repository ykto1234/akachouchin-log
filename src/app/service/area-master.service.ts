import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { AreaConstants } from '../constants/area-constants';
import { AreaMasterStore } from '../store/area-master-store';

@Injectable({
  providedIn: 'root',
})
export class AreaMasterService {
  constructor(private areaMasterStore: AreaMasterStore) {}

  getAreaMasters(): void {
    this.areaMasterStore.areaMasters = cloneDeep(AreaConstants.areaMasters);
  }
}
