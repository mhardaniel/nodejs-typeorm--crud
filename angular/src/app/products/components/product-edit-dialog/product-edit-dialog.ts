import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-edit-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditDialog {
  private formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<ProductEditDialog>);
  readonly data = inject<{ product: IProduct }>(MAT_DIALOG_DATA);
  productService = inject(ProductService);
  private _snackBar = inject(MatSnackBar);

  productForm = this.formBuilder.nonNullable.group({
    name: [this.data.product.name, [Validators.required, Validators.minLength(4)]],
    price: [this.data.product.price, [Validators.required, Validators.min(1)]],
    image: [this.data.product.image, Validators.required],
  });

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  constructor() {
    console.warn('Product Edit Dialog Comp');
  }

  onSubmit() {
    if (!this.productForm.valid) return;

    this.productService.updateProduct(this.data.product.id, this.productForm.value).subscribe({
      next: () => {
        this.dialogRef.close();

        this._snackBar.open('Product has been updated', 'Close', {
          horizontalPosition: 'right',
          duration: 5000,
        });
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
