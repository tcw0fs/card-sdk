export type ITEM_TIME = 'time';
export type ITEM_MULTIPLICATOR = 'multiplicator';
export type ITEM_AUTO = 'auto';
export type ITEM_SAVE = 'save';

export interface Item {
  category: ITEM_TIME | ITEM_MULTIPLICATOR | ITEM_SAVE | ITEM_SAVE;
  price: number;
  alowedMax: number;
}
