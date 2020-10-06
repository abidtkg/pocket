import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IInvoice } from 'src/app/Interfaces/Invoice';
import { InvoiceService } from 'src/app/services/customar/invoice.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit {

  public invoice: IInvoice;

  constructor(
    private titleService: Title,
    private Invoice: InvoiceService,
    private activeRoute: ActivatedRoute,
    private loadingBar: LoadingBarService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.loadingBar.start();
    const invoiceId = this.activeRoute.snapshot.paramMap.get('id');
    this.titleService.setTitle('Loading...');
    this.Invoice.single(invoiceId)
    .subscribe(data => {
      this.invoice = data;
      this.titleService.setTitle(this.invoice.projectName);
      // tslint:disable-next-line: deprecation
      this.loadingBar.complete();
    });
  }
}
