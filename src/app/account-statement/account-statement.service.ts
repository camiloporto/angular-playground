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

const SAMPLE_DATA: AccountStatementItem[] = [
  {date: new Date("2019-01-16"), account: 'Rent', description: 'pagamento aluguel', amount: -1300, tags: ['aluguel']},
  {date: new Date("2019-01-12"), account: 'Salario', description: 'salario', amount: 4000, tags: ['salario']},
  {date: new Date("2019-01-10"), account: 'Supermercado', description: 'feira do mes', amount: -237.45, tags: ['feira']},
  {date: new Date("2019-01-07"), account: 'Internet', description: 'pagamento myReuplic', amount: -64, tags: ['aluguel']},
]

@Injectable()
export class AccountStatementService {

  constructor() { }

  getAccountStatement(accountId: string, begin: Date, end: Date) : AccountStatement {
    console.log(' fetching statement');
    return {
      begin: begin,
      end: end,
      accountId: accountId,
      entries: SAMPLE_DATA
    };
  }
}

