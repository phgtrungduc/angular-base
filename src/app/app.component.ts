import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseComponent } from './common/base.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent {
  // isShowSpinner$: Observable<boolean>;
  title = 'kiot-qr-cpanel';
  constructor() {
    super()
    // this.isShowSpinner$ =of();
  }
}
