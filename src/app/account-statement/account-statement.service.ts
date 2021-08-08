import { Injectable } from '@angular/core';

export class AccountStatementItem {
  date: Date;
  account: string;
  description: string;
  amount: number;
  tags: string[];
}

export class AccountStatement {
  begin: Date;
  end: Date;
  accountId: string;
  entries: AccountStatementItem[];
}

@Injectable()
export class AccountStatementService {

  constructor() { }

  getAccountStatement(accountId: string, begin: Date, end: Date) : AccountStatement {
    console.log(' fetching statement');
    return new AccountStatement();

  }

}

