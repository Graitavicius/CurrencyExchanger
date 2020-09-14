import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Currency } from '../models/currency.model';
import { map } from 'rxjs/operators';
import { Rate } from '../models/rate.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ExchangerService {
  private currencies: Currency[] = [];
  private rates: Rate[] = [];
  private currenciesUpdated = new Subject<{ currencies: Currency[] }>();
  private ratesUpdated = new Subject<{ rates: Rate[] }>();

  constructor(private http: HttpClient) {}

  getCurrency() {
    this.http
      .get<{ currencyArrays: any }>(BACKEND_URL + '/currency')
      .pipe(
        map((currencyData) => {
          let currencyArray = [];
          for (let i = 0; i < currencyData.currencyArrays.length; i++) {
            currencyArray.push(currencyData.currencyArrays[i]);
          }
          return currencyArray;
        })
      )
      .subscribe((transformedCurrencyData) => {
        this.currencies = [...transformedCurrencyData];
        this.currenciesUpdated.next({
          currencies: [...this.currencies],
        });
      });
  }

  getRates() {
    this.http
      .get<{ rates: any }>(BACKEND_URL + '/rates')
      .pipe(
        map((rateData) => {
          let rateArray = [];

          for (let i = 0; i < rateData.rates.length; i++) {
            rateArray.push(rateData.rates[i]);
          }
          return rateArray;
        })
      )
      .subscribe((transformedRateArrayData) => {
        this.rates = [...transformedRateArrayData];
        this.ratesUpdated.next({
          rates: [...this.rates],
        });
      });
  }

  convertData(from: string, to: string, amount: number) {}

  getCurrencyUpdateListener() {
    return this.currenciesUpdated.asObservable();
  }

  getRateUpdateListener() {
    return this.ratesUpdated.asObservable();
  }
}
