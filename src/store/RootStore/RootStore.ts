import CartStore from "store/RootStore/CartStore";
import GlobalStore from "store/RootStore/GlobalStore";

export default class RootStore {
	readonly global = new GlobalStore();
	readonly cart = new CartStore();
}