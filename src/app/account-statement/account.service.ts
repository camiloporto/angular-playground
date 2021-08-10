import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class Account {
  id: string;
  name: string;
  description: string;
  children: Account[];
  tags: string[]
}

export class AccountTree {
  accountSystemId: string;
  income: Account;
  expenses: Account;
  assets: Account;
  liabilities: Account;
}

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccountTree(accountSystemId: string) : Observable<AccountTree> {
    console.log('fetching account tree');
    return this.httpClient.get<AccountTree>('assets/account/sample-accountTree-response.json')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(error => {
        console.log('Caught in CatchError. Throwing error')
        throw new Error(error)
      })
    );
  }

}