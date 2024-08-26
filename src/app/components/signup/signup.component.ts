import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgStyle, FormsModule, NgClass],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService = inject(AuthService)

  user = {
    name:'',
    email:'',
    password:'',
    phone:'',
    adresse:''
  }

  signup() {
    this.authService.register(this.user)
        .subscribe(({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        }))
  }

}
