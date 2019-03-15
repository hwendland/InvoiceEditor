import { Injectable } from '@angular/core';
import { INVOICES } from './mock-data';
import { Subject } from 'rxjs';
import { Invoice } from './invoice';
import { LineItem } from './line-item';
import { Router } from '@angular/router';
import { convertToCamelCase } from 'ninjapiratica-case-converter';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  invoices = INVOICES;
  invoicesUpdated = new Subject<Invoice[]>();

  constructor(private router: Router) { }

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
    try {
      let invoices = JSON.parse(input);
      invoices = convertToCamelCase(invoices);
      invoices.map((object, index) => {
        const invoice = Invoice.decode(object);
        this.addInvoice(invoice);
        if (index === 0) { this.router.navigate(['/edit', this.maxIndex]); }
      });
    } catch (e) {
      console.log(e);
      alert('Unbekanntes Datenformat.');
    }
  }
}
