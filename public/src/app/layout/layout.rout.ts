import { Routes, RouterModule } from '@angular/router';
import {AddcustomerComponent} from '../components/customerdb/addcustomer/addcustomer.component';
import { CustomerdbComponent } from '../components/customerdb/customerdb.component';
export const LAYOUTROUT: Routes = [
    
    { path: 'addcustomer',component: AddcustomerComponent},
    { path: '',component: CustomerdbComponent }
];