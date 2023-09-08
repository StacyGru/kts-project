import React from 'react';

export type IconProps = {
	className?: string;
	width?: number;
	height?: number;
	color?: string;
	icon?: React.ReactNode;
};

const Icon: React.FC<IconProps> = ({
																		 className,
																		 width = 24,
																		 height = 24,
																		 color = 'inherit',
																		 icon,
																	 }) => {

	return (
		<div className={`div-icon ${className}`} style={{width, height, color}}>
			{icon}
		</div>
	);
};

export default Icon;