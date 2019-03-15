import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice';
import { InvoiceDataService } from '../invoice-data.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[];

  constructor(private dataService: InvoiceDataService) { }

  ngOnInit() {
    this.invoices = this.dataService.getInvoices();
  }

  getNetTotal() {
    return this.invoices
      .map(invoice => invoice.totalEur())
      .reduce((prev, current) => prev + current);
  }

}
