import React from 'react';

export type IconProps = {
	className?: string;
	width?: number;
	height?: number;
	color?: string;
	icon?: React.ReactNode;
	rotate?: boolean;
};

const Icon: React.FC<IconProps> = ({
																		 className,
																		 width = 24,
																		 height = 24,
																		 color = 'inherit',
																		 icon,
																	 }) => {

	return (
		<div className={`${className}`} style={{width, height, color}}>
			{icon}
		</div>
	);
};

export default Icon;