import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './product-add.html',
  styleUrl: './product-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAdd {
  private _snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  productService = inject(ProductService);

  productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['', Validators.required],
  });

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  onSubmit() {
    if (!this.productForm.valid) return;

    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this._snackBar.open('Product has been created', 'Close', {
          horizontalPosition: 'right',
          duration: 5000,
        });

        for (const controlName in this.productForm.controls) {
          const control = this.productForm.get(controlName);
          control?.reset();
          control?.setErrors(null);
        }
      },
    });
  }
}
