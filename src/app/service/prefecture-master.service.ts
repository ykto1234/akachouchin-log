import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { cloneDeep } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { PrefectureMaster } from '../interface/prefecture-master';
import { PrefectureMasterStore } from '../store/prefecture-master-store';

@Injectable({
  providedIn: 'root',
})
export class PrefectureMasterService {
  private version = environment.firestore.version;
  private versionDoc = this.afsCompact.collection('version').doc(this.version);

  constructor(
    private afsCompact: AngularFirestore,
    private prefectureMasterStore: PrefectureMasterStore
  ) {}

  getPrefectureMasters(limit: number = 1000): void {
    const query = this.versionDoc.collection('prefectureMaster', (ref: any) =>
      ref.limit(limit)
    );
    query.get().subscribe((querySnapshot) => {
      const prefectureMasters = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data: any = doc.data();
        const prefectureMaster: PrefectureMaster = { id: id, ...data };
        return prefectureMaster;
      });
      this.prefectureMasterStore.prefectureMasters =
        cloneDeep(prefectureMasters);
    });
  }
}
