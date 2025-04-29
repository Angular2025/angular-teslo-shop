import { SlicePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    SlicePipe,
    ProductImagePipe
  ],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {

  product = input.required<Product>()
  imageUrl = computed(() => {
    return `http://localhost:3000/api/files/product/${ this.product().images[0] }`
  });

}
