import { Component, OnInit, ViewChild } from '@angular/core';
import { RetailerApiService } from '../../../core/api-services/retailer-api.service';
import { Retailer } from '../../../model/retailer/retailer.model';
import { GridComponent, KENDO_GRID, SelectableSettings } from '@progress/kendo-angular-grid';
import { KENDO_PAGER, PageChangeEvent } from '@progress/kendo-angular-pager';
import { DateHelpers } from '../../../helper/dateHelper';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { GridDataResult } from "@progress/kendo-angular-grid";
import { DetailRetailerComponent } from '../detail-retailer/detail-retailer.component';
import { BaseComponent } from '../../../common/base.component';
import { FormsModule } from '@angular/forms';
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { CommonModule } from '@angular/common';
import { getCurrentUser } from '../../../store/app-state';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { Router } from '@angular/router';
import { LoggerService } from '../../../common/service/logger.service';
import { lastValueFrom } from 'rxjs';
import { LoadBearerTokenAction } from '../../../store/actions/session.action';
import { PopoverDirective } from 'ngx-bootstrap/popover';
@Component({
  selector: 'retailer-list',
  imports: [KENDO_GRID, KENDO_PAGER, KENDO_INPUTS, DetailRetailerComponent, FormsModule, KENDO_POPUP, CommonModule, KENDO_LAYOUT, PopoverDirective],
  templateUrl: './retailer-list.component.html',
  styleUrl: './retailer-list.component.scss'
})
export class RetailerListComponent extends BaseComponent implements OnInit {
  @ViewChild('retailerGrid', {static: false}) retailerGrid: GridComponent | undefined;
  listRetailer : Array<Retailer> = new Array<Retailer>();

  //pager info
  pageSize = 10;
  public buttonCount = 3;
  public sizes = [10, 20, 50];
  skip = 0;
  totalRecords = 0;
  isLoading = true;

  gridData : GridDataResult = {
    data : [],
    total :0
  };

  selectableSettings : SelectableSettings = {
    mode : 'single',
    checkboxOnly : true
  }

  textSearch : string = "";

  isShowMenu = false;
  username: string = "";
  role : string = "";


  previousExpandRowIndex = -1;
  constructor(private retailerApiService : RetailerApiService,
    private router : Router
   ) {
    super()
  }
  ngOnInit(): void {
    this.initData();
  }
  initData(){
    this.getData();
    this.initUserInfo();
  }

  initUserInfo() {
    this.store.select(getCurrentUser).subscribe(user => {
      this.username = user.username;
      this.role = user.role == 1 ? "Quản trị viên" : "Người dùng";
    })
  }
  editCellData(retailer : Retailer) {
    console.log(retailer);
  }

  deleteCellData(retailer : Retailer) {
    console.log(retailer);

  }

  getData(){
    this.retailerApiService.getListPaging(this.skip, this.pageSize, this.textSearch).subscribe(res => {
      this.gridData.data = res.Data;
      this.gridData.total = res.Total;
      this.mappingData();
      this.isLoading = false;
    })
  }

  public pageChange(event: PageChangeEvent): void {
    this.isLoading = true;
    this.skip = event.skip;
    this.pageSize = event.take;
    this.getData();
  }
  mappingData() {
    let index = this.skip +1;
    this.gridData.data = this.gridData.data.map(retailer => ({
      ...retailer,
      NumberOrder: index++,
      DisplayContractDate: DateHelpers.formatDefaultDateTime(retailer.ContractDate),
      DisplayExpiryDate: DateHelpers.formatDefaultDateTime(retailer.ExpiryDate),
      ExpiryDate: retailer.ExpiryDate ? new Date(retailer.ExpiryDate) : null,
      ContractDate: retailer.ExpiryDate ? new Date(retailer.ContractDate) : null,
    }));
  }

  textSearchChange() : void{
    this.getData()
  }

  public onToggle(): void {
    this.isShowMenu = !this.isShowMenu;
  }

  reloadGrid() : void {
    this.skip = 0;
    this.getData();
  }
  logout(){
    localStorage.removeItem("BearerToken");
    this.router.navigate(['/login']);
  }
  onCellClick($event: any) {
    const indexRow = $event.rowIndex;
    if (this.previousExpandRowIndex != -1) {
      if (this.previousExpandRowIndex === indexRow) {
        this.retailerGrid?.collapseRow(indexRow);
        this.previousExpandRowIndex = -1
      } else {
        this.retailerGrid?.collapseRow(this.previousExpandRowIndex);
        this.retailerGrid?.expandRow(indexRow);
        this.previousExpandRowIndex = indexRow;
      }
    } else {
      this.retailerGrid?.expandRow(indexRow);
      this.previousExpandRowIndex = indexRow;
    }
    console.log($event);
  }
}
