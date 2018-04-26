import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../../webservice/catalog.service';
import { AlertService } from '../../../webservice/alert.service';

@Component({
  selector: 'app-editcatalog',
  templateUrl: './editcatalog.component.html',
  styleUrls: ['./editcatalog.component.css']
})
export class EditcatalogComponent {
  @Output() emitService = new EventEmitter()
  @Input() catalog;
  @Input() isEdit;
  @Input() isCreate;
  constructor(
    public activeModal: NgbActiveModal,
    private catalogService: CatalogService,
    private alertService: AlertService,
  ) { }

  updatecatalogSubmit() {
    this.catalogService.editCatalog(this.catalog).subscribe(result => {
      // Check if PUT request was a success or not
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message);
      }
    });
    this.activeModal.dismiss('Cross click');
  }
  onDeletecatalogSubmit(id: string) {
    this.catalogService.deleteCatalog(id).subscribe(result => {
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