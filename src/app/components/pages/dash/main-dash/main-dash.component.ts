import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DashboardService } from '../../../../services/dash/dashboard.service';
import { InvoiceService } from '../../../../services/customar/invoice.service';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {

  public spinner = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

  public revenue: any;
  public invoices: any;
  public invoicesList: any;

  constructor(
    private title: Title,
    private dash: DashboardService,
    private invoice: InvoiceService
  ) { }

  ngOnInit(): void {
    this.revenue = this.spinner;
    this.invoices = this.spinner;
    this.title.setTitle('Dashboard - Admin Panel');
    this.dash.dashData()
    .subscribe(data => {
      this.revenue = `৳ ${data.revinue}`;
      this.invoices = data.projects;
    });

    this.invoice.get(0, 10)
    .subscribe(data => {
      this.invoicesList = data;
    });
  }

}
