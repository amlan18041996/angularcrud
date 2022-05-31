import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
    
import { Post } from './post';
     
@Injectable({
  providedIn: 'root'
})

export class PostService {
    private apiURL = "https://articleapis.herokuapp.com/api/articles";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
   
    constructor(private httpClient: HttpClient) { }
     
    getAll(paginateNumber: number, paginateUrl: string): Observable<any> {
        let url = this.apiURL;
        if(paginateUrl !== "" || paginateNumber !== undefined){
            url = url+"?";
            if(paginateUrl !== ""){
                url = paginateUrl
            }
            if(paginateNumber !== undefined){
                url = url + (paginateUrl !== "" ? "&" : "") + "limit=" + paginateNumber;
            }
        }
        return this.httpClient.get(url)
        .pipe(
            catchError(this.errorHandler)
        )
    }
     
    create(post:Post): Observable<any> {
        return this.httpClient.post(this.apiURL, JSON.stringify(post), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }
     
    find(id:number): Observable<any> {
        return this.httpClient.get(this.apiURL + "/" + id)
        .pipe(
            catchError(this.errorHandler)
        )
    }
     
    update(id:number, post:Post): Observable<any> {
        return this.httpClient.put(this.apiURL + "/" + id, JSON.stringify(post), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }
     
    delete(id:number){
        return this.httpClient.delete(this.apiURL + "/" + id, this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }
    
    errorHandler(error:any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}