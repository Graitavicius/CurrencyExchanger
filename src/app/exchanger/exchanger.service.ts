import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Currency } from '../models/currency.model';
import { map } from 'rxjs/operators';
import { Languages } from '../models/languages.model';

@Injectable({ providedIn: 'root' })
export class ExchangerService {
  private currencies: Currency[] = [];
  private currenciesUpdated = new Subject<{ currencies: Currency[] }>();

  constructor(private http: HttpClient) {}

  getCurrency() {
    this.http
      .get<{ message: string; currencies: any }>(
        'http://localhost:3000/api/currency'
      )
      .pipe(
        map((currencyData) => {
          currencyData.currencies,
            map((currency) => {
              console.log(currency);
              return {
                abbreviation: currency,
                nameLT: currency,
                nameEN: currency,
                rate: currency,
                id: currency,
                // Ccy: currency.abbreviation,
                // CcyNm: currency.nameEN,
                // CCyNbr: currency.id,
              };
            });
        })
      )
      .subscribe((transformedCurrencyData) => {
        //console.log(transformedCurrencyData);
        //!   //this.currencies = transformedCurrencyData.currencies;
        this.currenciesUpdated.next({
          currencies: [...this.currencies],
        });
      });
  }

  getCurrencyUpdateListener() {
    return this.currenciesUpdated.asObservable();
  }

  // addCurrencies(abbreviation: string, languages: Languages, serialNumber: number, numb: number) {
  //   const postData = new FormData()
  // }
}
