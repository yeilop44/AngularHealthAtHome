import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
	@ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;

	ListDirs: any[];



  constructor() { }

  ngOnInit() {
  	//arrays de recorrido
	this.ListDirs = [
	  { lat: 6.2500271, lng:-75.5681333 },
	  { lat:6.25013066515123, lng:-75.56849387538932 },
	  { lat:6.250270954618633, lng: -75.56842998998036},
	  { lat:6.250429907901519, lng: -75.56837951561647},
	  { lat:6.250564864760729, lng:-75.56842828298613 },
	  { lat:6.25060383609733, lng: -75.56854142337215},
	  { lat:6.25067480259319, lng: -75.5686787036393},
	  { lat:6.250708441395095, lng:-75.56877306856222},
	  { lat:6.250766076562103, lng: -75.56887011569415},
	  { lat:6.250823711722749, lng: -75.56900203154328},
	  { lat:6.250873348089851, lng: -75.56909907867521},
	  { lat:6.250925650714401, lng:-75.56922831231532 },
	  { lat:6.250987558524169, lng: -75.56934901245768},
	  { lat:6.251053192444991, lng: -75.56947288167976},
	  { lat:6.251081498699873, lng:-75.56955651776661 },
	  { lat:6.251174196819546, lng: -75.56973793276484},
	  { lat:6.251233165065529, lng:-75.56985643756889 },
	  { lat:6.251267943460775, lng: -75.56994681293838},
	  { lat:6.251306442861838, lng: -75.57002663669459},
	  { lat:6.25136909997309, lng: -75.5702177440869},
	  { lat:6.251502412950756, lng: -75.57047255394332},
	  { lat:6.251561070650177, lng: -75.57064153311126},
	  { lat:6.2516677209959015, lng: -75.57086415645949},
	  { lat:6.251744155319239, lng: -75.57101100683212},
	  { lat:6.251840140597759, lng: -75.57117462158203},
	  { lat:6.251920128316415, lng: -75.57130604982376},
	  { lat:6.25198411848252, lng: -75.57144284248352},
	  { lat:6.252042776127911, lng: -75.57153135538101},
	  { lat:6.252064106179153, lng: -75.57159304618835},
	  { lat:6.252083558052832, lng:-75.57162148162695 },
	  { lat:6.251980195067321, lng: -75.5717780249646 },
	  { lat:6.251834171942764, lng: -75.57184605540476},
	  { lat:6.251600162247229, lng:-75.57197577665227 },
	  { lat:6.251441830339221, lng: -75.57206745936617},
	  { lat:6.2512888309039285, lng: -75.57215645987105},
	  { lat:6.251117167595965, lng: -75.57225350700298},
	  { lat:6.250945504231681, lng: -75.5723290964628},
	  { lat:6.250791482029795, lng: -75.57240785573902},
	  { lat:6.250491837884766, lng: -75.57256391146927},
	  { lat:6.250347655291581, lng: -75.57265617617304},
	 ]

  	var mapProp = {
      center: new google.maps.LatLng(this.ListDirs[0].lat, this.ListDirs[0].lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

	
		for (var i = 0, length = this.ListDirs.length; i < length; i++) {
		 	
		 	 let data = this.ListDirs[i],
		      latLng = new google.maps.LatLng(data.lat, data.lng); 

		  // Creating a marker and putting it on the map
		  let marker = new google.maps.Marker({
		    position: latLng,
		    map: this.map,
		    title: ''
		  });
		}






  }



}
