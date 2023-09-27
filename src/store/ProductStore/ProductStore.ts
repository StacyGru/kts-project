import axios from "axios";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {
	normalizeProduct,
	ProductApi,
	ProductModel
} from "models/product";
import {
	CollectionModel,
	getInitialCollectionModel, getInitialProductItem,
	linearizeCollection,
	normalizeCollection
} from "models/shared/collection";
import rootStore from "store/RootStore";
import {Meta} from "utils/meta";

type PrivateFields = "_meta" | "_productList" | "_totalPages" | "_productItem" | "_relatedItems";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';

export default class ProductStore {
	private _meta: Meta = Meta.initial;

	private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
	private _totalPages: number = 1;

	private _productItem: ProductModel = getInitialProductItem();
	private _relatedItems: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	constructor() {
		makeObservable<ProductStore, PrivateFields>(this, {
			_meta: observable,
			_productList: observable.ref,
			_totalPages: observable,
			_productItem: observable.ref,
			_relatedItems: observable.ref,

			meta: computed,
			productList: computed,
			totalPages: computed,
			productItem: computed,
			relatedItems: computed,

			getProductList: action.bound,
			getProduct: action.bound,
			getRelatedItems: action.bound,
		});
	}

	get meta(): Meta {
		return this._meta;
	}

	get productList(): ProductModel[] {
		const list = linearizeCollection(this._productList);
		this._totalPages = Math.ceil(list.length / 9);
		return list;
	}

	get productItem(): ProductModel {
		return this._productItem;
	}

	get relatedItems(): ProductModel[] {
		return linearizeCollection(this._relatedItems);
	}

	get totalPages(): number {
		return this._totalPages;
	}

	async getProductList(
		title: string | null = rootStore.global.searchQuery,
		categoryId: number[] = rootStore.global.selectedFilters.map((filter) => filter.key)
	): Promise<void> {

		this._meta = Meta.loading;
		this._productList = getInitialCollectionModel();

		const response = await axios.get<ProductApi[]>(
			PRODUCT_LIST_URL, {
				params: {
					title: title,
					categoryId: categoryId[0]
				}
			}
		);

		runInAction(() => {
			if (response.status === 200) {
				try {
					const list: ProductModel[] = [];
					for (const item of response.data) {
						list.push(normalizeProduct(item));
					}
					this._productList = normalizeCollection(list, ((listItem) => listItem.id));
					this._meta = Meta.success;
					return;
				} catch {
					this._meta = Meta.error;
				}
			} else {
				this._meta = Meta.error;
			}
		});
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
					rootStore.global.setPage(1);
					return;
				} catch {
					this._meta = Meta.error;
				}
			} else {
				this._meta = Meta.error;
			}
		});
	}

	getRelatedItems() {
		this._meta = Meta.loading;
		try {
			this._relatedItems = getInitialCollectionModel();
			const productList = linearizeCollection(this._productList)
				.filter((item) => item.category.name = this._productItem.category.name)
				.filter((item) => item.id !== this._productItem.id);

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
}