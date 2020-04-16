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
	products: IProduct[];
  product: IProduct;
  errorMessage: string;

  	constructor(private route: ActivatedRoute, 
  				private router: Router, 
          private ProductService: ProductService) { }

  	ngOnInit() {
  		let id = +this.route.snapshot.paramMap.get('id');
  		//this.pageTitle += `: ${id}`;
      this.ProductService.getProducts().subscribe({
        next: products => {
          // Get Specific Product
          for (let product of products) {
            if (product.productId === id) {
              this.product = {
                'productId': product.productId,
                'productName': product.productName,
                'productCode': product.productCode,
                'releaseDate': product.releaseDate,
                'price': product.price,
                'description': product.description, 
                'starRating': product.starRating,
                'imageUrl': product.imageUrl
              };
            }
          }
        }, 
        error: err => this.errorMessage = err
      });
  	}

  	onBack(): void {
  		this.router.navigate(['/products']);
  	}

}
