import { Component, OnInit } from '@angular/core';
import { ExchangerService } from './exchanger.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rate } from '../models/rate.model';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
})
export class ExchangerComponent implements OnInit {
  currencies = [];
  rates: Rate[] = [];
  converted = false;
  submit: string = 'Convert';
  result: number;
  toEur: number;

  form: FormGroup;

  constructor(private exchService: ExchangerService) {}
  private currencySub: Subscription;
  private rateSub: Subscription;

  ngOnInit() {
    this.exchService.getCurrency();
    this.exchService.getRates();
    this.currencySub = this.exchService
      .getCurrencyUpdateListener()
      .subscribe((currencyData) => {
        for (let i = 0; i < currencyData.currencies.length; i++) {
          this.currencies.push(currencyData.currencies[i]);
        }
        return this.currencies;
      });

    this.rateSub = this.exchService
      .getRateUpdateListener()
      .subscribe((rateData) => {
        for (let i = 0; i < rateData.rates.length; i++) {
          this.rates.push(rateData.rates[i]);
        }
        return this.rates;
      });

    // console.log('curerncies');
    // console.log(this.currencies);
    // console.log('rates');
    // console.log(this.rates);

    this.form = new FormGroup({
      from: new FormControl(null, {
        validators: [Validators.required],
      }),
      to: new FormControl(null, {
        validators: [Validators.required],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onConvert() {
    // if (this.form.invalid) {
    //   return;
    // }
    this.exchService.getRates();

    this.rateSub = this.exchService
      .getRateUpdateListener()
      .subscribe((rateData) => {
        let abbreviationArray = [];
        let rateArray = [];
        for (let i = 0; i < rateData.rates.length; i++) {
          abbreviationArray.push(rateData.rates[i][0]);
          rateArray.push(rateData.rates[i][1]);
        }

        if (abbreviationArray.includes(this.form.value.from[0])) {
          // console.log(this.form.value.to[1]);
          // console.log(this.form.value.amount);
          let indexFrom = abbreviationArray.findIndex(
            (el) => el === this.form.value.from[0]
          );
          let indexTo = abbreviationArray.findIndex(
            (el) => el === this.form.value.to[0]
          );

          // console.log(rateArray[indexFrom]); //from value
          // console.log(rateArray[indexTo]); //to value

          this.toEur = this.form.value.amount / rateArray[indexFrom];
          // console.log('To eur ' + this.toEur);
          this.result = Math.round(this.toEur * rateArray[indexTo] * 100) / 100;

          // console.log('the result' + this.result);
        } else {
          alert('The value does not exist in the database!');
        }
      });

    this.converted = true;
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
    this.rateSub.unsubscribe();
  }
}
