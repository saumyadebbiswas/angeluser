import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  requestHeader: any = new HttpHeaders();

  constructor(private http:HttpClient) {
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json');
  }

  login(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/customer/login', input, {headers: this.requestHeader})
  }

  brandList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/brand/details', {headers: this.requestHeader})
  }

  categoryList(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/category/details-by-brand/'+input.brand_id, {headers: this.requestHeader})
  }

  productList(): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/all-details', {headers: this.requestHeader})
  }

  productListByCategory(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/details-by-category/'+input.category_id, {headers: this.requestHeader})
  }

  productListByBrand(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/details-by-brand/'+input.brand_id, {headers: this.requestHeader})
  }

  productDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/product/details/'+input.product_id, {headers: this.requestHeader})
  }

  cartCheck(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/cart/check-by-product', input, {headers: this.requestHeader})
  }

  cartDetails(input:any): Observable<any> {
    return this.http.get<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/cart/check-by-customer/'+input.customer_id, {headers: this.requestHeader})
  }

  cartAdd(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/cart/insert', input, {headers: this.requestHeader})
  }

  cartRemove(input:any): Observable<any> {
    return this.http.delete<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/cart/remove/'+input.cart_id, {headers: this.requestHeader})
  }

  cartUpdate(input:any): Observable<any> {
    return this.http.put<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/cart/update', input, {headers: this.requestHeader})
  }

  OrderInsert(input:any): Observable<any> {
    return this.http.post<any>('http://phpstack-304562-945735.cloudwaysapps.com/crm/api/orders/insert', input, {headers: this.requestHeader})
  }
}
