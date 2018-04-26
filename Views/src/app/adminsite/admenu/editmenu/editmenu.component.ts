import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../webservice/menu.service';
import { AlertService } from '../../../webservice/alert.service';
@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.css']
})
export class EditmenuComponent {
  @Output() emitService = new EventEmitter()
  @Input() menu;
  @Input() isEdit;
  @Input() isCreate;
  constructor(
    public activeModal: NgbActiveModal,
    private menuService: MenuService,
    private alertService: AlertService,
  ) { }

  updateMenuSubmit() {
    this.menuService.editMenu(this.menu).subscribe(result => {
      // Check if PUT request was a success or not
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message);
      }
    });
    this.activeModal.dismiss('Cross click');
  }
  onDeleteMenuSubmit(id: string) {
    this.menuService.deleteMenu(id).subscribe(result => {
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