import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 
  private tokenService = inject(TokenService)

  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn())
  
  authStatus = this.loggedIn.asObservable()

  changeStatus(value: boolean) {
    this.loggedIn.next(value)
  }
}
