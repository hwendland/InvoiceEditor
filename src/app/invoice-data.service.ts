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

  exportInvoices() {
    console.log(JSON.stringify(this.invoices));
  }

  importInvoices(input: string) {
    console.log(input);
  }
}
