import { Component } from '@angular/core';
import { BaseComponent } from '../../common/base.component';
import { getBearerToken } from '../../store/app-state';
import { HttpClient } from '@angular/common/http';
import { LoginApiService } from '../../core/api-services/login-api.service';
import { LoggerService } from '../../common/service/logger.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoadBearerTokenAction } from '../../store/actions/session.action';
import { LoginResponse } from '../../model/login/login.model';
import { SetUserAction } from '../../store/actions/user.action';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  username: string = "";
  password: string = "";
  constructor(private httpClient: HttpClient,
    private loginService : LoginApiService,
    private logService : LoggerService,
    private router: Router
  ){
    super();
  }
  login() {
    if (!this.username || !this.password) {
      this.logService.error("Không được để trống tên đăng nhập và mật khẩu.");
      return;
    }
    this.loginService.login(this.username, this.password).pipe(
      catchError((err) => {
        this.logService.error(err.error);
        return throwError(() => err);;
      })
    ).subscribe( x => {
      this.logService.success("Đăng nhập thành công");
      this.store.dispatch(LoadBearerTokenAction({bearerToken : x.JWT}));
      const user = x.User;
      this.store.dispatch(SetUserAction({user :  {username : user.Username, role : user.Role}}));

      localStorage.setItem("BearerToken", x.JWT);
      localStorage.setItem("User", JSON.stringify(user));
      setTimeout(() => {
        this.router.navigate(['retailer']);
      }, 1500)
    },
  )
    // this.store.select(getBearerToken).subscribe(x => {
    //   console.log("token: ", x);
    // })
  }

  register() {
    console.log("Dang ki");
  }
}
