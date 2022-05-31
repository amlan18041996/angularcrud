import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { Product } from './product';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        IndexComponent,
        ViewComponent,
        EditComponent,
        CreateComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ProductModule {}
