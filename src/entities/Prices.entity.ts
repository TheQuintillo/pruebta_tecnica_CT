export type Prices = {
  shipID: number;
  departureDate: Date;
  accommodation: Accommodation;
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

enum Accommodation {
  Estandar,
  Confort,
  Premium,
}
