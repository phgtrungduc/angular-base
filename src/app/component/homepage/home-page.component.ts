import { Component } from '@angular/core';
import { BaseComponent } from '../../common/base.component';
import { HttpClient } from '@angular/common/http';
import { LoginApiService } from '../../core/api-services/login-api.service';
import { LoggerService } from '../../common/service/logger.service';
import { Router } from '@angular/router';
import { Footer } from '../Common/footer/footer.component';
import { Header } from '../Common/header/header.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  imports: [Footer, Header]
})
export class HomePage extends BaseComponent {
  constructor(private httpClient: HttpClient,
    private loginService : LoginApiService,
    private logService : LoggerService,
    private router: Router
  ){
    super();
  }
}