import { Component } from "@angular/core";
import { BaseComponent } from "../../../common/base.component";

@Component({
    selector: 'header-app',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
  })
  export class Header extends BaseComponent {
    constructor(
    ){
      super();
    }
  }