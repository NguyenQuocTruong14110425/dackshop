import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BranchService } from '../../webservice/branch.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-adbranch',
  templateUrl: './adbranch.component.html',
  styleUrls: ['./adbranch.component.css']
})
export class AdbranchComponent implements OnInit {
  formbranch:FormGroup
  currentUrl;
  messageClass;
  message;
  loadingBranchs = false;
  branchpost;
  constructor(
    private FormBuilder: FormBuilder,
    private branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
   }
   createForm() {
    this.formbranch = this.FormBuilder.group({
      branchName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      image: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
    })
  }
  onCreateBranchsubmit() {
    const idmenu=this.currentUrl.idmenu;
    console.log(idmenu);
    const branch = {
      branchName: this.formbranch.get('branchName').value,
      image: this.formbranch.get('image').value,
      description: this.formbranch.get('description').value,
    }
    this.branchService.createBranch(idmenu,branch).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListBranch();
      }
    });
  }

  onDeleteBranchsubmit(id:string) {
    console.log(id);
    this.branchService.deleteBranch(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListBranch();
      }
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadMenus() {
    this.loadingBranchs = true; // Used to lock button
    this.GetListBranch();
    setTimeout(() => {
      this.loadingBranchs = false; // Release button lock after four seconds
    }, 4000);
  }
  GetListBranch() {
    // Function to GET all blogs from database
    const idmenu = this.currentUrl.idmenu;
    console.log(idmenu)
    this.branchService.GetListBranch(idmenu).subscribe(data => {
      this.branchpost = data.branches;
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.GetListBranch();
  }

}
