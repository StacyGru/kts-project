import React, {useEffect, useRef, useState} from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Input from 'components/Input';
import styles_input from 'components/Input/Input.module.scss';
import styles from './MultiDropdown.module.scss';

export type MultiDropdownOption = {
	key: number;
	value: string;
};

export type MultiDropdownProps = {
	className?: string;
	options: MultiDropdownOption[];
	selectedOptions: MultiDropdownOption[];
	multiselect: boolean;
	onChange: (value: MultiDropdownOption[]) => void;
	disabled?: boolean;
	getValues: (value: MultiDropdownOption[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
																											 className,
																											 options,
																											 selectedOptions,
																											 onChange,
	                                                     multiselect,
																											 disabled: initialDisabled,
	                                                     getValues,
																											 ...props
																										 }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
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
		if (disabled || selectedOptions.length > 0) {
			return;
		}
		setInputValue(newValue);
		setIsOpen(true);
		const filtered = options.filter((option) =>
			option.value.toLowerCase().includes(newValue.toLowerCase())
		);
		setFilteredOptions(filtered);
	};

	const handleOptionClick = (clickedOption: MultiDropdownOption) => {
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
				value={selectedOptions.length === 0 ? inputValue : getValues(selectedOptions)}
				onChange={handleInputChange}
				disabled={disabled}
				afterSlot={<ArrowDownIcon width={24} height={24} color="secondary" onClick={handleIconClick}/>}
				className={styles_input.input}
				width="300px"
				{...props}
			/>
			{isOpen && !disabled && (
				<ul
					className={styles["options-list"]}
					style={{
						height: filteredOptions.length < 5 ? `auto` : `${47 * 5}px`,
						overflowY: filteredOptions.length < 5 ? `auto` : `scroll`
					}}>
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