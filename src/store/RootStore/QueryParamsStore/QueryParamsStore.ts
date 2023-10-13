import axios from "axios";
import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {MultiDropdownOption} from "components/MultiDropdown/MultiDropdown";
import {CategoryApi, CategoryModel, normalizeCategory} from "models/category/CategoryModel";
import {Meta} from "utils/meta";

type PrivateFields = "_meta" | "_currentPage" | "_searchQuery" | "_selectedFilters" | "_categoryList";

const CATEGORY_LIST_URL: string = 'https://api.escuelajs.co/api/v1/categories';

export default class QueryParamsStore {
	private _meta: Meta = Meta.initial;

	private _currentPage: number = 1;
	private _searchQuery: string = "";
	private _selectedFilters: MultiDropdownOption[] = [];

	private _categoryList: MultiDropdownOption[] = [];

	constructor() {
		makeObservable<QueryParamsStore, PrivateFields>(this, {
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

	get selectedFilters(): MultiDropdownOption[] {
		return this._selectedFilters;
	}

	get categoryList(): MultiDropdownOption[] {
		return this._categoryList;
	}

	setPage(page: number) {
		this._currentPage = page;
	}

	setSearchQuery(value: string) {
		this._searchQuery = value;
	}

	setFilters(filters: MultiDropdownOption[]) {
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