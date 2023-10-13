import {CategoryApi, CategoryModel, normalizeCategory} from "models/category/CategoryModel";

export type ProductApi = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: CategoryApi;
};

export type ProductModel = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: Date | undefined;
	updatedAt: Date | undefined;
	category: CategoryModel;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
	id: from.id,
	title: from.title,
	price: from.price,
	description: from.description,
	images: from.images,
	creationAt: new Date(from.creationAt),
	updatedAt: new Date(from.updatedAt),
	category: normalizeCategory(from.category)
});