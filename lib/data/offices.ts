export interface Office {
  badge: string;
  city: string;
  region: string;
  address: string;
}

export const offices: Office[] = [
  {
    badge: '\u2605 \u00A0 Principal Office',
    city: 'New Delhi',
    region: 'Head Chambers',
    address: '65, Jai Apartment\n102, I.P. Extension, Patparganj\nNew Delhi \u2014 110092',
  },
  {
    badge: 'Office 02',
    city: 'Agra',
    region: 'Uttar Pradesh',
    address: '5/7/2/B-3, Kaveri Center\nSanjay Palace\nAgra \u2014 282002',
  },
  {
    badge: 'Office 03',
    city: 'Bangalore',
    region: 'Karnataka',
    address: '8, 21st Main, 9th Cross\nIndiranagar 1st Stage\nBangalore \u2014 560038',
  },
];

// Compact version for the card page
export interface CardOffice {
  city: string;
  sub: string;
  address: string;
  full?: boolean;
}

export const cardOffices: CardOffice[] = [
  {
    city: 'New Delhi',
    sub: 'Head Office',
    address: '65, Jai Apartment,\n102, I.P. Extension,\nPatparganj \u2013 110092',
  },
  {
    city: 'Agra',
    sub: 'Uttar Pradesh',
    address: '5/7/2/B-3,\nKaveri Center,\nSanjay Palace \u2013 282002',
  },
  {
    city: 'Bangalore',
    sub: 'Karnataka',
    address: '8, 2nd Main, 9th Cross, Indiranagar 1st Stage \u2013 560038',
    full: true,
  },
];
