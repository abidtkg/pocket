import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/customar/invoice.service';
import { countryList } from 'src/app/db/Country';
import { IInvoice } from 'src/app/Interfaces/Invoice';

@Component({
  selector: 'app-editinvoice',
  templateUrl: './editinvoice.component.html',
  styleUrls: ['./editinvoice.component.scss']
})
export class EditinvoiceComponent implements OnInit {

  public countries = countryList;
  public invoice: IInvoice;

  // Get Data
  public getName: string;
  public getEmail: string;
  public getPhone: string;
  public getProjectName: string;
  public getProjectDetiles: string;
  public getStatus: string;
  public getCountry: string;
  public getAmount: number;
  public getPaid: number;
  public getNote: string;

  constructor(
    private titleService: Title,
    private Invoice: InvoiceService,
    private ActiveRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Loading Invoice...');
    const invoiceId = this.ActiveRoute.snapshot.paramMap.get('id');
    this.Invoice.single(invoiceId)
    .subscribe(data => {
      this.titleService.setTitle(data.projectName);
      this.getName = data.name;
      this.getEmail = data.email;
      this.getPhone = data.phone;
      this.getProjectName = data.projectName;
      this.getProjectDetiles = data.projectDetiles;
      this.getStatus = data.status;
      this.getCountry = data.country;
      this.getAmount = data.amount;
      this.getPaid = data.paid;
      this.getNote = data.note;
    });
  }

}
