export interface Usuario{
	id?:string;
	user?:string;
	password?:string;
}

interface Category{
	id:string;
	name:string;
}

interface Regist{
	id?:any;
	time?:any;
	user?:any;
}

export interface Product{
	id:string;
	category:Category;
	name:string;
	eachPrice:number;
	description:string;
	medical_characteristics:string;
	photos?:any[];	
	volume:string;
	platform:string;
	regist?:Regist;
}


interface ProductOrd{
	id:string;
	category:Category;
	name:string;
	eachPrice:number;
	description:string;
	medical_characteristics:string;
	photos:any[];	
	volume:string;
	platform:string;
	quantity: number;
	
}

interface destination{
	latitude:number;
	longitude:number;
}
interface origin{
	latitude:number;
	longitude:number;
}
interface path{
	latitude:number;
	longitude:number;
}

interface trackingInfo{
	destination:destination;
	origin:origin;
	path:path[];
}

export interface Item{
	productOrd: ProductOrd[];
	trackingInfo: trackingInfo;
	
}