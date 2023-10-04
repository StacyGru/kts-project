import axios from "axios";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {JWTModel} from "models/product/JWTItem";
import {UserModel} from "models/product/userItem";
import rootStore from "store/RootStore";
import {Meta} from "utils/meta";

type PrivateFields = "_meta" | "_tokens" | "_user";

const LOGIN_URL: string = 'https://api.escuelajs.co/api/v1/auth/login';
const USER_URL: string = 'https://api.escuelajs.co/api/v1/auth/profile';
const REFRESH_URL: string = 'https://api.escuelajs.co/api/v1/auth/refresh-token';

export default class UserStore {
	private _meta: Meta = Meta.initial;
	private _tokens: JWTModel | undefined;
	private _user: UserModel | undefined;

	constructor() {
		makeObservable<UserStore, PrivateFields>(this, {
			_meta: observable,
			_tokens: observable.ref,
			_user: observable.ref,

			meta: computed,
			tokens: computed,
			user: computed,

			setTokens: action.bound,
			logIn: action.bound,
			getUser: action.bound,
			refreshToken: action.bound,
			logOut: action.bound
		});
	}

	get meta(): Meta {
		return this._meta;
	}

	get tokens(): JWTModel | undefined {
		return this._tokens;
	}

	get user(): UserModel | undefined {
		return this._user;
	}

	setTokens(response: JWTModel) {
		this._tokens = response;
		const JWTJSON = JSON.stringify(rootStore.user.tokens);
		localStorage.setItem("JWT", JWTJSON);
	}

	async logIn(email: string, password: string) {
		this._meta = Meta.loading;
		const response = await axios.post(
			LOGIN_URL, {
				email,
				password
		});

		runInAction(() => {
			try {
				this.setTokens(response.data);
				this._meta = Meta.success;
				return;
			} catch {
				this._meta = Meta.error;
			}
		});
	}

	async getUser() {
		this._meta = Meta.loading;
		let retries = 0;
		const maxRetries = 3;

		while (retries < maxRetries) {
			if (this.tokens && this.tokens.access_token) {
				const response = await axios.get<UserModel>(USER_URL, {
					headers: {
						Authorization: `Bearer ${this.tokens.access_token}`
					}
				});

				if (response.status === 401) {
					await this.refreshToken();
					retries++;
					continue;
				}

				runInAction(() => {
					try {
						this._user = response.data;
						this._meta = Meta.success;
						return;
					} catch {
						this._meta = Meta.error;
					}
				});

				break;
			}
		}

		if (retries === maxRetries) {
			this._meta = Meta.error;
		}
	}

	async refreshToken() {
		this._meta = Meta.loading;

		if (this.tokens && this.tokens.refresh_token) {
			const response = await axios.get<JWTModel>(REFRESH_URL, {
				headers: {
					refreshToken: this.tokens.refresh_token
				}
			});

			runInAction(() => {
				try {
					this.setTokens(response.data);
					this._meta = Meta.success;
					return;
				} catch {
					this._meta = Meta.error;
				}
			});
		}
	}

	logOut() {
		this._user = undefined;
		this._tokens = undefined;
		rootStore.order.emptyOrderList();
		localStorage.removeItem("JWT");
		localStorage.removeItem("orderList");
	}
}