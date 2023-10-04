import {ProductModel} from "models/product";

export type CartModel = {
	amount: number;
	product: ProductModel;
}