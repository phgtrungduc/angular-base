import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Retailer, RetailerResponsePaging } from "../../model/retailer/retailer.model";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RetailerApiService {
  baseUrl = `${environment.apiUrl}/retailer`;
  constructor(private readonly httpClient: HttpClient) {
  }

  getListRetailer() : Observable<Array<Retailer>> {
    return this.httpClient.get<Array<Retailer>>(this.baseUrl);
  }
  getListPaging(skip: number, take: number, filterName: string): Observable<RetailerResponsePaging> {
    return this.httpClient.get<RetailerResponsePaging>(`${this.baseUrl}/list/paging`,
      {
        params: {
          Skip: skip,
          Take: take,
          FilterName: filterName
        }
      });
  }

  updateRetailer(retailer: Retailer) : Observable<Retailer> {
    return this.httpClient.put<Retailer>(this.baseUrl, retailer);
  }

  deleteRetailer(id: string) : Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
