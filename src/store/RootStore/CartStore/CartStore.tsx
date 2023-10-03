import {action, computed, makeObservable, observable} from "mobx";
import {ProductModel} from "models/product";
import {
	CollectionModel,
	getInitialCollectionModel,
	linearizeCollection,
	normalizeCollection
} from "models/shared/collection";
import rootStore from "store/RootStore";

type PrivateFields = "_cartList";

export default class CartStore {
	private _cartList: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	constructor() {
		makeObservable<CartStore, PrivateFields>(this, {
			_cartList: observable,

			cartList: computed,
			totalPrice: computed,

			addToCart: action.bound,
			setCartList: action.bound,
			deleteFromCartList: action.bound
		});
	}

	get cartList(): ProductModel[] {
		return linearizeCollection(this._cartList);
	}

	get totalPrice(): number {
		return linearizeCollection(this._cartList)
			.reduce((sum, item) => sum + item.price, 0);
	}

	setCartList(list: ProductModel[]) {
		this._cartList = normalizeCollection(list, (product) => product.id);
	}

	addToCart(product: ProductModel) {
		const list = linearizeCollection(this._cartList);
		list.push(product);
		this._cartList = normalizeCollection(list, (product) => product.id);
		const cartListJSON = JSON.stringify(rootStore.cart.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}

	deleteFromCartList(product: ProductModel) {
		let list = linearizeCollection(this._cartList);
		list = list.filter(item => item.id !== product.id);
		this._cartList = normalizeCollection(list, (product) => product.id);
		const cartListJSON = JSON.stringify(rootStore.cart.cartList);
		localStorage.setItem("cartList", cartListJSON);
	}
}