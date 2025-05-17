import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Industry } from "../../model/retailer/industry.model";

@Injectable({
  providedIn: 'root',
})
export class IndustryApiService {
  constructor(private readonly httpClient: HttpClient) {
  }
  public getAll() : Observable<Array<Industry>>{
    const url = `${environment.apiUrl}/industry`;
    return this.httpClient.get<Array<Industry>>(url);
  }
}
