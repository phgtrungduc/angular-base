import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Address } from "../../model/retailer/address.model";

@Injectable({
  providedIn: 'root',
})
export class AddressApiService {
  constructor(private readonly httpClient: HttpClient) {
  }
  public getAll() : Observable<Array<Address>>{
    const url = `${environment.apiUrl}/address`;
    return this.httpClient.get<Array<Address>>(url);
  }
}
