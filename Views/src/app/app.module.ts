import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbAlertConfig,
  NgbActiveModal,
  NgbTimepickerConfig,
  NgbRadioGroup,
  NgbDatepicker,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//layout controller
import { ClientComponent } from './router/client/client.component';
import { AdminComponent } from './router/admin/admin.component';
//paritals
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { AdsidebarComponent } from './partials/adsidebar/adsidebar.component';
//client view
import { HomeComponent } from './clientsite/home/home.component';
import { LoginComponent } from './clientsite/login/login.component';
import { RegisterComponent } from './clientsite/register/register.component';
import { CheckoutComponent } from './clientsite/checkout/checkout.component';
import { TrackingComponent } from './clientsite/tracking/tracking.component';
import { SearchComponent } from './clientsite/search/search.component';
import { ProfilesComponent } from './clientsite/profiles/profiles.component';
import { DetailproductComponent } from './clientsite/detailproduct/detailproduct.component';
//admin view
import { DashboardComponent } from './adminsite/dashboard/dashboard.component';
import { AdbranchComponent } from './adminsite/adbranch/adbranch.component';
import { AdproductComponent } from './adminsite/adproduct/adproduct.component';
import { AdpromotionComponent } from './adminsite/adpromotion/adpromotion.component';
import { AdmenuComponent } from './adminsite/admenu/admenu.component';
import { AdorderComponent } from './adminsite/adorder/adorder.component';
import { AdcatalogComponent } from './adminsite/adcatalog/adcatalog.component';
import { OrderdetailComponent } from './adminsite/adorder/orderdetail/orderdetail.component';
import { EditproductComponent } from './adminsite/adproduct/editproduct/editproduct.component';
import { AlertComponent } from './partials/alert/alert.component';
import { EditcatalogComponent } from './adminsite/adcatalog/editcatalog/editcatalog.component';
import { EditbranchComponent } from './adminsite/adbranch/editbranch/editbranch.component';
import { CreatepromotionComponent } from './adminsite/adpromotion/createpromotion/createpromotion.component';
import { ImageComponent } from './adminsite/image/image.component';
import { SettingComponent } from './adminsite/setting/setting.component';
//service
import { AuthService } from './webservice/auth.service';
import { MenuService } from './webservice/menu.service';
import { BranchService } from './webservice/branch.service';
import { CatalogService } from './webservice/catalog.service';
import { OrderService } from './webservice/order.service';
import { CartService } from './webservice/cart.service';
import { PromotionService } from './webservice/promotion.service';
import { ProductService } from './webservice/product.service';
import { GeneralService } from './webservice/general.service';
import { ImageService } from './webservice/image.service';
import { AlertService } from './webservice/alert.service';

//pipe
import { ProductpipePipe } from './pipe/productpipe.pipe';
import { cataloryPipe } from './pipe/productpipe.pipe';
import { sizePipe } from './pipe/productpipe.pipe';
import { CheckorderPipe } from './pipe/productpipe.pipe';
//matirial
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { EditmenuComponent } from './adminsite/admenu/editmenu/editmenu.component';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap/buttons/buttons.module';
@NgModule({
  declarations: [
    AppComponent,
    //layout
    ClientComponent,
    AdminComponent,
    //patials
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdsidebarComponent,
    //client view
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    TrackingComponent,
    SearchComponent,
    ProfilesComponent,
    DetailproductComponent,
    //admin view
    DashboardComponent,
    AdbranchComponent,
    AdproductComponent,
    AdpromotionComponent,
    AdcatalogComponent,
    AdmenuComponent,
    AdorderComponent,
    OrderdetailComponent,
    EditproductComponent,
    EditcatalogComponent,
    EditbranchComponent,
    EditmenuComponent,
    CreatepromotionComponent,
    AlertComponent,
    ImageComponent,
    SettingComponent,
    //pipe
    ProductpipePipe,
    cataloryPipe,
    sizePipe,
    CheckorderPipe,
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    //material
    BrowserAnimationsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    AuthService,
    MenuService,
    BranchService,
    PromotionService,
    CatalogService,
    OrderService,
    CartService,
    GeneralService,
    ImageService,
    ProductService,
    SidebarComponent,
    SearchComponent,
    HeaderComponent,
    NgbModalStack,
    NgbAlertConfig,
    NgbTimepickerConfig,
    NgbRadioGroup,
    NgbButtonLabel,
    NgbDatepicker,
    AlertService
  ],
  entryComponents: [EditmenuComponent, EditbranchComponent, EditcatalogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }