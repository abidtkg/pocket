import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DashboardService } from '../../../../services/dash/dashboard.service';
import { InvoiceService } from '../../../../services/customar/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { IInvoice } from '../../../../Interfaces/Invoice';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/services/dash/analytics.service';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {

  public spinner = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

  public revenue: any;
  public invoices: any;
  public showInvoices: any;

  public earningLables: [];
  public earningData: [];

  constructor(
    private title: Title,
    private dash: DashboardService,
    private invoice: InvoiceService,
    private toaster: ToastrService,
    private loadingBar: LoadingBarService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.loadingBar.start();
    this.revenue = this.spinner;
    this.invoices = this.spinner;
    this.title.setTitle('Dashboard - Admin Panel');
    this.dash.dashData()
    .subscribe(data => {
      this.revenue = `৳ ${data.revinue}`;
      this.invoices = data.projects;
    });

    this.analytics.oneYearView()
    .subscribe(data => {
        this.earningLables = data.months;
        this.earningData = data.revenues;
        this.viewEarning();
    });

    this.invoice.get(0, 10)
    .subscribe(data => {
      this.showInvoices = data;
      // tslint:disable-next-line: deprecation
      this.loadingBar.complete();
    });


    // chart
    const myChart = new Chart('viewOverviews', {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

    const orderOverview = new Chart('orderOverview', {
  type: 'line',
  data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
          label: '2020 Order Overview',
          data: [5, 10, 2, 5, 4, 4, 10, 5, 47],
          backgroundColor: [
              'rgb(52 152 219 / 60%)'
          ],
          borderColor: [
              'rgb(44 62 80/ 100%)'
          ],
          borderWidth: 2,
          fill: true
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});

}

  // tslint:disable-next-line: typedef
  onDelete(invoice: IInvoice){
    this.invoice.delete(invoice._id)
    .subscribe(data => {
      this.toaster.success('Deleted');
      this.showInvoices = this.showInvoices.filter((t: { _id: string; }) => t._id !== invoice._id);
    }, (error) => {
      this.toaster.error('Delete Faild');
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  viewEarning(){
    const revenueOverview = new Chart('revenueOverview', {
        type: 'line',
        data: {
            labels: this.earningLables,
            datasets: [{
                label: '1 Year\'s Earning',
                data: this.earningData,
                backgroundColor: [
                    'rgb(245 128 62 / 45%)'
                ],
                borderColor: [
                    'rgb(44 62 80/ 100%)'
                ],
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });
  }
}
