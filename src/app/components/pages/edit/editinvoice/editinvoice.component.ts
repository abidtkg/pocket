import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/customar/invoice.service';
import { countryList } from 'src/app/db/Country';
import { IInvoice } from 'src/app/Interfaces/Invoice';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-editinvoice',
  templateUrl: './editinvoice.component.html',
  styleUrls: ['./editinvoice.component.scss']
})
export class EditinvoiceComponent implements OnInit {

  public countries = countryList;
  public invoice: IInvoice;

  // Get Data
  public invoiceId: string;
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
    private ActiveRoute: ActivatedRoute,
    private toaster: ToastrService,
    private loadingBar: LoadingBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.loadingBar.start();
    this.titleService.setTitle('Loading Invoice...');
    const invoiceId = this.ActiveRoute.snapshot.paramMap.get('id');
    this.Invoice.single(invoiceId)
    .subscribe(data => {
      this.titleService.setTitle(data.projectName);
      this.invoiceId = data._id;
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
      // tslint:disable-next-line: deprecation
      this.loadingBar.complete();
    });
  }

  // tslint:disable-next-line: typedef
  updateInvoice(){
    // tslint:disable-next-line: deprecation
    this.loadingBar.start();
    const invoice = {
      name: this.getName,
      email: this.getEmail,
      phone: this.getPhone,
      projectName: this.getProjectName,
      projectDetiles: this.getProjectDetiles,
      status: this.getStatus,
      country: this.getCountry,
      amount: this.getAmount,
      paid: this.getPaid,
      note: this.getNote
    };

    this.Invoice.update(this.invoiceId, invoice)
    .subscribe(data => {
      this.toaster.success('Invoice Updated');
      // tslint:disable-next-line: deprecation
      this.loadingBar.complete();
      const path = `/invoice/view/${this.invoiceId}`;
      this.router.navigate([path]);
    }, (error) => {
      this.toaster.error('Invoice Not Saved');
      // tslint:disable-next-line: deprecation
      this.loadingBar.complete();
    });
  }

}
