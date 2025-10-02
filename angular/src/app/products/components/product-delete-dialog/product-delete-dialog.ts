import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IProduct } from '../../types/product.interface';

@Component({
  selector: 'app-product-delete-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>Delete product</h2>
    <mat-dialog-content>
      Would you like to delete <strong>{{ data.product.name }}</strong
      >?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>No</button>
      <button matButton mat-dialog-close="yes" cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ProductDeleteDialog>);
  readonly data = inject<{ product: IProduct }>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
