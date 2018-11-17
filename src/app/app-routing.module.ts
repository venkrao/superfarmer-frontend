import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { UserRegistrationComponent } from './user-registration/user-registration.component'
import { ListingsComponent } from './listings/listings.component'
import { ListingDetailComponent } from './listing-detail/listing-detail.component'
import { MeComponent } from './me/me.component'
import { MyListingsComponent } from './my-listings/my-listings.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'listings', component: ListingsComponent },
    { path: 'listing/:id', component: ListingDetailComponent },
    { path: 'me', component: MeComponent },
    { path: 'me/listings', component: MyListingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
