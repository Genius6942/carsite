import { connectToDatabase } from '/lib/mongodb.js';

export default async function search(req, res) {
	const { db } = await connectToDatabase();
	const col = await db.collection('cars-all');
	const data = await col.aggregate([
		req.body.autocomplete ? {
			"$search": {
        "index": "autocomplete",
				"autocomplete": {
					"query": `${req.body.query}`,
					"path": "name",
					"fuzzy": {
						"maxEdits": 2,
						"prefixLength": 3
					}
				}
			}
		} :
		{
			$search: {
				index: 'default',
				text: {
					query: `${req.body.query}`,
					path: {
						'wildcard': '*'
					}
				}
			}
		}
  ]).limit(req.body.limit ? parseInt(req.body.limit) : 2 ** 31 - 1).toArray();
  res.status(200).json(data);
}