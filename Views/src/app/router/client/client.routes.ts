import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../clientsite/home/home.component';
import { RegisterComponent } from '../../clientsite/register/register.component';
import { SearchComponent } from '../../clientsite/search/search.component';
import { CheckoutComponent } from '../../clientsite/checkout/checkout.component';
import { TrackingComponent } from '../../clientsite/tracking/tracking.component';
import { ProfilesComponent } from '../../clientsite/profiles/profiles.component';
import { DetailproductComponent } from '../../clientsite/detailproduct/detailproduct.component';


export const CLIENT_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'profile', component: ProfilesComponent },
    {path: 'tracking', component: TrackingComponent },
    { path: 'search/:idproduct', component: SearchComponent },
    { path: 'detailproduct', component: DetailproductComponent },
];