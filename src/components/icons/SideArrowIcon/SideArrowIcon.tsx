import React from 'react';
import Icon from '../Icon';
import styles from "./SideArrowIcon.module.scss";
import {IconProps} from "components/Icons/Icon/Icon";

const SideArrowIcon: React.FC<IconProps> = (props, rotate) => {

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
		<Icon width={props.width} height={props.height} rotate="180deg" icon={
			<svg
				width={props.width}
				height={props.height}
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={props.rotate === "180deg" ? styles.svg_rotate : undefined}
				{...props}
			>
				<path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
				      stroke={localColor}
				      strokeWidth="1.5"
				      strokeMiterlimit="10"
				      strokeLinecap="round"
				      strokeLinejoin="round"/>
			</svg>
		}/>
	);
};

export default SideArrowIcon;
