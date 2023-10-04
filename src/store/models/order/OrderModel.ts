import {CartModel} from "models/cart/cartItem";

export type OrderModel = {
	id: number
	dateTime: Date;
	items: CartModel[];
	sum: number;
}