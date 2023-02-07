import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/models/product.model';
import { ProductsService } from 'src/services/products.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  env = environment
  products$: Observable<ProductModel[]> | undefined

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void{
    this.products$ = this.productsService.getAllProducts()
    .pipe(
      map(res => res.payload)
    )
  }
}
