export const initialUserPoints = { balance: 1250 };

export type HistoryItem = {
  id: number;
  date: string;
  type: "獲得" | "利用" | "ボーナス" | "その他";
  points: number;
  note?: string;
};

export const initialHistoryData: HistoryItem[] = [
  { id: 1, date: "2025-08-27", type: "獲得", points: 100, note: "キャンペーン" },
  { id: 2, date: "2025-08-26", type: "利用", points: -50, note: "ギフト交換" },
  { id: 3, date: "2025-08-25", type: "獲得", points: 200, note: "来店ボーナス" },
];

// 現在値（ユーザー操作で更新される）
export const userPoints = { ...initialUserPoints };
export const historyData: HistoryItem[] = [...initialHistoryData];
