import {Meta} from "../../utils/meta.ts";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import axios from "axios";
import {normalizeProduct, ProductApi, ProductModel} from "../models/product";
import {
	CollectionModel,
	getInitialCollectionModel, getInitialProductItem,
	linearizeCollection,
	normalizeCollection
} from "../models/shared/collection.ts";

type PrivateFields = "_productList" | "_meta" | "_totalPages"
	| "_currentPage" | "_currentList" | "_searchQuery" | "_productItem" | "_relatedItems";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';

export default class ProductStore {
	private _meta: Meta = Meta.initial;

	private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
	private _totalPages: number = 1;
	private _currentPage: number = 1;
	private _currentList: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	private _productItem: ProductModel = getInitialProductItem();
	private _relatedItems: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	private _searchQuery: string = "";

	constructor() {
		makeObservable<ProductStore, PrivateFields>(this, {
			_meta: observable,

			_productList: observable.ref,
			_totalPages: observable,
			_currentPage: observable,
			_currentList: observable.ref,

			_productItem: observable.ref,
			_relatedItems: observable.ref,

			_searchQuery: observable,

			meta: computed,
			productList: computed,
			totalPages: computed,
			currentPage: computed,
			currentList: computed,
			productItem: computed,
			relatedItems: computed,
			searchQuery: computed,

			getProductList: action.bound,
			setPage: action.bound,
			getProduct: action.bound,
			getRelatedItems: action.bound,
			setSearchQuery: action.bound,
		});
	}

	get meta(): Meta {
		return this._meta;
	}

	get productList(): ProductModel[] {
		return linearizeCollection(this._productList);
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

	get productItem(): ProductModel {
		return this._productItem;
	}

	get relatedItems(): ProductModel[] {
		return linearizeCollection(this._relatedItems);
	}

	get searchQuery(): string {
		return this._searchQuery;
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
					this._productList = normalizeCollection(list, ((listItem) => listItem.id));
					this._totalPages = Math.ceil(this._productList.order.length / 9);
					this._meta = Meta.success;
					return;
				} catch {
					this._meta = Meta.error;
				}
			} else {
				this._meta = Meta.error;
			}
		})
	};

	saveCurrentPageToLocalStorage() {
		localStorage.setItem('currentPage', this._currentPage.toString());
	}

	restoreCurrentPageFromLocalStorage() {
		const savedPage = localStorage.getItem('currentPage');
		if (savedPage) {
			this._currentPage = parseInt(savedPage, 10);
		} else {
			this._currentPage = 1;
		}
		this.setPage(this._currentPage);
	}

	setPage(page: number) {
		this._meta =  Meta.loading;
		try {
			this._currentList = getInitialCollectionModel();
			this._currentPage = page;
			const currentKeys: number[] = this._productList.order.slice(page * 9 - 9, page * 9);
			const currentList = currentKeys.map((id) => this._productList.entities[id]);
			this._currentList = normalizeCollection(currentList, ((item) => item.id));
		} catch {
			this._meta = Meta.error;
		}
	}

	async getProduct(id: number): Promise<void> {
		this._meta = Meta.loading;
		this._productItem = getInitialProductItem();

		const response = await axios.get<ProductApi>(`${PRODUCT_LIST_URL}/${id}`);

		runInAction(() => {
			if (response.status === 200) {
				try {
					this._productItem = normalizeProduct(response.data);
					this._meta = Meta.success;
					return;
				} catch {
					this._meta = Meta.error;
				}
			} else {
				this._meta = Meta.error;
			}
		})
	};

	getRelatedItems() {
		this._meta = Meta.loading;
		try {
			this._relatedItems = getInitialCollectionModel();
			const productList = linearizeCollection(this._productList)
				.filter((item) => item.category.name = this._productItem.category.name)
				.filter((item) => item.id !== this._productItem.id);
			console.log(productList);

			const randomItems: ProductModel[] = [];
			let maxRandomItems: number = 0;
			if (productList.length >= 3) {
				maxRandomItems = 3;
			} else {
				maxRandomItems = productList.length;
			}

			while (randomItems.length < maxRandomItems && productList.length > 0) {
				const randomIndex = Math.floor(Math.random() * productList.length);
				const randomItem = productList.splice(randomIndex, 1)[0];
				randomItems.push(randomItem);
			}

			this._relatedItems = normalizeCollection(randomItems, ((item) => item.id));
		} catch {
			this._meta = Meta.error;
		}
	}

	setSearchQuery(value: string) {
		this._searchQuery = value;
	}
}