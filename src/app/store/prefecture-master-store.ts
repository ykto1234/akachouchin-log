import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrefectureMaster } from '../interface/prefecture-master';

@Injectable({
  providedIn: 'root',
})
export class PrefectureMasterStore {
  private _prefectureMasters = new BehaviorSubject<PrefectureMaster[]>([]);

  constructor() {}

  prefectureMasters$ = this._prefectureMasters.asObservable();

  get prefectureMasters(): PrefectureMaster[] {
    return this._prefectureMasters.getValue();
  }
  set prefectureMasters(value: PrefectureMaster[]) {
    this._prefectureMasters.next(value);
  }
}
