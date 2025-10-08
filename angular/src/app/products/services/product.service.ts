import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IProduct, IProductResponse, IProductsResponse } from '../types/product.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private productsSignal = signal<IProduct[]>([]);

  readonly products = computed(() => this.productsSignal());

  constructor() {
    console.warn('Service');
  }

  getProducts() {
    this.http
      .get<IProductsResponse>('/api/products')
      .pipe(
        map((response) => this.productsSignal.set(response.data)),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return throwError(() => new Error('Something went wrong while fetching products.'));
        }),
      )
      .subscribe();
  }

  addProduct(newProduct: Partial<Omit<IProduct, 'id'>>) {
    return this.http.post<IProductResponse>('/api/products', newProduct).pipe(
      map((response) => {
        if (!response.success) return false;

        this.productsSignal.update((products) => [...products, response.data]);

        return true;
      }),
      catchError((error) => {
        console.error('Error adding product:', error);
        return throwError(() => new Error('Something went wrong while adding product.'));
      }),
    );
  }

  updateProduct(id: number, updatedProduct: Partial<Omit<IProduct, 'id'>>) {
    return this.http.put<IProductResponse>(`/api/products/${id}`, updatedProduct).pipe(
      map((response) => {
        this.productsSignal.update((products) =>
          products.map((product) =>
            product.id === id ? { ...product, ...response.data } : product,
          ),
        );

        return true;
      }),
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => new Error('Something went wrong while updating product.'));
      }),
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<IProductResponse>(`/api/products/${id}`).pipe(
      map((response) => {
        if (!response.success) return false;
        this.productsSignal.update((products) => products.filter((product) => product.id !== id));

        return true;
      }),
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Something went wrong while deleting product.'));
      }),
    );
  }
}
