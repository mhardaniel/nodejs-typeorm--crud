import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, MatButtonModule, ProductItem],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  products = this.productService.products;

  ngOnInit(): void {
    console.warn('Product List Comp');

    this.productService.getProducts();
  }
}
