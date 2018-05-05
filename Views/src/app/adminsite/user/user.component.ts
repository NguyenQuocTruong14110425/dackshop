import { Component, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionService } from '../../webservice/promotion.service';
import { AuthService } from '../../webservice/auth.service';
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formUser: FormGroup
  promotionposts: any;
  UserPost;
  DetailUser: any;
  isDetailUser=true;
  constructor(
    private FormBuilder: FormBuilder,
    private promotionService: PromotionService,
    private userService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.createFormUser();
  }
  //open modal
  opencreate(createUser) {
    const modalRefCreate = this.modalService.open(createUser);
    modalRefCreate.result.then((data) => {
      this.onCreateUserSubmit();
    }, (reason) => {
      this.GetListUser();
    });
  }
    //user
    createFormUser() {
      this.formUser = this.FormBuilder.group({
        FullName: '',
        Email: '',
        Address: '',
        Gender: '',
        Age: '',
        NumberPhone: '',
        UserName: '',
        Password: '',
      })
    }
    onCreateUserSubmit() {
      const User = {
        FullName: this.formUser.get('FullName').value,
        Email: this.formUser.get('Email').value,
        Address: this.formUser.get('Address').value,
        Gender: this.formUser.get('Gender').value,
        Age: this.formUser.get('Age').value,
        NumberPhone: this.formUser.get('NumberPhone').value,
        UserName: this.formUser.get('UserName').value,
        Password: this.formUser.get('Password').value,
      }
      this.userService.registerUser(User).subscribe(result => {
        if (!result.success) {
          this.alertService.error(result.message);
        } else {
          this.alertService.success(result.message)
          this.GetListUser();
          this.createFormUser();
        }
      });
    }
    updateUserSubmit() {
      this.userService.updateUser(this.DetailUser).subscribe(result => {
        if (!result.success) {
          this.alertService.error(result.message);
        } else {
          this.alertService.success(result.message)
          this.detailUser(result.data._id)
          this.GetListUser();
        }
      });
    }
    DeleteUser(id) {
      this.userService.deleteUser(id).subscribe(result => {
        if (!result.success) {
          this.alertService.error(result.message);
        } else {
          this.alertService.success(result.message)
          this.GetListUser();
          this.isDetailUser = true;
          this.DetailUser=null;
        }
      });
    }
    detailUser(id) {
      this.userService.detailUser(id).subscribe(result => {
        this.DetailUser = result.data;
        this.isDetailUser = true;
      });
    }
    EditUser() {
      this.isDetailUser = false
    }
    GetListUser() {
      this.userService.GetAllUser().subscribe(result => {
        this.UserPost = result.data;
      });
    }
      //promotion
  getAllPromotions() {
    // Function to GET all blogs from database
    this.promotionService.GetListPromotion().subscribe(result => {
      this.promotionposts = result.data; // Assign array to use in HTML
    });
  }
  ngOnInit() {
    this.GetListUser();
    this.getAllPromotions();
  }

}
