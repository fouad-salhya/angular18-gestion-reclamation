import { Component, inject, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [FormsModule, NgClass,NgStyle],
  providers: [ReclamationService, AuthService],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  reclmationService = inject(ReclamationService)
  authService       = inject(AuthService)
  accountService    = inject(AccountService)
  tokenService      = inject(TokenService)
  router            = inject(Router)

  currentUser : any;


  reclamation = {
    typeReclamation: '',
    description:'',
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe((res) => {
      this.currentUser = this.tokenService.getInfo()
    })
  }

  addReclm() {

  }

  signout() {
    this.authService.logout().subscribe({
      next: (res) => {
        if(res['message']) {
          this.accountService.changeStatus(false)
          this.tokenService.remove()
          return this.redirectTo('signin')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  redirectTo(path: string, id?: number): void {
    if (id) {
      // Si un identifiant est fourni, redirige vers une route dynamique
      this.router.navigate([path, id]);
    } else {
      // Sinon, redirige vers une route statique
      this.router.navigate([path]);
    }
  }
}
