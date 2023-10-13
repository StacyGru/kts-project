import React, {useEffect} from "react";
import MultiDropdown, {MultiDropdownOption} from "components/MultiDropdown/MultiDropdown";
import ProductStore from "store/ProductStore";
import rootStore from "store/RootStore";

export type FiltersProps = {
	categoryList: MultiDropdownOption[],
	selectedFilters: MultiDropdownOption[],
	productStore: ProductStore,
	handlePageChange: (page: number) => void
}

const Filters: React.FC<FiltersProps> = ({
		categoryList,
		selectedFilters,
		productStore,
    handlePageChange
	}) => {

	useEffect(() => {
		rootStore.queryParams.getCategoryList();
	}, []);

	const handleMultiDropdownChange = (newValue: MultiDropdownOption[]) => {
		rootStore.queryParams.setFilters(newValue);
		productStore.getProductList();
		handlePageChange(1);
	};

	return (
		<MultiDropdown
			multiselect={false}
			options={categoryList}
			selectedOptions={selectedFilters}
			onChange={handleMultiDropdownChange}
			getValues={(values: MultiDropdownOption[]) => `${values.map(({ value }) => value).join(', ')}`}
		/>
	);
}

export default Filters;