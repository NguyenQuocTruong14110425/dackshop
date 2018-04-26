import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from '../../../webservice/branch.service';
import { AlertService } from '../../../webservice/alert.service';
@Component({
  selector: 'app-editbranch',
  templateUrl: './editbranch.component.html',
  styleUrls: ['./editbranch.component.css']
})
export class EditbranchComponent {
  @Output() emitService = new EventEmitter()
  @Input() branch;
  @Input() isEdit;
  @Input() isCreate;
  constructor(
    public activeModal: NgbActiveModal,
    private branchService: BranchService,
    private alertService: AlertService,
  ) { }

  updatebranchSubmit() {
    this.branchService.editBranch(this.branch).subscribe(result => {
      // Check if PUT request was a success or not
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message);
      }
    });
    this.activeModal.dismiss('Cross click');
  }
  onDeletebranchSubmit(id: string) {
    this.branchService.deleteBranch(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.emitService.next(result.data);
        this.alertService.success(result.message);
      }
    });
    this.activeModal.dismiss('Cross click');
  }
}