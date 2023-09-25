import React from 'react';
import Icon from '../Icon';
import {IconProps} from "components/Icons/Icon/Icon";

const ArrowDownIcon: React.FC<IconProps> = (props) => {

	const {icon: _, ...restProps} = props;

	const primary: string = "#000000";
	const secondary: string = "#AFADB5";
	const accent: string = "#518581";

	let localColor: string | undefined
	localColor = props.color ? props.color : undefined

	switch (props.color) {
		case "primary":
			localColor = primary
			break
		case "secondary":
			localColor = secondary
			break
		case "accent":
			localColor = accent
			break
	}

	return (
		<Icon icon={
			<svg width="current" height="current" viewBox="0 0 24 24" fill={localColor}
					 xmlns="http://www.w3.org/2000/svg" {...restProps}>
				<path fillRule="evenodd" clipRule="evenodd"
							d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
							fill="current"/>
			</svg>
		}/>
	);
};

export default ArrowDownIcon;
