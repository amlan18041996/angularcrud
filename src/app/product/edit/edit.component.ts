import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    id!: number;
    product!: Product;
    form!: FormGroup;

    constructor(
        public productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.productId;
        this.product = this.productService.find(this.id)
        
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', Validators.required),
            company: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            quantity: new FormControl('', Validators.required),
        });
    }

    get f(){
        return this.form.controls;
    }
    
    submit(){
        this.productService.update(this.id, this.form.value)
        this.router.navigateByUrl('product/index');
    }
}
