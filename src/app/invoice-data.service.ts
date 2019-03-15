import { Injectable } from '@angular/core';
import { INVOICES } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  invoices = INVOICES;

  constructor() { }

  getInvoices() {
    return this.invoices.slice();
  }

  getInvoice(index: number) {
    return this.invoices[index];
  }

  exportInvoices() {
    console.log(JSON.stringify(this.invoices));
  }

  importInvoices(input: string) {
    console.log(input);
  }
}
