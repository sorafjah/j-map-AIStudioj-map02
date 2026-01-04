
export interface PrefectureData {
  name: string;
  spots: string[];
  foods: string[];
}

export type PrefectureMap = Record<string, PrefectureData>;
