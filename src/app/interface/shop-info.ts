/** 店舗情報 */
export interface ShopInfo {
  /** ドキュメントID */
  id: string;
  /** 店舗名 */
  shopName: string;
  /** 店舗画像埋め込みHTMLタグ */
  shopImageHtml: string;
  /** 価格（下限） */
  lowerPrice?: number;
  /** 価格（上限） */
  upperPrice?: number;
  /** 評価点数 */
  valuationRates?: number;
  /** 食べログURL */
  tabelogUrl?: string;
  /** 県名 */
  prefectureName?: string;
  /** 店舗ジャンルIDリスト */
  shopGenreIds: string[];
  /** 更新日時 */
  updatedAt?: Date;
  /** 作成日時 */
  createdAt?: Date;
}
