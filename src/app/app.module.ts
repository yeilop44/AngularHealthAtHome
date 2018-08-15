import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { CorsModule } from 'cors';

import { environment } from '../environments/environment';
import { ConnectfbService } from './services/connectfb.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
  {
    path: 'product',
    component:ProductsComponent
  },{
    path: 'product/new',
    component:AddProductsComponent
  },
  {
    path: 'orders',
    component:OrdersComponent
  }
  //{ path: '**', component: 'PageNotFoundComponent' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpModule,
    HttpClientModule
  ],
  providers: [ConnectfbService,AuthService,ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

