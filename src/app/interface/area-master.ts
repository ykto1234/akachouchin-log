/** エリアマスタ情報 */
export interface AreaMaster {
  /** ドキュメントID */
  id?: string;
  /** 都道府県コード */
  prefectureCode: string;
  /** エリアコード */
  areaCode: string;
  /** エリア名 */
  areaName: string;
  /** 更新日時 */
  updatedAt?: Date;
  /** 作成日時 */
  createdAt?: Date;
}
