import {ProductModel} from "../product";

export type CollectionModel<K extends string | number, T> = {
	order: K[];
	entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
	order: [],
	entities: {}
});

export const getInitialProductItem = (): ProductModel => ({
	id: 0,
	title: "",
	price: 0,
	description: "",
	images: [],
	creationAt: undefined,
	updatedAt: undefined,
	category: {
		id: 0,
		name: "",
		image: "",
		updatedAt: undefined,
		creationAt: undefined,
	},
});

export const normalizeCollection = <K extends string | number, T>(
	elements: T[],
	getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
	const collection: CollectionModel<K, T> = getInitialCollectionModel();

	elements.forEach((el) => {
		const id = getKeyForElement(el);
		collection.order.push(id);
		collection.entities[id] = el;
	})

	return collection;
}

export const linearizeCollection = <K extends string | number, T>(
	elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);