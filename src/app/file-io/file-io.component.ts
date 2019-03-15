import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-io',
  templateUrl: './file-io.component.html',
  styleUrls: ['./file-io.component.css']
})
export class FileIoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onImport() { // call data service
    prompt('Neue Rechnungen als JSON hinzufügen:');
  }

  onExport() { // call data service
  }

}
