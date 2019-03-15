import { Component, OnInit } from '@angular/core';
import { InvoiceDataService } from '../invoice-data.service';

@Component({
  selector: 'app-file-io',
  templateUrl: './file-io.component.html',
  styleUrls: ['./file-io.component.css']
})
export class FileIoComponent implements OnInit {

  constructor(private dataService: InvoiceDataService) { }

  ngOnInit() {
  }

  onImport() {
    const input = prompt('Neue Rechnungen als JSON hinzufügen:');
    this.dataService.importInvoices(input);
  }

  onExport() {
    this.dataService.exportInvoices();
  }

}
