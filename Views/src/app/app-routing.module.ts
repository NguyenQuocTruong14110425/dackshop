import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientComponent, CLIENT_ROUTES} from './router/client';
import { AdminComponent, ADMIN_ROUTES  } from './router/admin';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home',pathMatch:'full'},
    //client
    { path: '', component: ClientComponent, children: CLIENT_ROUTES},
        //admin
    { path: '', component: AdminComponent, children: ADMIN_ROUTES},
];
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules  }) 
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
