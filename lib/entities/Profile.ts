import { Item } from './Item';

export interface Profile {
  id: string;
  name: string;
  balance: {
    total: number;
    spent: number;
    current: number;
  };
  stocks: {
    correct: number;
    failed: number;
    streak: number;
  };
  time: number;
  items: Item[];
}
