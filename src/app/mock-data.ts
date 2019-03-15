import { Invoice } from './invoice';
import { LineItem } from './line-item';

const LINEITEMS = [
  new LineItem(
    'Starter',
    'Digitales Bonussystem\nPOS Terminal\nKundenauswertungen Neukundenangebote\nErstellen und Versenden von Kampagnen',
    2, 7900
  ),
  new LineItem(
    'Service',
    'Persönlicher Kundenservice',
    2, 1990,
  )
];

export const INVOICES = [
  new Invoice(
    74,
    'Coffee Fellows',
    'Alexandra Muß',
    'Hanauer Landstraße 110', '60313', 'Frankfurt am Main',
    'DE1234556787879', 'KARSDEXXX', 'CF Frankfurt GmbH',
    'LSM20170711', 'Frankfurt am Main', new Date('2017-02-23'), 'Alexandra Muß',
    'R201706018', 'Juni 2017', new Date('2017-07-03'), new Date('2017-07-07'),
    LINEITEMS
  ),
  new Invoice( 75, 'Best Worscht'),
  new Invoice( 76, 'Sandwicher'),
  new Invoice( 77, 'What the Food'),
  new Invoice( 78, 'Struwwelpeter'),
  new Invoice(79, 'Aries Fashion'),
];

