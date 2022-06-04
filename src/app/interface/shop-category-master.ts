/** 店舗カテゴリマスタ情報 */
export interface ShopCategoryMaster {
  /** ドキュメントID */
  id: string;
  /** カテゴリID */
  categoryId: string;
  /** カテゴリ名 */
  categoryName: string;
  /** ジャンルID */
  genreId: string;
  /** ジャンル名 */
  genreName: string;
  /** 更新日時 */
  updatedAt?: Date;
  /** 作成日時 */
  createdAt?: Date;
}
