import { Component, Inject, OnInit, Output, Input, HostListener, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../webservice/order.service';;
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-salechart',
  templateUrl: './salechart.component.html',
  styleUrls: ['./salechart.component.css']
})
export class SalechartComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  public DataSales = {
    SaleOfYear: 0,
    SalesOfMonth: 0,
    SalesOfWeek: 0,
    SalesOfDay: 0
  }
  Year: any;
  Month: any;
  Day: any;
  TotalSaleMonth = 0;
  TotalSaleYear = 0;
  TotalSaleWeek = 0;
  TotalSaleDay = 0;
  TotalqtyMonth = 0;
  //sales
  DataForSaleYearTemp = []
  DataForSaleMonthTemp = []
  DataForSaleDayTemp = []
  public DataSaleOfYear = []
  public DataSaleOfMonth = []
  public DataSaleOfDay = []
  //quantity
  DataForQtyYearTemp = []
  DataForQtyMonthTemp = []
  DataForQtyDayTemp = []
  public LabelSaleOfYear = []
  public LabelSaleOfMonth = []
  public LabelSaleOfDay = []
  public DataQuantityOfYear = []
  public DataQuantityOfMonth = []
  public DataQuantityOfDay = []
  IsyearChart = false;
  IsMonthChart = false;
  IsDayChart = true;
  IsyearQtyChart = false;
  IsMonthQtyChart = false;
  IsDayQtyChart = false;
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    var DateCurrent = new Date();
    this.Day = DateCurrent.getDate();
    this.Month = DateCurrent.getUTCMonth() + 1;
    this.Year = DateCurrent.getFullYear();
    this.tranferData();
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public chartColorsOfYear: any[] = [
    {
      backgroundColor: "#0066cc"
    },
  ];
  public chartColorsOfMonth: any[] = [
    {
      backgroundColor: "#00802b"
    },
  ];
  public chartColorsOfDay: any[] = [
    {
      backgroundColor: "#e69900"
    },
  ];
  openModalSaleYear(modal) {
    const modalRefCreate = this.modalService.open(modal);
  }
  GetDataAnalyzeSale() {
    setTimeout(() => {
      this.chart.ngOnChanges({} as SimpleChanges);
    }, 500);
  }
  OpentChart(event) {
    if (event == 'year') {
      this.IsyearChart == true ? this.IsyearChart = false : this.IsyearChart = true;
    }
    if (event == 'month') {
      this.IsMonthChart == true ? this.IsMonthChart = false : this.IsMonthChart = true;
    }
    if (event == 'day') {
      this.IsDayChart == true ? this.IsDayChart = false : this.IsDayChart = true;
    }
    if (event == 'yearqty') {
      this.IsyearQtyChart == true ? this.IsyearQtyChart = false : this.IsyearQtyChart = true;
    }
    if (event == 'monthqty') {
      this.IsMonthQtyChart == true ? this.IsMonthQtyChart = false : this.IsMonthQtyChart = true;
    }
    if (event == 'dayqty') {
      this.IsDayQtyChart == true ? this.IsDayQtyChart = false : this.IsDayQtyChart = true;
    }
  }
  tranferData() {
    this.DataForSaleYearTemp = []
    this.DataForSaleMonthTemp = []
    this.DataForSaleDayTemp = []
    //quantity
    this.DataForQtyYearTemp = []
    this.DataForQtyMonthTemp = []
    this.DataForQtyDayTemp = []
    this.LabelSaleOfYear = []
    this.LabelSaleOfMonth = []
    this.LabelSaleOfDay = []
    this.orderService.getDataOfSales((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.DataSales = result.data;
        result.data.SaleOfYear.forEach(dataOfYear => {
          if (dataOfYear != null || dataOfYear != undefined) {
            this.LabelSaleOfYear.push(dataOfYear._id.year);
            this.DataForSaleYearTemp.push(dataOfYear.totalSale)
            this.DataForQtyYearTemp.push(dataOfYear.totalQuantity)
          }
        });
        result.data.SalesOfMonth.forEach(dataOfMonth => {
          if ((dataOfMonth != null || dataOfMonth != undefined) && (dataOfMonth._id.year == this.Year)) {
            dataOfMonth.SalesOfMonth.forEach(monthData => {
              if (monthData.month == this.Month) {
                this.TotalSaleMonth = monthData.totalSale
                this.TotalqtyMonth = monthData.totalQuantity
              }
              this.LabelSaleOfMonth.push(monthData.month);
              this.DataForSaleMonthTemp.push(monthData.totalSale)
              this.DataForQtyMonthTemp.push(monthData.totalQuantity)

            });
          }
        });
        result.data.SalesOfDay.forEach(dataOfDay => {
          if ((dataOfDay != null || dataOfDay != undefined) && (dataOfDay._id.month == this.Month)&& (dataOfDay._id.year == this.Year)) {
            dataOfDay.SalesOfDay.forEach(dayData => {
              if (dayData.day == this.Day) {
                this.TotalSaleDay = dayData.totalSale
              }
              this.LabelSaleOfDay.push(dayData.day);
              this.DataForSaleDayTemp.push(dayData.totalSale)
              this.DataForQtyDayTemp.push(dayData.totalQuantity)
            });
          }
        });
      }
    })
    //sale
    this.DataSaleOfDay = [{
      data: this.DataForSaleDayTemp,
      label: 'Sale'
    }]
    this.DataSaleOfMonth = [{
      data: this.DataForSaleMonthTemp,
      label: 'Sale'
    }]
    this.DataSaleOfYear = [{
      data: this.DataForSaleYearTemp,
      label: 'Sale'
    }]
    //quantity
    this.DataQuantityOfYear = [{
      data: this.DataForQtyYearTemp,
      label: 'Quantity'
    }]
    this.DataQuantityOfMonth = [{
      data: this.DataForQtyMonthTemp,
      label: 'Quantity'
    }]
    this.DataQuantityOfDay = [{
      data: this.DataForQtyDayTemp,
      label: 'Quantity'
    }]
  }
  ChangeYear(e: any): void {
    if (e == -1) {
      this.Year > 2000 ? this.Year-- : 2000
    }
    if (e == 1) {
      this.Year < 3000 ? this.Year++ : 3000
    }
    this.tranferData();
    this.GetDataAnalyzeSale();
  }
  ChangeMonth(e: any): void {
    if (e == -1) {
      this.Month > 1 ? this.Month-- : 1
    }
    if (e == 1) {
      this.Month < 12 ? this.Month++ : 12
    }
    this.tranferData();
    this.GetDataAnalyzeSale();
  }
  ChangeDay(e: any): void {
    if (e == -1) {
      this.Day > 1 ? this.Day-- : 1
    }
    if (e == 1) {
      this.Day < 31 ? this.Day++ : 31
    }
    this.tranferData();
    this.GetDataAnalyzeSale();
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.GetDataAnalyzeSale();
  }

}
