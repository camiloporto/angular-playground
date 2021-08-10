import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AccountStatement, AccountStatementItem, AccountStatementService } from './account-statement.service';
import { AccountService } from './account.service';

export interface AccountStatementItemUI {
  date: Date;
  account: string;
  description: string;
  amount: number;
  tags: string[];
}

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  providers: [AccountStatementService, AccountService]
})
export class AccountStatementComponent implements OnInit {

  displayedColumns: string[] = ['date', 'account', 'amount', 'description', 'tags'];
  dataSource = new MatTableDataSource<AccountStatementItemUI>();
  accountName: string = "Transaction bank account";
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private accountStatementService: AccountStatementService, private accounService: AccountService) {}

  ngOnInit() {}

  dateSelected(event: MatDatepickerInputEvent<Date>) {
    if(this.isValidDateRange()) {
      this.fetchTableData();
    }
  }

  isValidDateRange() : boolean {
    return (this.getReportStartDate() != null && this.getReportEndDate() != null);
  }

// TODO build the UI for accountPicker. Use AccountService to fetch accountTree. map to list.. etc

  fetchTableData() {
     this.accountStatementService.getAccountStatement(
      'someAID', 
      this.getReportStartDate(), 
      this.getReportEndDate()).subscribe((response: AccountStatement) => {
        console.log(response);
        this.renderAccountStatement(response);
      });

      this.accounService.getAccountTree('given accountSystemId').subscribe(
        (response) => {
          console.log(response);
        }
      )
  }

  renderAccountStatement(statement: AccountStatement) {
    console.log('rendering statment')
    this.accountName = statement.accountId;
    var items = statement.entries.map(this.toAccountStatementItemUI);
    console.log(items);
    this.dataSource.data = items;
  }

  toAccountStatementItemUI(statementItem: AccountStatementItem): AccountStatementItemUI {
    return {
      date: statementItem.date,
      account: statementItem.accountId,
      description: statementItem.description,
      amount: statementItem.value,
      tags: statementItem.tags
    }
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