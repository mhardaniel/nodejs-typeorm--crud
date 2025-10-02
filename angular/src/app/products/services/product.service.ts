import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../types/product.interface';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProductResponse>('/api/products').pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Something went wrong while fetching products.'));
      }),
    );
  }

  addProduct(newProduct: Partial<Omit<IProduct, 'id'>>) {
    return this.http.post<IProductResponse>('/api/products', newProduct).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error adding product:', error);
        return throwError(() => new Error('Something went wrong while adding product.'));
      }),
    );
  }

  updateProduct(id: number, updatedProduct: Partial<Omit<IProduct, 'id'>>) {
    return this.http.put<IProductResponse>(`/api/products/${id}`, updatedProduct).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => new Error('Something went wrong while updating product.'));
      }),
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<IProductResponse>(`/api/products/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Something went wrong while deleting product.'));
      }),
    );
  }
}
