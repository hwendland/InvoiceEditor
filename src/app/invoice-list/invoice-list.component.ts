import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice';
import { INVOICES } from '../mock-data';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[];

  constructor() { }

  ngOnInit() {
    this.invoices = INVOICES;  // TODO: get from data service
  }

  getNetTotal() {
    return this.invoices
      .map(invoice => invoice.totalEur())
      .reduce((prev, current) => prev + current);
  }

}
