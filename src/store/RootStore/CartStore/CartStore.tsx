import {action, computed, makeObservable, observable} from "mobx";
import {CartModel} from "models/cart/CartModel";
import {ProductModel} from "models/product";
import {
	CollectionModel,
	getInitialCollectionModel,
	linearizeCollection,
	normalizeCollection
} from "models/shared/collection";

type PrivateFields = "_cartList";

export default class CartStore {
	private _cartList: CollectionModel<number, CartModel> = getInitialCollectionModel();

	constructor() {
		makeObservable<CartStore, PrivateFields>(this, {
			_cartList: observable,

			cartList: computed,
			totalPrice: computed,

			addToCart: action.bound,
			setCartList: action.bound,
			deleteFromCartList: action.bound,
			increaseItemAmount: action.bound,
			decreaseItemAmount: action.bound,
			emptyCartList: action.bound
		});
	}

	get cartList(): CartModel[] {
		return linearizeCollection(this._cartList);
	}

	get totalPrice(): number {
		return linearizeCollection(this._cartList)
			.reduce((sum, item) => sum + item.product.price, 0);
	}

	setCartList(list: CartModel[]) {
		this._cartList = normalizeCollection(list, (item) => item.product.id);
	}

	addToCart(product: ProductModel) {
		const list = linearizeCollection(this._cartList);
		list.push({product, amount: 1});
		this._cartList = normalizeCollection(list, (item) => item.product.id);
		const cartListJSON = JSON.stringify(this.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}

	deleteFromCartList(product: ProductModel) {
		let list = linearizeCollection(this._cartList);
		list = list.filter(item => item.product.id !== product.id);
		this._cartList = normalizeCollection(list, (item) => item.product.id);
		const cartListJSON = JSON.stringify(this.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}

	increaseItemAmount(product: ProductModel) {
		let list = linearizeCollection(this._cartList);
		list = list.map(item => {
			if (item.product.id === product.id) {
				return { ...item, amount: item.amount + 1 };
			}
			return item;
		});
		this._cartList = normalizeCollection(list, (item) => item.product.id);
		const cartListJSON = JSON.stringify(this.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}

	decreaseItemAmount(product: ProductModel) {
		let list = linearizeCollection(this._cartList);
		list = list.map(item => {
			if (item.product.id === product.id) {
				return { ...item, amount: item.amount - 1 };
			}
			return item;
		});
		this._cartList = normalizeCollection(list, (item) => item.product.id);
		const cartListJSON = JSON.stringify(this.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}

	emptyCartList() {
		this._cartList = getInitialCollectionModel();
	}
}