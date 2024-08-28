import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgStyle, FormsModule, NgClass],
  providers: [AuthService, TokenService, AccountService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  authService    = inject(AuthService)
  tokenService   = inject(TokenService)
  accountService = inject(AccountService)
  router         = inject(Router)

  user = {
    email:'',
    password:''
  }

  signin() {
    this.authService.login(this.user)
        .subscribe({

          next: (res) => {
            if(res['message']) {
              Swal.fire({
                icon: "success",
                title: `${res['message']}`,
                showConfirmButton: false,
                timer: 1500
              });
              this.handlResponse(res)
            }  
            if(res['err']) {
              Swal.fire({
                icon: "error",
                title: `${res['err']}`,
                showConfirmButton: false,
                timer: 1500
              });
            }          
          }
          ,
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: `${err['err']}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
  }

  handlResponse(res: any) {
    this.tokenService.handle(res)
    this.accountService.changeStatus(true)
    return this.router.navigate(['/'])
  }

  
}
