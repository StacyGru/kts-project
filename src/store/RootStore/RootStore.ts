import GlobalStore from "store/RootStore/GlobalStore";

export default class RootStore {
	readonly global = new GlobalStore();
}