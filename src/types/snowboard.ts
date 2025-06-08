export type SnowboardStatus =
  | 'クリーニング前'
  | 'クリーニング済み'
  | '滑走ワックス済み'
  | '滑走準備完了';

export interface Snowboard {
  id: number;
  name: string;
  status: SnowboardStatus;
  createdAt: Date;
  updatedAt: Date;
}
