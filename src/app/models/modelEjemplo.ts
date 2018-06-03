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