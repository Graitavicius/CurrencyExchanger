import { Component, OnInit } from '@angular/core';
import { Currency } from '../models/currency.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';
import { ExchangerService } from './exchanger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
})
export class ExchangerComponent implements OnInit {
  // currencies: Currency[] = [
  //   { value: 'Eur', amount: 1 },
  //   { value: 'Dolars', amount: 1.5 },
  //   { value: 'Lt', amount: 2 },
  // ];
  currencies: Currency[] = [];

  constructor(private exchService: ExchangerService) {}

  private currencySub: Subscription;

  ngOnInit() {
    this.exchService.getCurrency();
    this.currencySub = this.exchService
      .getPostUpdateListener()
      .subscribe((currency: Currency[]) => {
        this.currencies = currency;
      });
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  // public xmlItems: any;
  // constructor(private http: HttpClient) {
  //   this.loadXML();
  // }

  // loadXML() {
  //   this.http
  //     .get('/assets/users.xml', {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'text/xml')
  //         .append('Access-Control-Allow-Methods', 'GET')
  //         .append('Access-Control-Allow-Origin', '*')
  //         .append(
  //           'Access-Control-Allow-Headers',
  //           'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
  //         )
  //         .append('Access-Control-Allow-Methods', 'GET'),
  //       responseType: 'text',
  //     })
  //     .subscribe((data) => {
  //       this.parseXML(data).then((data) => {
  //         this.xmlItems = data;
  //       });
  //     });
  // }

  // parseXML(data) {
  //   return new Promise((resolve) => {
  //     let k: string | number,
  //       arr = [],
  //       parser = new xml2js.Parser({
  //         trim: true,
  //         explicitArray: true,
  //       });
  //     parser.parseString(data, (err, result) => {
  //       let obj = result.Employee;
  //       for (k in obj.emp[k]) {
  //         let item = obj.emp[k];
  //         arr.push({
  //           shortName: item.shortName,
  //           fullNameLT: item.fullNameLT,
  //           fullNameEN: item.fullNameEN,
  //           id: item.id,
  //           something: item.something,
  //         });
  //       }
  //       resolve(arr);
  //     });
  //   });
  // }
}
