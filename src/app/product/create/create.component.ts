import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
    form!: FormGroup;

    constructor(private router: Router, public productService: ProductService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
            company: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
            quantity: new FormControl('', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
        });
    }

    get f(){
        return this.form.controls;
    }
    
    submit(){
        let data = this.productService.create(this.form.value)
        this.router.navigateByUrl('product/index');
    }

}
