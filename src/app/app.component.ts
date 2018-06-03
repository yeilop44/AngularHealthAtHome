import { Component } from '@angular/core';
import { ConnectfbService } from './services/connectfb.service';
import { Usuario } from './models/modelEjemplo';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  usuario:Usuario={
    password:"",
    user:""
  };

  
  constructor(public auth:AuthService){}

  login(){

    this.auth.log(this.usuario)
             .subscribe(data=>{
                 
              }); 
  }

}
