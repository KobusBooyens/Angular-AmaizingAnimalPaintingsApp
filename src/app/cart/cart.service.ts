import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.baseUrl + "/cart";

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  addToCart(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  removeFromCart(product: Product): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrl + "/" + product.id);
  }

  clearCart(): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl);
  }

  checkout(products: Product[]): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + "/checkout", products);
  }
}