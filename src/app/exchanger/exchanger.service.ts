import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({ providedIn: 'root' })
export class ExchangerService {
  private currency = [];
  private currencyUpdated = new Subject<Currency[]>();

  constructor(private http: HttpClient) {}

  getCurrency() {
    this.http
      .get<{ message: string; currency: Currency[] }>(
        'http://localhost:3000/api/currency'
      )
      .subscribe((postData) => {
        this.currency = postData.currency;
        this.currencyUpdated.next([...this.currency]);
      });
  }

  getPostUpdateListener() {
    return this.currencyUpdated.asObservable();
  }
}
