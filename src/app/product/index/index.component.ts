import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    products: Product[] = [];
    
    constructor(public productService: ProductService) { }

    ngOnInit(): void {
        this.fetchProducts({});
    }

    fetchProducts(event: any){
        this.products = this.productService.getAll(event.target?.value)
    }

    deleteProduct(id:number){
        this.products = this.products.filter(item => item.id !== id);
    }
}
