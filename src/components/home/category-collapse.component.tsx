import { useState } from 'react';

// Third party package
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';


interface CategoryCollapseProps {
	title: string;
	imageUrl: string;
    children?: React.ReactNode;
	containerClassName?: string;
    onTitleClick?: () => void
}

const CategoryCollapse: React.FC<CategoryCollapseProps> = (props) => {
	const {
		title, imageUrl, children, onTitleClick 
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	// const transition = `transition-all duration-500`;
	// let childClassName = `h-0 overflow-hidden ${transition}`;

	// if (isOpen) {
	// 	childClassName = `${transition} h-auto`;
	// }

	return (
		<div>
            <div className="flex items-ceter justify-between bg-error h-[67px]">
                <div className="flex items-ceter justify-center">
                    <button className="text-[26px] text-primary-main outline-none">{isOpen ? <HiMinusCircle /> : <HiPlusCircle />}</button>
                    <p className="text-[18px] font-semibold text-primary-main">{title}</p>
                </div>
                
                {/* Image container */}
                <div>
                    <ImageWithErrorHandler
                        src={imageUrl}
                        alt=""
                        width={80}
                        height={80}
                        className="h-20 w-20"
                    />
                </div>
            </div>

			{/* Children */}
			<div>{children}</div>
		</div>
	);
}; // End of CategoryCollapse component

export default CategoryCollapse;
