import React from 'react';
import {IconProps} from "components/icons/Icon/Icon";
import {Colors} from "utils/colors";
import Icon from '../Icon';

const MinusIcon: React.FC<IconProps> = (props) => {

	const {icon: _, ...restProps} = props;
	const color = Colors[props.color as keyof typeof Colors];

	return (
		<Icon icon={
			<svg width="30px" height="30px" viewBox="0 0 30 30" fill={color} xmlns="http://www.w3.org/2000/svg" {...restProps}>
				<path d="M5.625 15C5.625 14.7514 5.72377 14.5129 5.89959 14.3371C6.0754 14.1613 6.31386 14.0625 6.5625 14.0625H23.4375C23.6861 14.0625 23.9246 14.1613 24.1004 14.3371C24.2762 14.5129 24.375 14.7514 24.375 15C24.375 15.2486 24.2762 15.4871 24.1004 15.6629C23.9246 15.8387 23.6861 15.9375 23.4375 15.9375H6.5625C6.31386 15.9375 6.0754 15.8387 5.89959 15.6629C5.72377 15.4871 5.625 15.2486 5.625 15Z" fill="current"/>
			</svg>
		}/>
	);
};

export default MinusIcon;