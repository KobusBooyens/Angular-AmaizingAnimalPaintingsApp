import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(products => {
      this.cartItems = products;
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      totalPrice += item.price;
    }
    return totalPrice;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe(() => {
      this.loadCart();
      this.totalPrice = this.getTotalPrice();
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      console.log("Cart cleared successfully.");
      this.cartItems = [];
      this.totalPrice = this.getTotalPrice();
    });
  }

  checkout(cart: Product[]) {
    this.cartService.checkout(cart).subscribe(() => {
      console.log("Cart checked out successfully.");
    });
  }
}