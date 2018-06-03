import { Component} from '@angular/core';
import { Product } from '../../models/modelEjemplo';
import { ProductService } from '../../services/product.service';
import { Http, Headers } from '@angular/http'

import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent{
  
fileToUpload: File = null;
idPorductImage= null;  
 
  product: Product = {
    category:{ id:'',name:''},
     description:'',
     eachPrice:0,
     id:'',
     medical_characteristics:'',
     name: '',
     photos:[''],  
     platform:'',
     volume:''
    };

  constructor(private productS:ProductService, private http:Http,private auth:AuthService, private httpC:HttpClient) { }

handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
       console.log(this.fileToUpload.name);
  }
  uploadFileToActivity(){
    //this.productS.postFile(this.fileToUpload, this.product);
  }

  onSubmit(product:Product) {
    if(this.product.name != '' && this.product.description != '') {
       
     this.productS.postProduct(this.product);
     alert('Prodcuto '+ this.product.name + ' '+ this.product.id + ' creado exitosamente');
     this.productS.postFile(this.fileToUpload, this.product);
     
     
       //Limpiar Form
      
        
    }
  }

  

}
  