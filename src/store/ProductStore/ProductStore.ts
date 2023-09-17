import {Meta} from "../../utils/meta.ts";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import axios from "axios";
import {
	CategoryApi,
	CategoryModel,
	normalizeCategory,
	normalizeProduct,
	ProductApi,
	ProductModel
} from "../models/product";
import {
	CollectionModel,
	getInitialCollectionModel, getInitialProductItem,
	linearizeCollection,
	normalizeCollection
} from "../models/shared/collection.ts";
import {Option} from "../../components/MultiDropdown/MultiDropdown.tsx";

type PrivateFields = "_productList" | "_meta" | "_totalPages" | "_currentPage" | "_currentList" |
										 "_searchQuery" | "_productItem" | "_relatedItems" | "_resultList" | "_categoryList" |
	                   "_selectedFilters";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';
const CATEGORY_LIST_URL: string = 'https://api.escuelajs.co/api/v1/categories';

export default class ProductStore {
	private _meta: Meta = Meta.initial;

	private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
	private _totalPages: number = 1;
	private _currentPage: number = 1;
	private _currentList: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	private _productItem: ProductModel = getInitialProductItem();
	private _relatedItems: CollectionModel<number, ProductModel> = getInitialCollectionModel();

	private _searchQuery: string = "";
	private _resultList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
	private _categoryList: Option[] = [];
	private _selectedFilters: Option[] = [];

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
			_resultList: observable.ref,
			_categoryList: observable.ref,
			_selectedFilters: observable.ref,

			meta: computed,
			productList: computed,
			totalPages: computed,
			currentPage: computed,
			currentList: computed,
			productItem: computed,
			relatedItems: computed,
			searchQuery: computed,
			resultList: computed,
			categoryList: computed,
			selectedFilters: computed,

			getProductList: action.bound,
			setPage: action.bound,
			getProduct: action.bound,
			getRelatedItems: action.bound,
			setSearchQuery: action.bound,
			getCategoryList: action.bound,
			setFilters: action.bound
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

	get resultList(): ProductModel[] {
		return linearizeCollection(this._resultList);
	}

	get categoryList(): Option[] {
		return this._categoryList;
	}

	get selectedFilters(): Option[] {
		return this._selectedFilters;
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
					this._resultList = this._productList;
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
			this._totalPages = Math.ceil(this._resultList.order.length / 9);
			const currentKeys: number[] = this._resultList.order.slice(page * 9 - 9, page * 9);
			const currentList = currentKeys.map((id) => this._resultList.entities[id]);
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
		const searchResult = linearizeCollection(this._productList)
			.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
		this._resultList = normalizeCollection(searchResult, ((item) => item.id));
	}

	async getCategoryList(): Promise<void> {
		this._meta = Meta.loading;
		this._categoryList = [];

		const response = await axios.get<CategoryApi[]>(CATEGORY_LIST_URL);

		runInAction(() => {
			if (response.status === 200) {
				try {
					const list: CategoryModel[] = [];
					for (const item of response.data) {
						list.push(normalizeCategory(item));
					}
					this._categoryList = list.map((category) => ({
						key: category.id,
						value: category.name,
					}));
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

	setFilters(filters: Option[]) {
		this._selectedFilters = filters;
		if (this._selectedFilters.length === 0) {
			this._resultList = this._productList;
		} else {
			const filterResult = linearizeCollection(this._productList)
				.filter((item) => this._selectedFilters
					.some((filter) => item.category.id === filter.key));
			this._resultList = normalizeCollection(filterResult, ((item) => item.id));
		}
	}
}