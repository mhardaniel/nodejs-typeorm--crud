import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IProduct } from '../../types/product.interface';
import { ProductDeleteDialog } from '../product-delete-dialog/product-delete-dialog';
import { ProductEditDialog } from '../product-edit-dialog/product-edit-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  product = input.required<IProduct>();

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  productService = inject(ProductService);

  constructor() {
    console.warn('Product Item Comp');
  }

  openProductEditDialog() {
    this.dialog.open(ProductEditDialog, {
      data: { product: this.product() },
    });
  }

  confirmProductDeleteDialog(): void {
    const dialogRef = this.dialog.open(ProductDeleteDialog, {
      data: { product: this.product() },
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (action !== 'yes') return;

      this.productService.deleteProduct(this.product().id).subscribe({
        next: () => {
          this._snackBar.open('Product has been removed', 'Close', {
            horizontalPosition: 'right',
            duration: 5000,
          });
        },
      });
    });
  }
}
