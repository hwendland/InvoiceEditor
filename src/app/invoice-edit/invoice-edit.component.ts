import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Invoice } from '../invoice';
import { LineItem } from '../line-item';
import { InvoiceDataService } from '../invoice-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  listIndex: number;
  editMode = false;
  invoiceForm: FormGroup;

  constructor(
    private invoiceService: InvoiceDataService,
  ) { }

  ngOnInit() {
    this.editMode = true;
    this.listIndex = 0;
    this.initForm();
  }

  initForm() {
    let invoice = new Invoice();
    let lineItems = [];
    if (this.editMode) {
      invoice = this.invoiceService.getInvoice(this.listIndex);
      lineItems = invoice.lineItems.map((item: LineItem) => new FormGroup({
        name: new FormControl(item.name),
        description: new FormControl(item.description),
        quantity: new FormControl(item.quantity),
        priceEur: new FormControl(item.priceCents / 100),
      }));
    }
    this.invoiceForm = new FormGroup({
      customerId: new FormControl(invoice.customerId),
      customerName: new FormControl(invoice.customerName),
      customerContactPerson: new FormControl(invoice.customerContactPerson),
      customerAddress: new FormControl(invoice.customerAddress),
      customerZip: new FormControl(invoice.customerZip),
      customerCity: new FormControl(invoice.customerCity),
      iban: new FormControl(invoice.iban),
      bic: new FormControl(invoice.bic),
      accountOwner: new FormControl(invoice.accountOwner),
      mandateReference: new FormControl(invoice.mandateReference),
      mandateCity: new FormControl(invoice.mandateCity),
      mandateDate: new FormControl(invoice.mandateDate),
      mandateSignee: new FormControl(invoice.mandateSignee),
      invoiceNumber: new FormControl(invoice.invoiceNumber),
      invoiceDate: new FormControl(invoice.invoiceDate),
      invoicePeriod: new FormControl(invoice.invoicePeriod),
      invoiceDueDate: new FormControl(invoice.invoiceDueDate),
      lineItems: new FormArray(lineItems)
    });
  }
}
