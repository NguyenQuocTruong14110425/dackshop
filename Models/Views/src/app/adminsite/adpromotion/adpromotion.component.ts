import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from '../../webservice/catalog.service';
import { PromotionService } from '../../webservice/promotion.service';
import { AlertService } from '../../webservice/alert.service';
@Component({
  selector: 'app-adpromotion',
  templateUrl: './adpromotion.component.html',
  styleUrls: ['./adpromotion.component.css'],
})
export class AdpromotionComponent implements OnInit {
  formpromotion: FormGroup
  catalogposts: any
  promotionposts:any
  constructor(
    private catalogService: CatalogService,
    private promotionService: PromotionService,
    private FormBuilder: FormBuilder,
    private alertService: AlertService
  ) {  }
  typepromotions = ["Sale off", "Free shipping", "Counpon"];
  Appyfors = ["Catalories", "All product", "Order value", "Customer group"]
  AppyforsCoupon = ["Order value", "Customer group"]
  CustomerGroups = ["All Customer", "customer LV1", "customer LV2", "customer LV3", "customer VIP"]
  Countrys = ["All city", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau"]
  Counpons = [];
  AmountCounpon;
  changActive(promotion)
  {
    const promotionData = {
      _id:promotion._id,
      IsActive:true
      }
    if(promotion.IsActive==true)
    {
      promotionData.IsActive =false
    }
    if(promotion.IsActive==false)
    {
      promotionData.IsActive =true
    }
    this.promotionService.editPromotion(promotionData).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.getAllPromotions();
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
  getAllPromotions() {
    // Function to GET all blogs from database
    this.promotionService.GetListPromotion().subscribe(result => {
      this.promotionposts = result.data; // Assign array to use in HTML
    });
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
      this.getAllPromotions();
  }

}
