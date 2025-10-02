import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IProduct } from '../../types/product.interface';
import { ProductDeleteDialog } from '../product-delete-dialog/product-delete-dialog';
import { ProductEditDialog } from '../product-edit-dialog/product-edit-dialog';

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

  deletedProduct = output<number>();
  updatedProduct = output<IProduct>();

  openProductEditDialog() {
    const dialogRef = this.dialog.open(ProductEditDialog, {
      data: { product: this.product() },
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct !== undefined) {
        this.updatedProduct.emit({ ...updatedProduct, id: this.product().id });
      }
    });
  }

  confirmProductDeleteDialog(): void {
    const dialogRef = this.dialog.open(ProductDeleteDialog, {
      data: { product: this.product() },
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (action !== 'yes') return;
      this.deletedProduct.emit(this.product().id);
    });
  }
}
