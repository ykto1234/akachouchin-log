import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AreaMaster } from '../interface/area-master';

@Injectable({
  providedIn: 'root',
})
export class AreaMasterStore {
  private _areaMasters = new BehaviorSubject<AreaMaster[]>([]);

  constructor() {}

  areaMasters$ = this._areaMasters.asObservable();

  get areaMasters(): AreaMaster[] {
    return this._areaMasters.getValue();
  }
  set areaMasters(value: AreaMaster[]) {
    this._areaMasters.next(value);
  }
}
