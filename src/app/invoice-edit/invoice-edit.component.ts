import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Invoice } from '../invoice';
import { LineItem } from '../line-item';
import { InvoiceDataService } from '../invoice-data.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  listIndex: number;
  editMode = false;
  invoiceForm: FormGroup;
  formSubscription: Subscription;

  constructor(
    private invoiceService: InvoiceDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = +params.index <= this.invoiceService.maxIndex;
        if (+params.index > this.invoiceService.maxIndex) { this.router.navigate(['/']); }
        this.listIndex = this.editMode ? +params.index : this.invoiceService.maxIndex + 1;
        this.initForm();
        this.reassignSubscription();
      }
    );
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  reassignSubscription() {
    this.formSubscription = this.invoiceForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(
      val => {
        const lineItems = val.lineItems.map(item =>
          new LineItem(item.name, item.description, item.quantity, item.priceEur * 100)
        );
        // @ts-ignore
        const invoice = new Invoice(...Object.values(val)); // TODO: make more type safe
        invoice.lineItems = lineItems;
        this.onChanges(invoice);
      }
    );
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
        priceEur: new FormControl((item.priceCents / 100).toFixed(2)),
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

  onChanges(invoice: Invoice) {
    if (this.editMode) {
      this.invoiceService.updateInvoice(invoice, this.listIndex);
    } else {
      this.invoiceService.addInvoice(invoice);
      this.router.navigate(['/edit', this.listIndex]);
    }
  }

  onDeleteInvoice() {
    this.invoiceService.deleteInvoice(this.listIndex);
    this.router.navigate(['/']);
  }

  totalEur() {
    return this.invoiceForm.value.lineItems
      .map((item, index) => this.itemTotal(index))
      .reduce((prev, current) => prev + current);
  }

  itemTotal(i: number) {
    return this.invoiceForm.value.lineItems[i].quantity * this.invoiceForm.value.lineItems[i].priceEur;
  }

  onAddLineItem() {
    (this.invoiceForm.get('lineItems') as FormArray).push( new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      quantity: new FormControl(null),
      priceEur: new FormControl(null),
    }));
  }

  onDeleteLineItem(index: number) {
    (this.invoiceForm.get('lineItems') as FormArray).removeAt(index);
  }

  getRows(index: number) {
    const description = this.invoiceForm.value.lineItems[index].description;
    if (description) {
      const nLines = description.split('\n').length;
      return Math.min(nLines, 4);
    }
    return 1;
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
