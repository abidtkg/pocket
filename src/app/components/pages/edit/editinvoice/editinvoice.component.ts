import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InvoiceService } from 'src/app/services/customar/invoice.service';

@Component({
  selector: 'app-editinvoice',
  templateUrl: './editinvoice.component.html',
  styleUrls: ['./editinvoice.component.scss']
})
export class EditinvoiceComponent implements OnInit {

  constructor(
    private titleService: Title,
    private Invoice: InvoiceService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Loading Invoice...');
  }

}
