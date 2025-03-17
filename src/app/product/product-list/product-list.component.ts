import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = ""
  sortOptions: string[] = ["priceLowHigh", "priceHighLow"];

  constructor(private productService: ProductService, private cartService: CartService, private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe(() => {
      this.snackBarService.showSnackBar("Product added to card!");
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event?.target as HTMLInputElement).value.toLowerCase();

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm));
  }

  applySort(sortValue: string): void {
    this.sortOrder = sortValue;

    if (this.sortOrder === "priceLowHigh") {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === "priceHighLow") {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      this.filteredProducts = this.products;
    }
  }
}