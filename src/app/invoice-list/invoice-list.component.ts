import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '../invoice';
import { InvoiceDataService } from '../invoice-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  invoices: Invoice[];
  invoiceSubscription: Subscription;

  constructor(private dataService: InvoiceDataService) { }

  ngOnInit() {
    this.invoices = this.dataService.getInvoices();
    this.invoiceSubscription = this.dataService.invoicesUpdated.subscribe(value => this.invoices = value );
  }

  ngOnDestroy(): void {
    this.invoiceSubscription.unsubscribe();
  }

  getNetTotal() {
    return this.invoices
      .map(invoice => invoice.totalEur())
      .reduce((prev, current) => prev + current);
  }

}
