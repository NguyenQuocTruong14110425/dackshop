import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//service
import { ProductService } from '../../../webservice/product.service';
import { CatalogService } from '../../../webservice/catalog.service';
import { ImageService } from '../../../webservice/image.service';
import { GeneralService } from '../../../webservice/general.service';
import { AlertService } from '../../../webservice/alert.service';
//model
import { Product } from '../../../model/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromotionService } from '../../../webservice/promotion.service';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  processing = false;
  isFolder = true;
  catalogposts: any;
  Imageposts: any;
  Folderposts: any;
  colorposts: any;
  DetailColor: any;
  sizeposts: any;
  DetailSize: any;
  promotionposts: any;
  promotionDetail: any;
  message;
  messageClass;
  formProduct: FormGroup;
  lstSizeDisplay = [];
  lstColorDisplay = [];  
  Image = {
    LeftImage: String,
    LeftImageZoom: String,
    RightImage: String,
    RightImageZoom: String,
    UnderImage: String,
    UnderImageZoom: String,
  };
  leftiamge = false;
  leftiamgezoom = false;
  rightiamge = false;
  rightiamgezoom = false;
  underimage = false;
  underimagezoom = false;
  PriceOnSale = 0;
  constructor(
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private promotionService: PromotionService,
    private catalogService: CatalogService,
    private ImageService: ImageService,
    private alertService: AlertService,
    private colorService: GeneralService,
    private sizeService: GeneralService,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.createForm()
  }
  //open modal
  opeImportImage(importdimage, flag) {
    this.Setstatus(flag)
    const modalRefCreate = this.modalService.open(importdimage);
    modalRefCreate.result.then((data) => {
      this.removestatus();
      this.backFolder();
    }, (reason) => {
      this.removestatus();
      this.backFolder();
    });
  }
    //open modal
    openImportColor(importColor) {
      const modalRefCreate = this.modalService.open(importColor);
    }

  removestatus() {
    this.leftiamge = false;
    this.leftiamgezoom = false;
    this.rightiamge = false;
    this.rightiamgezoom = false;
    this.underimage = false;
    this.underimagezoom = false;
  }
  Setstatus(flag) {
    if (!flag) {
      this.removestatus()
    }
    switch (flag) {
      case 1:
        this.leftiamge = true;
        break
      case 2:
        this.leftiamgezoom = true;
        break
      case 3:
        this.rightiamge = true;
        break
      case 4:
        this.rightiamgezoom = true;
        break
      case 5:
        this.underimage = true;
        break
      case 6:
        this.underimagezoom = true
        break
    }
  }
  chooseImage(image, flag) {
    if (!flag) {
      this.removestatus()
    }
    switch (flag) {
      case 1:
        this.leftiamge = false;
        this.Image.LeftImage = image;
        this.alertService.success("Add left image success!")
        break
      case 2:
        this.leftiamgezoom = false;
        this.Image.LeftImageZoom = image;
        this.alertService.success("Add left image zoom success!")
        break
      case 3:
        this.rightiamge = false;
        this.Image.RightImage = image;
        this.alertService.success("Add under image success!")
        break
      case 4:
        this.rightiamgezoom = false;
        this.Image.RightImageZoom = image
        this.alertService.success("Add right image zoom success!")
        break
      case 5:
        this.underimage = false;
        this.Image.UnderImage = image
        this.alertService.success("Add under image success!")
        break
      case 6:
        this.underimagezoom = false
        this.Image.UnderImageZoom = image
        this.alertService.success("Add under image zoom success!")
        break
    }
  }
  removeimage(flag) {
    if (!flag) {
      this.removestatus()
    }
    switch (flag) {
      case 1:
        this.leftiamge = false;
        this.Image.LeftImage = null;
        this.alertService.success("remove left image success!")
        break
      case 2:
        this.leftiamgezoom = false;
        this.Image.LeftImageZoom = null;
        this.alertService.success("remove left image zoom success!")
        break
      case 3:
        this.rightiamge = false;
        this.Image.RightImage = null;
        this.alertService.success("remove under image success!")
        break
      case 4:
        this.rightiamgezoom = false;
        this.Image.RightImageZoom = null
        this.alertService.success("remove right image zoom success!")
        break
      case 5:
        this.underimage = false;
        this.Image.UnderImage = null
        this.alertService.success("remove under image success!")
        break
      case 6:
        this.underimagezoom = false
        this.Image.UnderImageZoom = null
        this.alertService.success("Add under image zoom success!")
        break
    }
  }
  createForm() {
    this.formProduct = this.FormBuilder.group({
      ProductName: '',
      ShortDescription: '',
      LongDescription: '',
      AmountProduct: 0,
      Price: 0,
      CheckNew: false,
      Onsale: false,
      Promotion: '',
      CatalogParent: '',
    })
  }
  onCreateProductSubmit()
  {
    var newProduct = new Product();
        newProduct.ProductName=this.formProduct.get('ProductName').value;
        newProduct.ShortDescription=this.formProduct.get('ShortDescription').value;
        newProduct.LongDescription=this.formProduct.get('LongDescription').value;
        newProduct.Price=this.formProduct.get('Price').value;
        newProduct.AmountProduct=this.formProduct.get('AmountProduct').value;
        newProduct.Onsale=this.formProduct.get('Onsale').value;
        newProduct.CheckNew=this.formProduct.get('CheckNew').value;
        newProduct.Promotion=this.formProduct.get('Promotion').value;
        newProduct.CatalogParent=this.formProduct.get('CatalogParent').value;
        newProduct.Image=this.Image;
        newProduct.Color=this.lstColorDisplay;
        newProduct.Size=this.lstSizeDisplay;
        newProduct.SalePrice=this.PriceOnSale;   
    this.productService.addproduct(newProduct).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
      }
    });
  }
  //promotion
  getAllPromotions() {
    // Function to GET all blogs from database
    this.promotionService.GetListPromotion().subscribe(result => {
      this.promotionposts = result.data; // Assign array to use in HTML
    });
  }
  ChangPriceOnSale()
  {
    var price = this.formProduct.get('Price').value;
    var promotionID = this.formProduct.get('Promotion').value;
    this.promotionService.GetOnePromotion(promotionID).subscribe(result => {
      if(result.data.TypePromotion=="sale off" || result.data.TypePromotion=="counpon")
      {
        this.PriceOnSale = price - (result.data.Value * price)/100;
        this.promotionDetail =result.data;
      }
      else
      {
        this.PriceOnSale=0;
        this.promotionDetail =result.data;
      }
    });
  }
  //catalog
  getAllCatalogs() {
    // Function to GET all blogs from database
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogposts = result.data; // Assign array to use in HTML
      this.message = result.message;
    });
  }
  //folder
  GetListFolder() {
    this.ImageService.GetListFolder().subscribe(result => {
      this.Folderposts = result.data;
    });
  }
  backFolder() {
    this.isFolder = true;
    this.Imageposts = null;
    this.GetListFolder();
  }
  getImageList(id) {
    this.ImageService.GetListImageByFolder(id).subscribe(result => {
      this.isFolder = false;
      this.Imageposts = result.data;
    });
  }
  //color
  GetListColor() {
    this.colorService.GetListColor().subscribe(result => {
      this.colorposts = result.data;
    });
  }
  chooseColor(color)
  {
    var modelColortemp =
    {
      IdColor:color._id,
      ColorName:color.ColorName,
      ValueHex:color.ValueHex,
      IsActive:true
    }
    this.colorposts = this.colorposts.filter(x => x !== color);
    this.lstColorDisplay.push(modelColortemp);
  }
  IsActiveColor(color)
  {
    console.log(color)
    var tempcolor = color;
    this.lstColorDisplay = this.lstColorDisplay.filter(x => x !== color);
    if(color.IsActive==true)
    {
      tempcolor.IsActive=false
      this.lstColorDisplay.push(tempcolor);
    }
    else
    {
      tempcolor.IsActive=true
      this.lstColorDisplay.push(tempcolor);
    }
  }
  UnchooseColor(color)
  {
    var modelSizetemp =
    {
      _id:color._id,
      ColorName:color.ColorName,
      ValueHex:color.ValueHex,
      IsDelete:false
    }
    this.lstColorDisplay = this.lstColorDisplay.filter(x => x !== color);
    this.colorposts.unshift(modelSizetemp);
  }
  //size
  GetListSize() {
    this.sizeService.GetListSize().subscribe(result => {
      this.sizeposts = result.data;
    });
  }
  MoveSize(size)
  {
    var modelSizetemp =
    {
      IdSize:size._id,
      SizeName:size.SizeName,
      TypeSize:size.TypeSize,
      IsActive:false
    }
    this.sizeposts = this.sizeposts.filter(x => x !== size);
    this.lstSizeDisplay.push(modelSizetemp);
  }
  UnMoveSize(size)
  {
    var modelSizetemp =
    {
      _id:size._id,
      SizeName:size.SizeName,
      TypeSize:size.TypeSize,
      IsDelete:false
    }
    this.lstSizeDisplay = this.lstSizeDisplay.filter(x => x !== size);
    this.sizeposts.unshift(modelSizetemp);
  }

  ngOnInit() {
    this.getAllCatalogs();
    this.GetListFolder();
    this.getAllPromotions();
    this.GetListColor();
    this.GetListSize();
  }

}