import { Component } from "@angular/core";
import { BaseComponent } from "../../../common/base.component";

@Component({
    selector: 'footer-app',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
  })
  export class Footer extends BaseComponent {
    constructor(
    ){
      super();
    }
  }