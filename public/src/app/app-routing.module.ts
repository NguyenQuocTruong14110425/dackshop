import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LAYOUTROUT } from './layout/layout.rout';
const appRoutes: Routes = [
    // { path: '', redirectTo: 'addcustomer', pathMatch: 'full' },
    // //client
     { path: '', children: LAYOUTROUT  },
    // //admin
    // { path: '', component: AdministratorComponent, children: ADMINISTRATOR_ROUTES  },
];
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
