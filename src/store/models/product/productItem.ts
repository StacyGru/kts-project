export type ProductApi = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: {
		id: number;
		name: string;
		image: string;
		creationAt: string;
		updatedAt: string;
	};
};

export type ProductModel = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: Date;
	updatedAt: Date;
	category: {
		id: number;
		name: string;
		image: string;
		creationAt: Date;
		updatedAt: Date;
	};
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
	id: from.id,
	title: from.title,
	price: from.price,
	description: from.description,
	images: from.images,
	creationAt: new Date(from.creationAt),
	updatedAt: new Date(from.updatedAt),
	category: {
		id: from.category.id,
		name: from.category.name,
		image: from.category.image,
		creationAt: new Date(from.category.creationAt),
		updatedAt: new Date(from.category.updatedAt),
		}
});