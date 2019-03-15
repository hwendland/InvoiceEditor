import { Injectable } from '@angular/core';
import { INVOICES } from './mock-data';
import { Subject } from 'rxjs';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  invoices = INVOICES;
  invoicesUpdated = new Subject<Invoice[]>();

  constructor() { }

  getInvoices() {
    return this.invoices.slice();
  }

  getInvoice(index: number) {
    return this.invoices[index];
  }

  get maxIndex() {
    return this.invoices.length - 1;
  }

  addInvoice(invoice: Invoice) {
    this.invoices.push(invoice);
    this.invoicesUpdated.next(this.invoices.slice());
  }

  deleteInvoice(index: number) {
    this.invoices.splice(index, 1);
    this.invoicesUpdated.next(this.invoices.slice());
  }

  updateInvoice(invoice: Invoice, index: number) {
    this.invoices[index] = invoice;
    this.invoicesUpdated.next(this.invoices.slice());
  }

  exportInvoices() {
    console.log(JSON.stringify(this.invoices));
  }

  importInvoices(input: string) {
    console.log(input);
  }
}
