import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/services/customar/invoice.service';
import { countryList } from '../../../../db/Country';

@Component({
  selector: 'app-newinvoice',
  templateUrl: './newinvoice.component.html',
  styleUrls: ['./newinvoice.component.scss']
})
export class NewinvoiceComponent implements OnInit {

  // FORM DATA
  public getName = '';
  public getEmail = '';
  public getPhone = '';
  public getProjectName = '';
  public getProjectDetiles = '';
  public getStatus = '';
  public getCountry = '';
  public getAmount = 0;
  public getPaid = 0;

  public countries = countryList;

  constructor(
    private TitleService: Title,
    private Invoice: InvoiceService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.TitleService.setTitle('Create New Invoice');
  }

  // tslint:disable-next-line: typedef
  create(){
    const invoiceObject = {
      name: this.getName,
      email: this.getEmail,
      phone: this.getPhone,
      projectName: this.getProjectName,
      projectDetiles: this.getProjectDetiles,
      country: this.getCountry,
      status: this.getStatus,
      amount: this.getAmount,
      paid: this.getPaid
    };
    this.Invoice.create(invoiceObject)
    .subscribe(data => {
      this.toaster.success('Invoice Created');
    }, (error) => {
      this.toaster.error('Not Saved');
      console.log(error);
    });
  }
}
