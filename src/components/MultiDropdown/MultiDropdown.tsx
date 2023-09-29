import React, {useEffect, useRef, useState} from 'react';
import styles_input from 'components/Input/Input.module.scss';
import Input from 'components/Input';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
	key: number;
	value: string;
};


const OPTIONS = [
	{key: 1, value: 'Moscow'},
	{key: 2, value: 'Saint Petersburg'},
	{key: 3, value: 'Ekaterinburg'},
];


export type MultiDropdownProps = {
	className?: string;
	options?: Option[];
	selectedOptions: Option[];
	multiselect: boolean;
	onChange: (value: Option[]) => void;
	disabled?: boolean;
	getValues: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
																											 className,
																											 options = OPTIONS,
																											 selectedOptions,
																											 onChange,
	                                                     multiselect,
																											 disabled: initialDisabled,
	                                                     getValues,
																											 ...props
																										 }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [disabled, setDisabled] = useState(initialDisabled);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			setFilteredOptions(options);
		}
	}, [isOpen, options]);

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	useEffect(() => {
		setDisabled(initialDisabled);
	}, [initialDisabled]);

	const handleInputChange = (newValue: string) => {
		if (disabled) {
			return;
		}
		const filtered = options.filter((option) =>
			option.value.toLowerCase().includes(newValue.toLowerCase())
		);
		setFilteredOptions(filtered);
	};

	const handleOptionClick = (clickedOption: Option) => {
		const isSelected = selectedOptions.some((option) => option.key === clickedOption.key);
		if (isSelected) {
			onChange(selectedOptions.filter((option) => option.key !== clickedOption.key));
		} else {
			if (!multiselect) {
				selectedOptions = [];
			}
			onChange([clickedOption]);
		}
	};

	const handleDocumentClick = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleIconClick = () => {
		setIsOpen(true);
	}

	return (
		<div className={`${styles["multi-dropdown"]} ${className}`} ref={dropdownRef}>
			<Input
				placeholder={selectedOptions.length === 0 ? 'Filter' : undefined}
				value={getValues(selectedOptions)}
				onChange={handleInputChange}
				disabled={disabled}
				afterSlot={<ArrowDownIcon color="secondary" onClick={handleIconClick}/>}
				className={styles_input.input}
				width="300px"
				{...props}
			/>
			{isOpen && !disabled && (
				<ul className={styles["options-list"]}>
					{filteredOptions.map((option) => (
						<li
							key={option.key}
							className={
								`${styles["options-list__option"]} 
								${selectedOptions.some((selected) => selected.key === option.key) 
									&& styles["options-list__option--selected"]}`}
							onClick={() => handleOptionClick(option)}
						>
							{option.value}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiDropdown;