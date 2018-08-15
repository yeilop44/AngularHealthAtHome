import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/modelEjemplo';
import { ConnectfbService } from '../../services/connectfb.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

	products:any;
  key:'';
  val:'';
  product: Product = {
     name: '',
     description:'',
     category:{ id:'',name:''},
     eachPrice:0,
     id:'',
     medical_characteristics:'',
     photos:[''],
     platform:'',
     volume:'',
     regist:{id:'',time:'',user:''}
  };
  regists:any[];

	update:boolean = false;
  show:boolean = false;
  res:boolean = false;
  urlImg:string="http://13.90.130.197/product";

  constructor(private connect:ConnectfbService, private productS:ProductService, public auth:AuthService) { }

  ngOnInit() {
    this.key='';
    this.val='';
    this.getProducts();
    this.connect.getData('regist').subscribe(data=>{
      this.regists = data;
    });
  }

  getProducts(){
    this.productS.getProduct().subscribe(res=>{
        
          this.products= res; 
          
       
    });  

    setTimeout(()=>{
      if(!this.productS.res){
        this.productS.getProduct().subscribe(res=>{
          this.products= this.productS.products;
        });  
      }
    },1000);
  }

  deleteProduct(product){
  	
  	if(confirm('¿Realmente desea eliminar el producto? ')) {
  		this.productS.deleteProduct(product).subscribe(res=>{
          this.productS.getProduct().subscribe(res=>{
                  this.products = this.productS.products;
          });
      });
  	}
  }

  updateProduct(){
    let date = new Date();
  	this.productS.putProduct(this.product).subscribe(res=>{
         let r = this.showProduct(this.product);
        this.show = false;

      if(r.id) {
        this.connect.updateData('regist',{id:r.id,date:date})
      }else{
        this.connect.addData('regist',{user: this.auth.getUser(),product_id: this.product.id,date:date});
      }
    });
    
  	this.update=false;
  }

  toUpd(product:Product){
  		this.product = product;
  		this.update = true;
      this.show = false;
  }

  showProduct(product:Product){
    this.product= {
     name: product.name,
     description:product.description,
     category:{ id:product.category.id,name:product.category.name},
     eachPrice:product.eachPrice,
     id:product.id,
     medical_characteristics:'',
     photos:product.photos,
     platform:product.platform,
     volume:product.volume,
     regist:{id:'',time:'',user:''}

    };

    for(let regist of this.regists){
      if(regist.product_id == product.id) {
        this.product.regist.id = regist.id;
        this.product.regist.time = regist.date;
        this.product.regist.user = regist.user;
        this.show = true;
        this.update = false;
        return {id:regist.id};
      }
    }

    this.show = true;
    this.update = false;
    return {id:null}
  }
  
}
