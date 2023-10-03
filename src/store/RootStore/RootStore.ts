import CartStore from "store/RootStore/CartStore";
import GlobalStore from "store/RootStore/GlobalStore";
import UserStore from "store/RootStore/UserStore";

export default class RootStore {
	readonly global = new GlobalStore();
	readonly cart = new CartStore();
	readonly user = new UserStore();
}