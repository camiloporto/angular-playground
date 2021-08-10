import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class AccountStatementItem {
  date: Date;
  accountId: string;
  description: string;
  value: number;
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

  constructor(private httpClient: HttpClient) { }

  getAccountStatement(accountId: string, begin: Date, end: Date) : Observable<AccountStatement> {
    console.log('fetching statment');
    return this.httpClient.get<AccountStatement>('assets/account/sample-accountStatement-response.json')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(error => {
        console.log('Caught in CatchError. Throwing error')
        throw new Error(error)
      })
    );
  }
}

