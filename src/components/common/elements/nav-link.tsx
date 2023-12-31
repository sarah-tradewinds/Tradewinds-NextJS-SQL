import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
	href?: string;
	onClick?: () => any;
	className?: string;
	activeClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
	const { children, href, className, activeClassName, onClick } = props;

	const router = useRouter();

	const isLinkActive = router.asPath === href;

	const navLinkClassName = `${className} ${
		isLinkActive ? activeClassName : ''
	}`;

	return (
		<Link
			href={href || '/'}
			className={navLinkClassName}
			onClick={onClick}
			prefetch={false}
		>
			{children}
		</Link>
	);
};

export default NavLink;
