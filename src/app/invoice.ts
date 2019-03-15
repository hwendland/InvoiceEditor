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

}
