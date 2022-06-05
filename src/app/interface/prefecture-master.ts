/** 都道府県マスタ情報 */
export interface PrefectureMaster {
  /** ドキュメントID */
  id: string;
  /** 都道府県コード */
  prefectureCode: string;
  /** 都道府県名 */
  prefectureName: string;
  /** 更新日時 */
  updatedAt?: Date;
  /** 作成日時 */
  createdAt?: Date;
}
