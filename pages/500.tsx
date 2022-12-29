// Third party packages

// components
import Seo from 'components/website/common/seo';

// pages/500.js
export default function Custom500() {
	return (
		<>
			<Seo title="Error page" description="" />
			<h1>500 - Server-side error occurred</h1>;
		</>
	);
}
