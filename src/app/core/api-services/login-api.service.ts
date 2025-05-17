import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { LoginResponse } from "../../model/login/login.model";

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private readonly httpClient: HttpClient) {
  }
  public login(username : string, password: string) : Observable<LoginResponse>{
    const url = `${environment.apiUrl}/user/login`;
    const body = {
      Username : username,
      Password: password
    }
    return this.httpClient.post<LoginResponse>(url, body);
  }
}
