import React, {SVGProps} from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	width?: number;
	height?: number;
	color?: string;
	icon?: React.ReactNode;
	rotate?: string;
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