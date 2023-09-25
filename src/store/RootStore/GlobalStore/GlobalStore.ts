import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {Option} from "components/MultiDropdown/MultiDropdown";
import {CategoryApi, CategoryModel, normalizeCategory} from "../../models/product";
import {Meta} from "utils/meta";
import axios from "axios";

type PrivateFields = "_meta" | "_currentPage" | "_searchQuery" | "_selectedFilters" | "_categoryList";



const CATEGORY_LIST_URL: string = 'https://api.escuelajs.co/api/v1/categories';

class GlobalStore {
	private _meta: Meta = Meta.initial;

	private _currentPage: number = 1;
	private _searchQuery: string = "";
	private _selectedFilters: Option[] = [];

	private _categoryList: Option[] = [];

	constructor() {
		makeObservable<GlobalStore, PrivateFields>(this, {
			_meta: observable,
			_currentPage: observable,
			_searchQuery: observable,
			_selectedFilters: observable.ref,
			_categoryList: observable.ref,

			meta: computed,
			currentPage: computed,
			searchQuery: computed,
			selectedFilters: computed,
			categoryList: computed,

			setPage: action.bound,
			setSearchQuery: action.bound,
			getCategoryList: action.bound,
			setFilters: action.bound
		});
	}

	get meta(): Meta {
		return this._meta;
	}

	get currentPage(): number {
		return this._currentPage;
	}

	get searchQuery(): string {
		return this._searchQuery;
	}

	get selectedFilters(): Option[] {
		return this._selectedFilters;
	}

	get categoryList(): Option[] {
		return this._categoryList;
	}

	setPage(page: number) {
		this._currentPage = page;
	}

	setSearchQuery(value: string) {
		this._searchQuery = value;
	}

	setFilters(filters: Option[]) {
		this._selectedFilters = filters;
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
}

export default new GlobalStore();