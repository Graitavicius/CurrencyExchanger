import { Component, OnInit } from '@angular/core';
import { Currency } from '../models/currency.model';
import { ExchangerService } from './exchanger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
})
export class ExchangerComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private exchService: ExchangerService) {}
  private currencySub: Subscription;

  ngOnInit() {
    this.exchService.getCurrency();
    this.currencySub = this.exchService
      .getCurrencyUpdateListener()
      .subscribe((currencyData: { currencies: Currency[] }) => {
        this.currencies = currencyData.currencies;
      });
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }
}
