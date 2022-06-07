import { AreaMaster } from '../interface/area-master';

export class AreaConstants {
  /** 都道府県マスタ情報 */
  public static readonly areaMasters: AreaMaster[] = [
    { prefectureCode: '13', areaCode: '1300001', areaName: '新宿' },
    { prefectureCode: '13', areaCode: '1300002', areaName: '恵比寿' },
    { prefectureCode: '13', areaCode: '1300003', areaName: '五反田' },
    { prefectureCode: '13', areaCode: '1300004', areaName: '北千住' },
    { prefectureCode: '13', areaCode: '1300005', areaName: '亀戸・平井' },
    { prefectureCode: '13', areaCode: '1300006', areaName: '高田馬場' },
    { prefectureCode: '13', areaCode: '1300007', areaName: '大久保' },
    { prefectureCode: '13', areaCode: '1300008', areaName: '赤坂・永田町・溜池' },
    { prefectureCode: '14', areaCode: '1400001', areaName: '溝の口' },
  ];
}
