import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Retailer } from '../../../model/retailer/retailer.model';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { BaseComponent } from '../../../common/base.component';
import { RetailerDetailPopupComponent } from '../retailer-detail-popup/retailer-detail-popup.component';
import { CommonModule } from '@angular/common';
import { AddressApiService } from '../../../core/api-services/address-api.service';
import { IndustryApiService } from '../../../core/api-services/industry-api.service';
import { Address } from '../../../model/retailer/address.model';
import { Industry } from '../../../model/retailer/industry.model';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import {KENDO_DATETIMEPICKER } from '@progress/kendo-angular-dateinputs';
import Swal from 'sweetalert2';
import { RetailerApiService } from '../../../core/api-services/retailer-api.service';
import { LoggerService } from '../../../common/service/logger.service';

@Component({
  selector: 'detail-retailer',
  imports: [KENDO_BUTTON, CommonModule, KENDO_DROPDOWNLIST, FormsModule, KENDO_DATETIMEPICKER],
  templateUrl: './detail-retailer.component.html',
  styleUrl: './detail-retailer.component.scss'
})
export class DetailRetailerComponent extends BaseComponent implements OnInit {
  @Input() public retailer: Retailer = {} as Retailer;
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter<any>();
  editMode = false;

  addressList : Array<Address> = new Array<Address>();
  industryList : Array<Industry> = new Array<Industry>();

  currentIndustryId : number = 0;
  currentAddressId : number = 0;

  formatDate = "dd/MM/yyyy HH:mm:ss";
  constructor(private addressApi : AddressApiService,
    private industryApi : IndustryApiService,
    private retailerApiService : RetailerApiService,
    private logService : LoggerService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.initData();
    this.currentIndustryId = this.retailer.IndustryId;
    this.currentAddressId = this.retailer.AddressId;
  }

  editRetailer() {
    console.log("Sửa");
    // this.openModalWithComponent(RetailerDetailPopupComponent);
    this.editMode = true;
  }
  deleteRetailer() {
    Swal.fire(
      {
        title: "Xóa bản ghi này?",
        text: 'Bản ghi sẽ bị xóa vĩnh viễn. Bạn có chắc chắn không?',
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ",
        showCancelButton: true,
        reverseButtons: true
      }
    ).then((action) => {
      if (action.isConfirmed) {
        this.retailerApiService.deleteRetailer(this.retailer.Id).subscribe(res => {
          this.editMode = false;
          this.logService.success("Xóa thông tin thành công");
          this.reloadGrid.emit();
        })
      }
    });
  }

  cancel(){
    Swal.fire(
      {
        title: "Hủy bỏ chỉnh sửa?",
        text: 'Thông tin bạn đã thay đổi chưa được lưu lại. Bạn có chắc chắn không?',
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ",
        showCancelButton: true,
        reverseButtons: true
      }
    ).then((action) => {
      if (action.isConfirmed) {
        this.editMode = false;
      }

    });
  }

  save(){
    Swal.fire(
      {
        title: "Lưu thông tin?",
        text: 'Bạn có chắc chắn không?',
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ",
        showCancelButton: true,
        reverseButtons: true
      }
    ).then((action) => {
      if (action.isConfirmed) {
        this.retailerApiService.updateRetailer(this.retailer).subscribe(res => {
          this.editMode = false;
          this.logService.success("Lưu thông tin thành công");
          this.reloadGrid.emit();
        })
      }
    });
  }

  initData() {
    this.addressApi.getAll().subscribe(x => this.addressList = x);
    this.industryApi.getAll().subscribe(x => this.industryList = x);
  }
}
