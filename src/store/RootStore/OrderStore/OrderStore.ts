import {action, computed, makeObservable, observable} from "mobx";
import {OrderModel} from "models/order/OrderModel";
import {
	CollectionModel,
	getInitialCollectionModel,
	linearizeCollection,
	normalizeCollection
} from "models/shared/collection";
import rootStore from "store/RootStore";

type PrivateFields = "_orderList";

export default class OrderStore {
	private _orderList: CollectionModel<number, OrderModel> = getInitialCollectionModel();

	constructor() {
		makeObservable<OrderStore, PrivateFields>(this, {
			_orderList: observable,
			orderList: computed,
			addOrder: action.bound,
			setOrderList: action.bound,
			emptyOrderList: action.bound
		});
	}
	
	get orderList(): OrderModel[] {
		return linearizeCollection(this._orderList);
	}

	addOrder(order: OrderModel) {
		const list = linearizeCollection(this._orderList);
		list.push(order);
		this._orderList = normalizeCollection(list, (item) => item.id);
		const orderListJSON = JSON.stringify(this.orderList);
		localStorage.setItem("orderList", orderListJSON);
		localStorage.removeItem("cartList");
		rootStore.cart.emptyCartList();
	}

	setOrderList(list: OrderModel[]) {
		this._orderList = normalizeCollection(list, (item) => item.id);
	}

	emptyOrderList() {
		this._orderList = getInitialCollectionModel();
	}
}