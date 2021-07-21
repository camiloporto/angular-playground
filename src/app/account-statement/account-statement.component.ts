import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';

export interface AccountStatementItemUI {
  date: Date;
  account: string;
  description: string;
  amount: number;
  tags: string[];
}

const SAMPLE_DATA: AccountStatementItemUI[] = [
  {date: new Date("2019-01-16"), account: 'Rent', description: 'pagamento aluguel', amount: -1300, tags: ['aluguel']},
  {date: new Date("2019-01-12"), account: 'Salario', description: 'salario', amount: 4000, tags: ['salario']},
  {date: new Date("2019-01-10"), account: 'Supermercado', description: 'feira do mes', amount: -237.45, tags: ['feira']},
  {date: new Date("2019-01-07"), account: 'Internet', description: 'pagamento myReuplic', amount: -64, tags: ['aluguel']},
]

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  displayedColumns: string[] = ['date', 'account', 'amount', 'description', 'tags'];
  dataSource = new MatTableDataSource(SAMPLE_DATA)
  accountName: string = "Transaction bank account";
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotal() {
    return this.dataSource.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  getReportStartDate() {
    return this.dateRange.value.start;
  }

  getReportEndDate() {
    return this.dateRange.value.end;
  }
}