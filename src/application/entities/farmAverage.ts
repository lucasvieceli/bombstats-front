export interface FarmAverage {
  id: string;
  walletId: string;
  totalHours: number;
  totalSeconds: number;
  startDate: string;
  endDate: string;
  mapsTotal: number;
  mapsAverage: number;
  tokensList?: TokensListEntity[] | null;
  tokensAverage?: TokensAverageEntity[] | null;
  createdAt: string;
  updatedAt: string;
}
export interface TokensListEntity {
  type: number;
  total: number;
}
export interface TokensAverageEntity {
  type: number;
  value: number;
}
