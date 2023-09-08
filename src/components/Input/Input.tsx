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
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({
		 value,
		 onChange,
		 afterSlot,
		 disabled = false,
		 width= "300px",
		 height,
		 placeholder,
		 ...props
	 }) => {

		function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
			const currentValue = event?.target.value
			if (onChange) {
				onChange(currentValue)
			}
		}

		return (
			<>
				<input type="text" value={value} placeholder={placeholder} disabled={disabled}
							 onChange={handleChange} className={`${styles.input}`} {...props}
							 style={{
											 height: height,
											 width: width
							 }} />
				<label className={`${styles.label}`}
								style={{
									bottom: `calc((${height ?? '52px'} - 24px) / 2)`,
									left: `calc(${width ?? '300px'} - 24px - 12px)`
								}}
				>{afterSlot ? afterSlot : null}</label>
			</>
		);
	});

export default Input;