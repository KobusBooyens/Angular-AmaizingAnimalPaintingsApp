import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  isCheckingOut: boolean = false;

  constructor(private cartService: CartService, private snackBarService: SnackbarService) { }

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
      this.snackBarService.showSnackBar("Product removed from cart successfully!", "Close");
      this.loadCart();
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.snackBarService.showSnackBar("Cart cleared successfully!", "Close");
      this.cartItems = [];
      this.totalPrice = this.getTotalPrice();
    });
  }

  checkout(cart: Product[]) {
    this.isCheckingOut = true;
    setTimeout(() => {
      this.cartService.checkout(cart).subscribe(() => {
        this.snackBarService.showSnackBar("Cart checked out successfully!", "Close");
        this.cartItems = [];
        this.totalPrice = this.getTotalPrice();
        this.isCheckingOut = false;
      });
    }, 4000);
  }
}