import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../adminsite/dashboard/dashboard.component';
import { AdproductComponent } from '../../adminsite/adproduct/adproduct.component';
import { AdpromotionComponent } from '../../adminsite/adpromotion/adpromotion.component';
import { AdmenuComponent } from '../../adminsite/admenu/admenu.component';
import { AdbranchComponent } from '../../adminsite/adbranch/adbranch.component';
import { AdcatalogComponent } from '../../adminsite/adcatalog/adcatalog.component';
import { AdorderComponent } from '../../adminsite/adorder/adorder.component';
import { OrderdetailComponent } from '../../adminsite/adorder/orderdetail/orderdetail.component';
import { EditproductComponent } from '../../adminsite/adproduct/editproduct/editproduct.component';
export const ADMIN_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: AdproductComponent },
    { path: 'promotions', component: AdpromotionComponent },
    { path: 'menus', component: AdmenuComponent },
    { path: 'orders', component: AdorderComponent },
    { path: 'ordertail/:idorder', component: OrderdetailComponent },
    { path: 'addbranchs/:idmenu', component: AdbranchComponent },
    { path: 'addcatalogs/:idbranch', component: AdcatalogComponent },
    { path: 'edit-product/:id',component: EditproductComponent}
];