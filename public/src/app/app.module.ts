import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partial/header/header.component';
import { CustomerdbComponent } from './components/customerdb/customerdb.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { MatInputModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddcustomerComponent} from './components/customerdb/addcustomer/addcustomer.component';
import {Service} from './services/service';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {CustomerdbFilter} from './components/customerdb/customerdb.pipe';

@NgModule({
  declarations: [
    CustomerdbFilter,
    AddcustomerComponent,
    AppComponent,
    HeaderComponent,
    CustomerdbComponent
  ],
  imports: [
   
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CdkTableModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
