import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.css'],
})
export class CurrencyHeaderComponent implements OnInit {
  exchangeRate: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchangeRate();
  }

  getExchangeRate() {
    this.http
      .get('https://api.exchangerate.host/latest?base=UAH')
      .subscribe((data: any) => {
        console.log(data.rates.UAH);
        console.log(this.exchangeRate);
        this.exchangeRate = data.rates;
      });
  }
}
