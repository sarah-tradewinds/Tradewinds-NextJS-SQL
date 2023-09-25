import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	const { secret, path } = req?.query;

	// Check for secret to confirm this is a valid request
	if (secret !== process.env.REVALIDATION_SECRET_KEY) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	try {
		// this should be the actual path not a rewritten path
		// e.g. for "/blog/[slug]" this should be "/blog/post-1"
		const pathToRevalidate = (path || '')?.toString();
		console.log('pathToRevalidate =', pathToRevalidate);
		await res.revalidate(pathToRevalidate);
		return res.json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).json({ message: 'Error revalidating' });
	}
};

export default handler;
