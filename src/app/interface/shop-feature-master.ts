/** 店舗特徴マスタ情報 */
export interface ShopFeatureMaster {
  /** ドキュメントID */
  id: string;
  /** 特徴ID */
  featureId: string;
  /** 特徴名 */
  featureName: string;
  /** 更新日時 */
  updatedAt?: Date;
  /** 作成日時 */
  createdAt?: Date;
}
