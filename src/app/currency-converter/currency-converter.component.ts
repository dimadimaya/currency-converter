import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  value1: number = 0;
  currency1: string = 'UAH';
  value2: number = 0;
  currency2: string = 'USD';
  exchangeRate: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchangeRate();
  }

  getExchangeRate() {
    this.http
      .get('https://api.exchangerate.host/latest?base=UAH')
      .subscribe((data: any) => {
        this.exchangeRate = data.rates;
        this.convertCurrency('1');
        this.convertCurrency('2');
      });
  }

  convertCurrency(updatedInput: '1' | '2') {
    if (this.exchangeRate) {
      if (updatedInput === '1') {
        if (this.currency1 === this.currency2) {
          this.value2 = this.value1;
        } else if (this.currency1 === 'UAH' && this.currency2 === 'USD') {
          this.value2 = this.value1 / this.exchangeRate.USD;
        } else if (this.currency1 === 'USD' && this.currency2 === 'UAH') {
          this.value2 = this.value1 * this.exchangeRate.USD;
        } else if (this.currency1 === 'UAH' && this.currency2 === 'EUR') {
          this.value2 = this.value1 / this.exchangeRate.EUR;
        } else if (this.currency1 === 'EUR' && this.currency2 === 'UAH') {
          this.value2 = this.value1 * this.exchangeRate.EUR;
        } else if (this.currency1 === 'USD' && this.currency2 === 'EUR') {
          this.value2 =
            (this.value1 * this.exchangeRate.USD) / this.exchangeRate.EUR;
        } else if (this.currency1 === 'EUR' && this.currency2 === 'USD') {
          this.value2 =
            (this.value1 * this.exchangeRate.EUR) / this.exchangeRate.USD;
        }
      } else if (updatedInput === '2') {
        if (this.currency1 === this.currency2) {
          this.value1 = this.value2;
        } else if (this.currency1 === 'UAH' && this.currency2 === 'USD') {
          this.value1 = this.value2 * this.exchangeRate.USD;
        } else if (this.currency1 === 'USD' && this.currency2 === 'UAH') {
          this.value1 = this.value2 / this.exchangeRate.USD;
        } else if (this.currency1 === 'UAH' && this.currency2 === 'EUR') {
          this.value1 = this.value2 * this.exchangeRate.EUR;
        } else if (this.currency1 === 'EUR' && this.currency2 === 'UAH') {
          this.value1 = this.value2 / this.exchangeRate.EUR;
        } else if (this.currency1 === 'USD' && this.currency2 === 'EUR') {
          this.value1 =
            (this.value2 * this.exchangeRate.EUR) / this.exchangeRate.USD;
        } else if (this.currency1 === 'EUR' && this.currency2 === 'USD') {
          this.value1 =
            (this.value2 * this.exchangeRate.USD) / this.exchangeRate.EUR;
        }
      }
    }
  }
}
