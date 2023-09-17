import React from 'react';
import styles from "./Input.module.scss";

export type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'value'
> & {
	/** Значение поля */
	value?: string;
	/** Callback, вызываемый при вводе данных в поле */
	onChange?: (value: string) => void;
	/** Слот для иконки справа */
	afterSlot?: React.ReactNode;
	disabled?: boolean;
	width?: string;
	height?: string;
	placeholder?: string;
	onKeyDown?: (Event: never) => void;
};

const Input: React.FC<InputProps> = ({
	                                     value,
	                                     onChange,
	                                     afterSlot,
	                                     disabled = false,
	                                     width = "300px",
	                                     height,
	                                     placeholder,
	                                     onKeyDown,
	                                     ...props
                                     }) => {

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event && onChange) {
			onChange(event.target.value)
		}
	}

	return (
		<>
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				className={styles.input}
				{...props}
				style={{
					height: height,
					width: width
				}}
			/>
			<label
				className={styles.label}
				style={{
					bottom: `calc((${height ?? '52px'} - 24px) / 2)`,
					left: `calc(${width ?? '300px'} - 24px - 12px)`
				}}
			>
				{afterSlot ? afterSlot : null}
			</label>
		</>
	);
};

export default Input;