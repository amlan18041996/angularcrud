import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
    product: Product;
    searchedProducts: any = [];
    products: any = [];

    constructor() { }

    currentDateAndTime() {
        let today = new Date();
        let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
        let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}s`
        let dateTime = `${date} ${time}`
        return dateTime
    }
     
    getAll(search: string) {
        if(search !== undefined && search !== ""){
            this.searchedProducts = this.products.filter((item: any) => {
                const name = item.name.toLowerCase();
                if(name.includes(search)){
                    return item
                }
            })
            return this.searchedProducts
        }
        return this.products
    }
     
    create(product: Product) {
        product.id = this.products.length+1;
        product.date = this.currentDateAndTime()
        this.products.push(product);
        return this.products
    }
     
    find(id:number) {
        let productIndex = this.products.findIndex((item: any) => item.id == id)
        return this.products[productIndex]
    }
     
    update(id:number, product:Product) {
        this.products = this.products.map((item: any) => {
            if(item.id === id){
                item = product
            }
            return item
        })
        return this.products
    }
     
    delete(id:number){
        this.products = this.products.filter((item: any) => item.id === id)
        return this.products
    }
}