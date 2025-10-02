import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { ProductItem } from '../product-item/product-item';
import { IProduct } from '../../types/product.interface';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, MatButtonModule, ProductItem],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  private ref = inject(ChangeDetectorRef);
  private _snackBar = inject(MatSnackBar);
  private productService = inject(ProductService);

  products: IProduct[] = [];

  constructor() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;

      this.ref.markForCheck();
    });
  }

  onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this._snackBar.open('Product has been removed', 'Close', {
          horizontalPosition: 'right',
          duration: 5000,
        });
        this.products = this.products.filter((p) => p.id !== productId);
        this.ref.markForCheck();
      },
    });
  }

  onUpdateProduct(updatedProduct: IProduct): void {
    this._snackBar.open('Product has been updated', 'Close', {
      horizontalPosition: 'right',
      duration: 5000,
    });

    this.products = this.products.map((p) => {
      if (p.id === updatedProduct.id) {
        return {
          ...p,
          ...updatedProduct,
        };
      }
      return p;
    });
  }
}
