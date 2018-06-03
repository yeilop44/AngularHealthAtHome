import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { Product } from '../models/modelEjemplo';


@Injectable()
export class ProductService {

   urlApi:string="http://13.90.130.197/product";
   products;
   idProductBackEnd;
   res:boolean = false;


   

  constructor(private http:Http,private auth:AuthService,private httpC:HttpClient) { }

  getProduct(){
      let token =this.auth.getToken();  
  		let headers = new Headers({'Authorization':`Bearer ${token.token}`,'Content-Type':'application/json'});
      console.log(token);
      //let url:string=this.urlApi;
      //configurar url (busqueda)
      //if(key && key != '') {
        //url=`${this.urlApi}/${key}/${val}`
      //}else if(val && val != '') {
        //url=`${this.urlApi}/${val}`
      //}

  	return	this.http.get(this.urlApi,{headers:headers})
  		     .map(res=>{
             //verificar respuesta de la API (200 ok vacia)
              //this.res = false;
         
              this.products = res.json();
              //this.res = true;
              //validar tamaño del array
              //if(this.products.length == (null || 0)){
                //this.products = [res.json()];
                 //if(key == "category" && this.products.length == 1){
                 //    this.res = false;
                 //} 
                //}
  	        });
  }

 

  postProduct(product:Product){
    let token =this.auth.getToken();
    let headerT = new Headers({'Authorization':`Bearer ${token.token}`,'Content-Type':'application/json'});
    let p: Product = {
    category:{ id:product.category.id,name:product.category.name},
     description:product.description,
     eachPrice:product.eachPrice,
     id:product.id,
     medical_characteristics:product.medical_characteristics,
     name: product.name,
     photos:[product.photos],
     platform:product.platform,
     volume:product.volume
    };
    return this.http.post(this.urlApi,p,{headers:headerT})
         .map(res =>{
                this.idProductBackEnd = res.json();
                console.log(this.idProductBackEnd.message);
         }).subscribe(res=>{
             console.log(res);
         });
         
  }

 postFile(fileToUpload: File, product:Product ) {
    let token =this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token.token}`})
    };
    const formData: FormData = new FormData();
     formData.append('image', fileToUpload, fileToUpload.name);
      console.log(this.idProductBackEnd.message);
    
     this.httpC.post(`${this.urlApi}/${this.idProductBackEnd.message}/image`, formData, httpOptions)
        .map(res =>{
         console.log(res)
         }).subscribe(res=>{
         }); 
  }

  putProduct(product:Product){
      let token =this.auth.getToken();
      const httpOptions = {
        headers: new HttpHeaders({'Authorization': `Bearer ${token.token}`,'Content-Type':  'application/json','Accept':'application/json'})};

      return this.httpC.put(`${this.urlApi}/${this.auth.getUser()}`,product,httpOptions).map(res =>{});
    }

  deleteProduct(product:Product){
    let token =this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token.token}`,'Content-Type':  'application/json','Accept':'application/json'})};

    return this.httpC.delete(`${this.urlApi}/${product.id}`,httpOptions)
         .map(res =>{

         });
  }


}
