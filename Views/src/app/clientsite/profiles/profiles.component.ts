import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../webservice/promotion.service';
import { AuthService } from '../../webservice/auth.service';
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  formUser: FormGroup
  promotionposts: any;
  UserPost;
  DetailUser: any;
  isDetailUser=true;
  constructor(
    private FormBuilder: FormBuilder,
    private promotionService: PromotionService,
    private AuthService: AuthService,
    private userService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
  }
  updateUserSubmit() {
    this.userService.updateUser(this.DetailUser).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailUser(result.data._id)
      }
    });
  }
  detailUser(id) {
    this.userService.detailUser(id).subscribe(result => {
      this.DetailUser = result.data;
    });
  }
  getProfile() {
    this.AuthService.profile().subscribe(result => {
      if (result.success) {
        this.DetailUser = result.data;
      }
    });
  }
  ngOnInit() {
    this.getProfile();
  }

}
