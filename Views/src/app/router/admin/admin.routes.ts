import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../adminsite/dashboard/dashboard.component';
import { AdproductComponent } from '../../adminsite/adproduct/adproduct.component';
import { CreatepromotionComponent } from '../../adminsite/adpromotion/createpromotion/createpromotion.component';
import { AdpromotionComponent } from '../../adminsite/adpromotion/adpromotion.component';
import { UserComponent } from '../../adminsite/user/user.component';
import { AdmenuComponent } from '../../adminsite/admenu/admenu.component';
import { AdbranchComponent } from '../../adminsite/adbranch/adbranch.component';
import { AdcatalogComponent } from '../../adminsite/adcatalog/adcatalog.component';
import { SettingComponent } from '../../adminsite/setting/setting.component';
import { ImageComponent } from '../../adminsite/image/image.component';
import { AdorderComponent } from '../../adminsite/adorder/adorder.component';
import { SalechartComponent } from '../../adminsite/salechart/salechart.component';
import { UserchartComponent } from '../../adminsite/userchart/userchart.component';
import { OrderdetailComponent } from '../../adminsite/adorder/orderdetail/orderdetail.component';
import { EditproductComponent } from '../../adminsite/adproduct/editproduct/editproduct.component';
export const ADMIN_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: AdproductComponent },
    { path: 'settings', component: SettingComponent },
    { path: 'images', component: ImageComponent },
    { path: 'promotions', component: AdpromotionComponent },
    { path: 'add-promotion', component: CreatepromotionComponent },
    { path: 'menus', component: AdmenuComponent },
    { path: 'users', component: UserComponent },
    { path: 'orders', component: AdorderComponent },
    { path: 'userchart', component: UserchartComponent },
    { path: 'salechart', component: SalechartComponent },
    { path: 'ordertail/:idorder', component: OrderdetailComponent },
    { path: 'branchs', component: AdbranchComponent },
    { path: 'catalogs', component: AdcatalogComponent },
    { path: 'edit-product/:id',component: EditproductComponent},
    { path: 'add-product',component: EditproductComponent}
];