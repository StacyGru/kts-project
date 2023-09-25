import classNames from 'classnames';
import React from 'react';
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	children: React.ReactNode;
	className?: string;
	color?: 'white' | 'accent';
};

const Button: React.FC<ButtonProps> = ({
																				 loading,
																				 children,
																				 className,
																				 color,
																				 ...restProps
																			 }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!loading && !restProps.disabled && restProps.onClick) {
			restProps.onClick(e);
		}
	};

	return (
		<button
			className={classNames(className, (loading && !restProps.disabled) && styles.loading_only,
				styles.button, color === 'white' ? styles.button_white : styles.button_accent)}
			{...restProps}
			onClick={handleClick}
			disabled={restProps.disabled || loading}
		>
			{loading && <Loader size="s" color="white"/>}
			<Text view="button" className={styles.button_text}>{children}</Text>
		</button>
	);
};

export default React.memo(Button);