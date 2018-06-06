import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

import * as moment from 'moment';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { Product } from '../models/modelEjemplo';
import { Item } from '../models/modelEjemplo';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;
	centrarmap = {lat:6.231928, lng:-75.60116719999996}

	marker: any;
	positionFin: any;
	drawRoute;
	origen;
	final;
	x ;

  user='';


	ListDirs: any[];
	orders:any[];
  items_res:any[];
	urlApi:string="http://13.90.130.197/order/user";
 	show:boolean = false;

 	item: Item = {
     
     productOrd: [ {id:'',
                category:{id:'', name:''},
                name:'',
                eachPrice:0,
                description:'',
                
                medical_characteristics:'',
                photos:[''],
                volume:'',
                platform:'',
                
                quantity:0}],

     trackingInfo: {destination: { latitude: 0, longitude: 0},
                    origin: { latitude: 0, longitude: 0},
                    path: [{latitude: 0,longitude: 0}]
      }
    
   };

  constructor(private http:Http, private auth:AuthService, private httpC:HttpClient) { }

  	ngOnInit() {
 		
 		//this.getIdOrderByUser();

 			//mapa inicial
		  	var mapProp = {
		      center: new google.maps.LatLng(this.centrarmap.lat, this.centrarmap.lng),
		      zoom: 9,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
	}


	//función obtiene Ordenes
	getIdOrderByUser(user){
        
      //comprueba el campo usuario y adiciana el user a la url
        let url = '';             
       if(user && user != '') {
          url=`${this.urlApi}/${user}`
          let token = this.auth.getToken(); 
          let headers = new Headers({'Authorization':`Bearer ${token.token}`,'Content-Type':'application/json','Accept': 'application/json'});

          return this.http.get(url,{headers:headers})
         .map(res=>{
               this.orders = res.json();
               console.log(this.orders);
               
                this.getOrderById(this.orders);
             }).subscribe(res=>{
              
           }); 

       }else{
         alert("ingrese un usuario con ordenes");
       }
        
      
    }

//función obtner detalles de la orden
    getOrderById(order){
        
      let urlorder = "http://13.90.130.197/order"; 
      let url=`${urlorder}/${order}`          
      let token = this.auth.getToken(); 
     // const httpOptions = {
     // headers: new HttpHeaders({'Authorization': `Bearer ${token.token}`, 'Content-Type':'application/json','Accept': 'application/json'})
    //};
      let headers = new Headers({'Authorization':`Bearer ${token.token}`,'Content-Type':'application/json','Accept': 'application/json'});


       return this.http.get(url,{headers:headers})
         .map(res=>{
           this.items_res = res.json();
           console.log(this.items_res);
              // res.json()
          }).subscribe(res=>{
          
              

               
            
           }); 
    }





    //función mostrar Detalles Ordenes
    showProduct(order){
        
        this.getOrderById(order)
        this.x = 0;
        //Json de lat lng y date
        this.ListDirs = [
         
         	{ lat:6.250270954618633, lng: -75.56842998998036, date: "2015-06-17 14:10:00" },
        	{ lat:6.250429907901519, lng: -75.56837951561647, date: "2015-06-17 14:10:01"},
        	{ lat:6.250564864760729, lng:-75.56842828298613,  date: "2015-06-17 14:10:04" },
          	{ lat:6.25060383609733, lng: -75.56854142337215,  date: "2015-06-17 14:10:05"},
          	{ lat:6.25067480259319, lng: -75.5686787036393,   date: "2015-06-17 14:10:08"},
          	{ lat:6.250708441395095, lng:-75.56877306856222,  date: "2015-06-17 14:10:09"},
          	{ lat:6.250766076562103, lng: -75.56887011569415, date: "2015-06-17 14:10:10"},
          	{ lat:6.250823711722749, lng: -75.56900203154328, date: "2015-06-17 14:10:12"},
          	{ lat:6.250873348089851, lng: -75.56909907867521, date: "2015-06-17 14:10:15"},
          	{ lat:6.250925650714401, lng:-75.56922831231532,  date: "2015-06-17 14:10:16" },
          	{ lat:6.250987558524169, lng: -75.56934901245768, date: "2015-06-17 14:10:18"},
         	{ lat:6.251053192444991, lng: -75.56947288167976, date: "2015-06-17 14:10:19"},
          	{ lat:6.251081498699873, lng:-75.56955651776661,  date: "2015-06-17 14:10:20"},
          	{ lat:6.251174196819546, lng: -75.56973793276484, date: "2015-06-17 14:10:23"},
          	{ lat:6.251233165065529, lng:-75.56985643756889,  date: "2015-06-17 14:10:26" },
          	{ lat:6.251267943460775, lng: -75.56994681293838, date: "2015-06-17 14:10:28" },
          	{ lat:6.251306442861838, lng: -75.57002663669459, date: "2015-06-17 14:10:32" },
          	{ lat:6.25136909997309, lng: -75.5702177440869,   date: "2015-06-17 14:10:39" },
          	{ lat:6.251502412950756, lng: -75.57047255394332, date: "2015-06-17 14:10:40" },
          	{ lat:6.251561070650177, lng: -75.57064153311126, date: "2015-06-17 14:10:42" },
          	{ lat:6.2516677209959015, lng: -75.57086415645949,date: "2015-06-17 14:10:45" },
          	{ lat:6.251744155319239, lng: -75.57101100683212, date: "2015-06-17 14:10:48" },
          	{ lat:6.251840140597759, lng: -75.57117462158203, date: "2015-06-17 14:10:50" },
          	{ lat:6.251920128316415, lng: -75.57130604982376, date: "2015-06-17 14:10:51" },
          	{ lat:6.25198411848252, lng: -75.57144284248352,  date: "2015-06-17 14:10:55" },
          	{ lat:6.252042776127911, lng: -75.57153135538101, date: "2015-06-17 14:10:57" },
          	{ lat:6.252064106179153, lng: -75.57159304618835, date: "2015-06-17 14:10:59" },
          	{ lat:6.252083558052832, lng:-75.57162148162695,  date: "2015-06-17 14:11:00" },
          	{ lat:6.251980195067321, lng: -75.5717780249646,  date: "2015-06-17 14:11:03"  },
          	{ lat:6.251834171942764, lng: -75.57184605540476, date: "2015-06-17 14:11:06" },
          	{ lat:6.251600162247229, lng:-75.57197577665227,  date: "2015-06-17 14:11:09"  },
          	{ lat:6.251441830339221, lng: -75.57206745936617, date: "2015-06-17 14:11:10" },
          	{ lat:6.2512888309039285, lng: -75.57215645987105,date: "2015-06-17 14:11:11" },
          	{ lat:6.251117167595965, lng: -75.57225350700298, date: "2015-06-17 14:11:13" },
          	{ lat:6.250945504231681, lng: -75.5723290964628,  date: "2015-06-17 14:11:15" },
          	{ lat:6.250791482029795, lng: -75.57240785573902, date: "2015-06-17 14:11:18" },
          	{ lat:6.250491837884766, lng: -75.57256391146927, date: "2015-06-17 14:11:19" },
          	{ lat:6.250347655291581, lng: -75.57265617617304, date: "2015-06-17 14:11:20" },
          	{ lat:6.250114246555376, lng: -75.57275376288828, date: "2015-06-17 14:11:23" },
          	{ lat:6.2499382729506765, lng: -75.5728476402038 ,date: "2015-06-17 14:11:26" },
          	{ lat:6.249653804884941, lng: -75.57299315929413, date: "2015-06-17 14:11:28" },
          	{ lat:6.249552486666967, lng: -75.57304412126541, date: "2015-06-17 14:11:30" },
  		 	{ lat:6.249549404128927, lng:-75.57316297597697,  date: "2015-06-17 14:11:32" },
			{ lat:6.249600063240675, lng:-75.57330379195025,  date: "2015-06-17 14:11:33" },
			{ lat:6.249618727122709, lng:-75.57339632816127,  date: "2015-06-17 14:11:35" },
			{ lat:6.249682717570357, lng:-75.573617610405,    date: "2015-06-17 14:11:37" },
          	{ lat:6.249845776191512, lng: -75.57404458522797, date: "2015-06-17 14:11:38" },
			{ lat:6.249885770204861, lng: -75.57414248585701, date: "2015-06-17 14:11:39" },
			{ lat:6.249923097947872, lng: -75.5742859840393,  date: "2015-06-17 14:11:40" },
			{ lat:6.249995087159041, lng: -75.5745555460453,  date: "2015-06-17 14:11:42" },
			{ lat:6.250037747427652, lng: -75.57468563318253, date: "2015-06-17 14:11:46" },
			{ lat:6.250048412494259, lng: -75.57487741112709, date: "2015-06-17 14:11:49" },
			{ lat:6.250075075159824, lng: -75.57500883936882, date: "2015-06-17 14:11:50" },
			{ lat:6.250112402889351, lng: -75.57515636086464, date: "2015-06-17 14:11:51" },
			{ lat:6.249979089557409, lng: -75.5752395093441,  date: "2015-06-17 14:11:53" },
			{ lat:6.2495789956265915, lng: -75.57524218134034,date: "2015-06-17 14:11:55" },
			{ lat:6.249301703575338, lng: -75.57524754575837, date: "2015-06-17 14:11:56" },
			{ lat:6.248854432536827, lng: -75.57524221614204, date: "2015-06-17 14:11:58" },
			{ lat:6.248198529039234, lng: -75.57525026276909, date: "2015-06-17 14:12:00" },
			{ lat:6.247691936344266, lng:-75.5752529449781,   date: "2015-06-17 14:12:03" },
			{ lat:6.247212005970397, lng: -75.57526233270966, date: "2015-06-17 14:12:05" },
			{ lat:6.246348130188467, lng: -75.57531061247192, date: "2015-06-17 14:12:08" },
			{ lat:6.245119971156246, lng: -75.5753615744432,  date: "2015-06-17 14:12:10" },
			{ lat:6.244272089698731, lng: -75.57541790083252, date: "2015-06-17 14:12:15" },
			{ lat:6.243599626978114, lng: -75.57549032047592, date: "2015-06-17 14:12:18" },
			{ lat:6.243103695041129, lng: -75.57549300268494, date: "2015-06-17 14:12:20" },
			{ lat:6.242722413716509, lng: -75.57547825053535, date: "2015-06-17 14:12:21" },
			{ lat:6.242338465808456, lng: -75.57545276954971, date: "2015-06-17 14:12:22" },
			{ lat:6.241647892126637, lng:-75.57545947507225 , date: "2015-06-17 14:12:23" },
			{ lat:6.241647892126637, lng: -75.57545679286324, date: "2015-06-17 14:12:25" },
			{ lat:6.241434587330478, lng: -75.57544606402718, date: "2015-06-17 14:12:28" },
			{ lat:6.240954651221573, lng: -75.57534950450264, date: "2015-06-17 14:12:30" },
			{ lat:6.240741346143173, lng: -75.57536559775673, date: "2015-06-17 14:12:33" },
			{ lat:6.240165421997697, lng: -75.57537632659279, date: "2015-06-17 14:12:36" },
			{ lat:6.239461513849168, lng: -75.57554798796974, date: "2015-06-17 14:12:37" },
			{ lat:6.238650951779614, lng: -75.57579475119911, date: "2015-06-17 14:12:38" },
			{ lat:6.23808569064711, lng: -75.5759181328138,   date: "2015-06-17 14:12:39" },
			{ lat:6.2372752774904265, lng: -75.5761335292392, date: "2015-06-17 14:12:40" },
			{ lat:6.237253795796254, lng: -75.57630437091194, date: "2015-06-17 14:12:41" },
			{ lat:6.236661869810089, lng: -75.57667719796501, date: "2015-06-17 14:12:43" },
			{ lat:6.23633124419359, lng: -75.57686763480507,  date: "2015-06-17 14:12:45" },
			{ lat:6.236080608506676, lng: -75.57701515630089, date: "2015-06-17 14:12:46" },
			{ lat:6.235771313238545, lng: -75.57711976245247, date: "2015-06-17 14:12:47" },
			{ lat:6.235568671412219, lng: -75.57717072442375, date: "2015-06-17 14:12:48" },
			{ lat:6.235147389470017, lng: -75.57727533057533, date: "2015-06-17 14:12:50" },
			{ lat:6.2346887783634015, lng: -75.57739066556297,date: "2015-06-17 14:12:52" },
			{ lat:6.234310308305135, lng: -75.57746390491059, date: "2015-06-17 14:12:53" },
			{ lat:6.233307760975383, lng: -75.57776967673828, date: "2015-06-17 14:12:54" },
			{ lat:6.232801153883201, lng: -75.57793182931732, date: "2015-06-17 14:12:58" },
			{ lat:6.232673168856186, lng: -75.57835830055069, date: "2015-06-17 14:13:00" },
			{ lat:6.232859813676801, lng: -75.57912809453796, date: "2015-06-17 14:13:01" },
			{ lat:6.233067789255863, lng: -75.57996762595963, date: "2015-06-17 14:13:05" },
			{ lat:6.233617057696402, lng: -75.58020634256195, date: "2015-06-17 14:13:07" },
			{ lat:6.234432960240526, lng: -75.58130873046707, date: "2015-06-17 14:13:09" },
			{ lat:6.236422050666051, lng: -75.58188004098724, date: "2015-06-17 14:13:13" },
			{ lat:6.237275277490465, lng: -75.58145625196289, date: "2015-06-17 14:13:14" },
			{ lat:6.237541910588305, lng: -75.58062476716827, date: "2015-06-17 14:13:17" },
			{ lat:6.23709396690646, lng:-75.5797825535376,    date: "2015-06-17 14:13:18" },
			{ lat:6.236454046697049, lng: -75.57923001848053, date: "2015-06-17 14:13:22" },
			{ lat:6.236070094196505, lng: -75.57917637430023, date: "2015-06-17 14:13:25" },
			{ lat:6.235147540511137, lng: -75.57925415836166, date: "2015-06-17 14:13:28" },
			{ lat:6.235136875141132, lng:-75.5798201044638 ,  date: "2015-06-17 14:13:30" },
			{ lat:6.235654145336983, lng: -75.58000785909485, date: "2015-06-17 14:13:31" },
           ]

       let ListDirFirstLat = this.ListDirs[0].lat;
       let ListDirFirstLng = this.ListDirs[0].lng;
       let ListDirLastestLat = this.ListDirs[this.ListDirs.length -1].lat;
       let ListDirLastestLng = this.ListDirs[this.ListDirs.length -1].lng;
       
       

      this.origen = {lat:ListDirFirstLat, lng:ListDirFirstLng};
      this.final = {lat:ListDirLastestLat, lng:ListDirLastestLng};
      this.show = true;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;

      var mapProp = {
        center: new google.maps.LatLng(this.centrarmap.lat, this.centrarmap.lng),
        zoom:8,
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      
      directionsDisplay.setMap(this.map);
     
       this.drawRoute = {
         origin: this.origen,
         destination: this.final,
         travelMode: 'DRIVING',
         unitSystem: google.maps.UnitSystem.METRIC
        }
      
        directionsService.route(this.drawRoute, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Muestra la Ruta en el Mapa
            directionsDisplay.setDirections(response);
          }
        });


       this.apper();

          //for (var i = 0, length = this.ListDirs.length; i < length; i++) {}


         


      
  }

    //función itera el json de lat long y date - saca la diferencia de date
    apper(){
         
         var interval;
         
         var now = moment(this.ListDirs[this.x+2].date); //segundo objeto date
         var end = moment(this.ListDirs[this.x+1].date); // primer objeto date
         var duration = moment.duration(now.diff(end));
         var seconds = duration.asSeconds();
         var secuencia = seconds*1000;
        // console.log(seconds.toString()); 
        //console.log(secuencia);     
        //this.duration_ += 1000;

            interval = setInterval(()=> { 
              
              clearInterval(interval);
              if(this.x<this.ListDirs.length-1){
                this.apper();
             
              }else{
                 this.x = -1;
                
              }
              
            }, secuencia);   
                 
                 let data = this.ListDirs[this.x],  
                 latLng = new google.maps.LatLng(data.lat, data.lng); 
                // Crear un Marker y lo ponerlo en el mapa
                let marker = new google.maps.Marker({
                  icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  position: latLng,
                  map: this.map,
                  title: ''
                  
                });

                console.log(this.x.toString());

       this.x ++;
    }



}
