import {Meta} from "../../utils/meta.ts";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import axios from "axios";
import {normalizeProduct, ProductApi, ProductModel} from "../models/product";
import {
	CollectionModel,
	getInitialCollectionModel,
	linearizeCollection,
	normalizeCollection
} from "../models/shared/collection.ts";

type PrivateFields = "_productList" | "_meta" | "_totalPages" | "_currentPage" | "_currentList";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';

export default class ProductListStore {
	private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
	private _meta: Meta = Meta.initial;
	private _totalPages: number = 1;
	private _currentPage: number = 1;
	private _currentList: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	constructor() {
		makeObservable<ProductListStore, PrivateFields>(this, {
			_productList: observable.ref,
			_meta: observable,
			_totalPages: observable,
			_currentPage: observable,
			_currentList: observable.ref,
			productList: computed,
			meta: computed,
			totalPages: computed,
			currentPage: computed,
			currentList: computed,
			getProductList: action.bound,
			setPage: action.bound
		});
	}

	get productList(): ProductModel[] {
		return linearizeCollection(this._productList);
	}

	get meta(): Meta {
		return this._meta;
	}

	get totalPages(): number {
		return this._totalPages;
	}

	get currentPage(): number {
		return this._currentPage;
	}

	get currentList(): ProductModel[]  {
		return linearizeCollection(this._currentList);
	}

	async getProductList(): Promise<void> {
		this._meta = Meta.loading;
		this._productList = getInitialCollectionModel();

		const response = await axios.get<ProductApi[]>(PRODUCT_LIST_URL);

		runInAction(() => {
			if (response.status === 200) {
				try {
					const list: ProductModel[] = [];
					for (const item of response.data) {
						list.push(normalizeProduct(item));
					}
					this._meta = Meta.success;
					this._productList = normalizeCollection(list, ((listItem) => listItem.id));
					this._totalPages = Math.ceil(this._productList.order.length / 9);
					return;
				} catch {
					this._meta = Meta.error;
				}
			}

			this._meta = Meta.error;
		})
	};

	setPage(page: number) {
		this._currentList = getInitialCollectionModel();
		this._currentPage = page;
		const currentKeys: number[] = this._productList.order.slice(page * 9 - 9, page * 9);
		const currentList = currentKeys.map((id) => this._productList.entities[id]);
		this._currentList = normalizeCollection(currentList, ((listItem) => listItem.id));
	}
}