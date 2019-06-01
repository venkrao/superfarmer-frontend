import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { UserRegistrationComponent } from './user-registration/user-registration.component'
import { ListingsComponent } from './listings/listings.component'
import { ListingDetailComponent } from './listing-detail/listing-detail.component'
import { MeComponent } from './me/me.component'
import { MyListingsComponent } from './my-listings/my-listings.component'
import { PlaygroundComponent } from './playground/playground.component'
import { CreateListingComponent } from './create-listing/create-listing.component'
import { RegisterAsSellerComponent } from './register-as-seller/register-as-seller.component'
import { ListingsByCategoryComponent } from './listings-by-category/listings-by-category.component'
import { HellothereComponent } from './hellothere/hellothere.component'
import { TransporterComponent } from './transporter/transporter.component'
import { MyhomepageComponent } from './myhomepage/myhomepage.component'
import {NegotiationRequestsComponent} from './negotiation-requests/negotiation-requests.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'listings', component: ListingsComponent },
    { path: 'listing/:id', component: ListingDetailComponent },
    { path: 'me', component: MeComponent },
    { path: 'me/listings', component: MyListingsComponent },
    { path: 'playground', component: PlaygroundComponent },
    { path: 'createlisting', component: CreateListingComponent },
    { path: 'register-as-seller', component: RegisterAsSellerComponent },
    { path: 'listingsbycategory/:id', component: ListingsByCategoryComponent },
    { path: 'hellothere', component: HellothereComponent },
    { path: 'transporter', component: TransporterComponent },
    { path: 'myhomepage', component: MyhomepageComponent},
    { path: 'me/negotiationrequests', component: NegotiationRequestsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
