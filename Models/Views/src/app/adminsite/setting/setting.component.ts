import { Component, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from '../../webservice/general.service';;
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  formColor: FormGroup
  formSize: FormGroup
  colorposts: any;
  DetailColor: any;
  isDetailColor;
  isEditColor;
  sizeposts: any;
  DetailSize: any;
  isDetailSize;
  isEditSize;
  constructor(
    private FormBuilder: FormBuilder,
    private colorService: GeneralService,
    private sizeService: GeneralService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.createFormColor();
    this.createFormSize();
  }
  //open modal
  opencreate(createcolor) {
    const modalRefCreate = this.modalService.open(createcolor);
    modalRefCreate.result.then((data) => {
      this.onCreateColorSubmit();
    }, (reason) => {
      this.GetListColor();
    });
  }
  opencreateSize(createsize) {
    const modalRefCreate = this.modalService.open(createsize);
    modalRefCreate.result.then((data) => {
      this.onCreateSizeSubmit();
    }, (reason) => {
      this.GetListSize();
    });
  }
  //color
  createFormColor() {
    this.formColor = this.FormBuilder.group({
      ColorName: '',
      ValueHex: ''
    })
  }

  onCreateColorSubmit() {
    const color = {
      ColorName: this.formColor.get('ColorName').value,
      ValueHex: this.formColor.get('ValueHex').value
    }
    this.colorService.createColor(color).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListColor();
        this.createFormColor();
      }
    });
  }
  updateColorSubmit() {
    this.colorService.editColor(this.DetailColor).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailColor(result.data._id)
        this.GetListColor();
      }
    });
  }
  DeleteColor(id) {
    this.colorService.deleteColor(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListColor();
        this.isDetailColor = false;
      }
    });
  }
  EditColor() {
    this.isEditColor = true;
    this.isDetailColor = false
  }
  detailColor(id) {
    this.colorService.GetOneColor(id).subscribe(result => {
      this.DetailColor = result.data;
      this.isDetailColor = true;
      this.isEditColor = false;
    });
  }
  GetListColor() {
    this.colorService.GetListColor().subscribe(result => {
      this.colorposts = result.data;
    });
  }
  //size
  createFormSize() {
    this.formSize = this.FormBuilder.group({
      SizeName: '',
      TypeSize: ''
    })
  }

  onCreateSizeSubmit() {
    const size = {
      SizeName: this.formSize.get('SizeName').value,
      TypeSize: this.formSize.get('TypeSize').value
    }
    this.sizeService.createSize(size).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListSize();
        this.createFormSize();
      }
    });
  }
  updateSizeSubmit() {
    this.sizeService.editSize(this.DetailSize).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailSize(result.data._id)
        this.GetListSize();
      }
    });
  }
  DeleteSize(id) {
    this.sizeService.deleteSize(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListSize();
        this.isDetailSize = false;
      }
    });
  }
  GetListSize() {
    this.sizeService.GetListSize().subscribe(result => {
      this.sizeposts = result.data;
    });
  }
  detailSize(id) {
    this.sizeService.GetOneSize(id).subscribe(result => {
      this.DetailSize = result.data;
      this.isDetailSize = true;
      this.isEditSize = false;
    });
  }
  EditSize() {
    this.isEditSize = true;
    this.isDetailSize = false
  }
  ngOnInit() {
    this.GetListSize();
    this.GetListColor();
  }

}
