import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';

export const routes: Routes = [
    { path: "", component: DashbordComponent },
    { path: "signin", component: SigninComponent },
    { path: "signup", component: SignupComponent }
];
