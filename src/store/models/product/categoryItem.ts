import {CategoryApi, CategoryModel} from "./productItem.ts";

export type CategoryApi = {
	id: number;
	name: string;
	image: string;
	creationAt: string;
	updatedAt: string;
}

export type CategoryModel = {
	id: number;
	name: string;
	image: string;
	creationAt: Date | undefined;
	updatedAt: Date | undefined;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
	id: from.id,
	name: from.name,
	image: from.image,
	creationAt: new Date(from.creationAt),
	updatedAt: new Date(from.updatedAt),
});