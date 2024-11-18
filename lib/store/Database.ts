export const TEST_KEY = `fools-money-core-test-key-${+new Date()}`;
export const DATABASE_KEY = 'fools-money-core';
export interface Database {
  isAvailable(): boolean;
  write(state: State): Promise<void>;
  read(): Promise<Partial<State>>;
}
export interface State {
  money: [];
}
