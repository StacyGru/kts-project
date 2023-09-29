import React from 'react';
import styles from "./Input.module.scss";

export type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'value'
> & {
	defaultValue?: string,
	value?: string;
	onChange?: (value: string) => void;
	afterSlot?: React.ReactNode;
	disabled?: boolean;
	width?: string;
	height?: string;
	flexGrow?: string;
	placeholder?: string;
	onKeyDown?: (Event: never) => void;
};

const Input: React.FC<InputProps> = ({
	defaultValue,
	value,
	onChange,
	afterSlot,
	disabled = false,
	width ,
	height,
	flexGrow,
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
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				className={styles.input}
				{...props}
				style={{
					height: height,
					width: width,
					flexGrow: flexGrow
				}}
			/>
			{afterSlot
				? <label
						className={styles.label}
						style={{
							bottom: `calc((${height ?? '52px'} - 24px) / 2)`,
							left: `calc(${width ?? '300px'} - 24px - 12px)`
						}}
					>
						{afterSlot}
					</label>
				: null}
		</>
	);
};

export default Input;