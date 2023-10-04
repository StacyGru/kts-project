import {CartModel} from "models/cart/CartModel";

export type OrderModel = {
	id: number
	dateTime: Date;
	items: CartModel[];
	sum: number;
}