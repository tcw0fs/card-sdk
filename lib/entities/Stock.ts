export type STOCK_GREEN = 'green';
export type STOCK_RED = 'red';
export type STOCK_UP = 'up';
export type STOCK_DOWN = 'down';

export interface Stock {
  type: STOCK_GREEN | STOCK_RED;
  price: STOCK_UP | STOCK_DOWN;
}
