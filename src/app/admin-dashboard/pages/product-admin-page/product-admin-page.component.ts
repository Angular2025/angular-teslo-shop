import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductDetailsComponent } from "./product-details/product-details.component";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {

  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  productsService = inject(ProductsService)

  productId = toSignal(
    this.activateRoute.params.pipe(
      map(params => params['id'])
    )
  );

  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({request}) => {
      return this.productsService.getProductById(request.id)
    }
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigateByUrl('/admin/products')
    }
  });

}
