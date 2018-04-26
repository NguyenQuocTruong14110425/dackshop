import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '../../../webservice/catalog.service';
import { PromotionService } from '../../../webservice/promotion.service';
import { AlertService } from '../../../webservice/alert.service';
@Component({
  selector: 'app-createpromotion',
  templateUrl: './createpromotion.component.html',
  styleUrls: ['./createpromotion.component.css']
})
export class CreatepromotionComponent implements OnInit {
  formpromotion: FormGroup
  catalogposts: any;
  constructor(
    private catalogService: CatalogService,
    private promotionService: PromotionService,
    private FormBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.createForm();
  }
  createForm() {
    this.formpromotion = this.FormBuilder.group({
      PromotionName: '',
      Description: '',
      TypePromotion: '',
      Value: '',
      Coupon: [],
      AmountCounpon: '',
      SaleStartDate: '',
      SaleEndDate: '',
      ApplyFor: '',
      valueApply: ''
    })
  }
  typepromotions = ["Sale off", "Free shipping", "Counpon"];
  Appyfors = ["Catalories", "All product", "Order value", "Customer group"]
  AppyforsCoupon = ["Order value", "Customer group"]
  CustomerGroups = ["All Customer", "customer LV1", "customer LV2", "customer LV3", "customer VIP"]
  Countrys = ["All city", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau"]
  Counpons = [];
  AmountCounpon;
  onCreatePromotionSubmit() {
    const promotion = {
      PromotionName: this.formpromotion.get('PromotionName').value,
      Description:this.formpromotion.get('Description').value,
      Value:this.formpromotion.get('Value').value,
      Coupon:this.Counpons,
      AmountCounpon:this.AmountCounpon,
      SaleStartDate:this.formpromotion.get('SaleStartDate').value,
      SaleEndDate:this.formpromotion.get('SaleEndDate').value,
      TypePromotion:this.formpromotion.get('TypePromotion').value,
      ApplyFor:{
        nameApply:this.formpromotion.get('ApplyFor').value,
        valueApply:this.formpromotion.get('valueApply').value,
      }
    }
    this.promotionService.createPromotion(promotion).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.createForm();
      }
    });
  }

  GenerateCoupon(AmountCounpon) {
    const promotion = {
      AmountCounpon: AmountCounpon
    }
    this.promotionService.GenerateCoupon(promotion).subscribe(result => {
      this.Counpons = result.data; // Assign array to use in HTML
    });
  }

  DeleteCoupon(counpon) {
    this.Counpons = this.Counpons.filter(x => x !== counpon);
    this.AmountCounpon = this.Counpons.length
  }

  getAllCatalogs() {
    // Function to GET all blogs from database
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogposts = result.data; // Assign array to use in HTML
    });
  }
  ngOnInit() {
      this.typepromotions,
      this.getAllCatalogs();
  }

}
