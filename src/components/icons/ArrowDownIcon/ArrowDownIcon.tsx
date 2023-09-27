import React from 'react';
import Icon from '../Icon';
import {IconProps} from "components/Icons/Icon/Icon";
import {Colors} from "utils/colors";

const ArrowDownIcon: React.FC<IconProps> = (props) => {

	const {icon: _, ...restProps} = props;
	const color = Colors[props.color as keyof typeof Colors];

	return (
		<Icon icon={
			<svg width="current" height="current" viewBox="0 0 24 24" fill={color}
					 xmlns="http://www.w3.org/2000/svg" {...restProps}>
				<path fillRule="evenodd" clipRule="evenodd"
							d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
							fill="current"/>
			</svg>
		}/>
	);
};

export default ArrowDownIcon;
