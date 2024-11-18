import { Stock } from './Stock';

export interface Session {
  speed: number;
  multiplicator: number;
  stocks: Stock[];
}
