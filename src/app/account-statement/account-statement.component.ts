import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerIntl } from '@angular/material/datepicker';
import { AccountStatementService } from './account-statement.service';
// import { AccountStatementService } from './account-statement.service';

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

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  providers: [AccountStatementService]
})
export class AccountStatementComponent implements OnInit {

  displayedColumns: string[] = ['date', 'account', 'amount', 'description', 'tags'];
  dataSource = new MatTableDataSource(SAMPLE_DATA)
  accountName: string = "Transaction bank account";
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private accountStatementService: AccountStatementService) {}

  ngOnInit() {
  }

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    if(this.isValidDateRange()) {
      this.fetchTableData();
    }
  }

  fetchTableData() {
    this.accountStatementService.getAccountStatement(
      'someAID', 
      this.getReportStartDate(), 
      this.getReportEndDate());
  }

  isValidDateRange() : boolean {
    return (this.getReportStartDate() != null && this.getReportEndDate() != null);
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