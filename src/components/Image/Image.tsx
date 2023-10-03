import React, {useState} from "react";
import Avatar from "assets/avatar.png";
import Product from "assets/product.jpg";

export type ImageProps = {
	src: string;
	alt: string;
	avatar?: boolean;
	className: string;
}

const Image: React.FC<ImageProps> = ({
		src,
		alt,
		avatar = false,
		className
	}) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};
	return (
		<>
			{imageError ? (
				<img
					src={avatar ? Avatar : Product}
					alt={alt}
					className={className}
				/>
			) : (
				<img
					src={src}
					alt={alt}
					onError={handleImageError}
					className={className}
				/>
			)}
		</>
	);
}

export default Image;