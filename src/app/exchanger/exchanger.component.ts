import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
})
export class ExchangerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  currencies = [{ value: 'Eur' }, { value: 'Dolars' }, { value: 'Lt' }];
}
