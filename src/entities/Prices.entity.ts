import { CTSearch } from 'src/types';
export type Prices = {
  shipID: number;
  departureDate: Date;
  accommodation: CTSearch;
  pax: Pax;
  bonus: Bonus;
};

enum Pax {
  adult,
  children,
  infant,
}

enum Bonus {
  retired,
  resident,
  largefamily,
}
