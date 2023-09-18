import React, {useEffect, useRef, useState} from 'react';
import styles_input from 'components/Input/Input.module.scss';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
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
	onChange: (value: Option[]) => void;
	disabled?: boolean;
	getValues: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
																											 className,
																											 options = OPTIONS,
																											 selectedOptions,
																											 onChange,
																											 disabled: initialDisabled,
	                                                     getValues,
																											 ...props
																										 }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [disabled, setDisabled] = useState(initialDisabled);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setFilteredOptions(options);
			if (inputRef.current) {
				inputRef.current.focus();
			}
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
			onChange([...selectedOptions, clickedOption]);
		}
	};

	const handleDocumentClick = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
			setIsFocused(false);
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleIconClick = () => {
		setIsOpen(true);
	}

	return (
		<div className={`${styles.multidropdown} ${className}`} ref={dropdownRef}>
			<Input
				ref={inputRef}
				placeholder={selectedOptions.length === 0 ? 'Filters' : undefined}
				value={getValues(selectedOptions)}
				onChange={handleInputChange}
				onFocus={handleFocus}
				disabled={disabled}
				afterSlot={<ArrowDownIcon color="secondary"/>}
				className={`${styles_input.input} ${isFocused && styles.focused}`}
				onIconClick={handleIconClick}
				{...props}
			/>
			{isOpen && !disabled && (
				<ul className={styles.options_list}>
					{filteredOptions.map((option) => (
						<li
							key={option.key}
							className={`${styles.option} ${selectedOptions.some((selected) => selected.key === option.key) && styles.selected}`}
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