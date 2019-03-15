import { LineItem } from './line-item';

export class Invoice {

  constructor(
    public customerId: number = null,
    public customerName: string = '',
    public customerContactPerson: string = '',
    public customerAddress: string = '',
    public customerZip: string = '',
    public customerCity: string = '',
    public iban: string = '',
    public bic: string = '',
    public accountOwner: string = '',
    public mandateReference: string = '',
    public mandateCity: string = '',
    public mandateDate: Date = null,
    public mandateSignee: string = '',
    public invoiceNumber: string = '',
    public invoicePeriod: string = '',
    public invoiceDate: Date = null,
    public invoiceDueDate: Date = null,
    public lineItems: LineItem[] = [],
  ) {}

  static decode(object: Invoice): Invoice {
    let invoice = Object.create(Invoice.prototype);
    invoice = Object.assign(invoice, object, {
      lineItems: object.lineItems ? object.lineItems.map(item => LineItem.decode(item)) : [],
      mandateDate: this.dateParse(object.mandateDate),
      invoiceDate: this.dateParse(object.invoiceDate),
      invoiceDueDate: this.dateParse(object.invoiceDueDate)
    });
    return invoice;
  }

  static dateParse(date: string | Date | null) {
    if ( typeof date === 'string' && date.charAt(2) === '.') { // date format is German when parsing JSON
      const parts = date.split('.');
      return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    } else if ( typeof date === 'string' && date.charAt(4) === '-') { // value of invoice form contains UTC string
      return new Date(date);
    }
    return date;
  }

  static dateReplacer(key, value) { // convert back to German date string before exporting data
    if (value && ['invoiceDate', 'invoiceDueDate', 'mandateDate'].includes(key)) {
      return new Date(value.split('T')[0]).toLocaleDateString('de');
    }
    return value;
  }

  totalEur() {
    if (this.lineItems && this.lineItems.length ) {
      return this.lineItems
        .map(item => item.totalEur())
        .reduce((prev, current) => prev + current);
    }
    return 0;
  }
}
