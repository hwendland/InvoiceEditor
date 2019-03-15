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
    public mandateDate: string = '',
    public mandateSignee: string = '',
    public invoiceNumber: string = '',
    public invoicePeriod: string = '',
    public invoiceDate: string = '',
    public invoiceDueDate: string = '',
    public lineItems: LineItem[] = [],
  ) {}

  static decode(object: Invoice): Invoice {
    console.log(object);
    let invoice = Object.create(Invoice.prototype);
    invoice = Object.assign(invoice, object, {
      lineItems: object.lineItems ? object.lineItems.map(item => LineItem.decode(item)) : [],
    });
    console.log(invoice);
    return invoice;
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
