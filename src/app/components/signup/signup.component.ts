import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  router      = inject(Router)

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
          next: (res) => {
            if(res['message']) {
              Swal.fire({
                icon: "success",
                title: `${res['message']}`,
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/signin'])
            }

            if(res['err']) {
              Swal.fire({
                icon: "success",
                title: `${res['err']}`,
                showConfirmButton: false,
                timer: 1500
              });
            }
        
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: `${err['err']}`,
              showConfirmButton: false,
              timer: 1500
            });
          },
        }))
  }

}
