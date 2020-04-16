import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  errorMessage: string = '';

  	constructor(private route: ActivatedRoute, 
  				private router: Router, 
          private ProductService: ProductService) { }

  	ngOnInit() {
  		const param = this.route.snapshot.paramMap.get('id');
      if (param) {
        const id = +param;
        this.getProduct(id);
      }
    }

    getProduct(id: number) {
      this.ProductService.getProduct(id).subscribe({
        next: product => this.product = product,
        error: err => this.errorMessage = err
      });
  	}

  	onBack(): void {
  		this.router.navigate(['/products']);
  	}

}
