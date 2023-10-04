import CartStore from "store/RootStore/CartStore";
import OrderStore from "store/RootStore/OrderStore";
import QueryParamsStore from "store/RootStore/QueryParamsStore";
import UserStore from "store/RootStore/UserStore";

export default class RootStore {
	readonly queryParams = new QueryParamsStore();
	readonly cart = new CartStore();
	readonly user = new UserStore();
	readonly order = new OrderStore();
}