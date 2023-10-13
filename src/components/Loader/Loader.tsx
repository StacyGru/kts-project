import React from 'react';
import styles from "./Loader.module.scss";

export type LoaderProps = {
	size?: 's' | 'm' | 'l';
	className?: string;
	color?: 'white' | 'primary';
};

const Loader: React.FC<LoaderProps> = ({size, className, color = 'primary'}) => (
	<div
		className={`${styles.container} ${size && styles[`container__loader--${size}`]} ${className}`}
	>
		<div
			className={`${styles.container__loader} ${color === 'white' && styles["container__loader--white"]}`}
		>
		</div>
	</div>
);

export default Loader;
